// ══════════════════════════════════════════════════════════════
// PAEZ, FLORENCIA & CO.  —  Base de Datos de Noticias y Artículos
// Estructura sincronizada en vivo con Headless CMS (Sanity.io)
// ══════════════════════════════════════════════════════════════

// Arreglo reactivo limpio para entrega (se llena en vivo mediante la API cuando el cliente publica)
const articulosData = [];

// ══════════════════════════════════════════════════════════════
// SANITY.IO CONFIGURATION & API BRIDGE
// ══════════════════════════════════════════════════════════════
const SANITY_CONFIG = {
    projectId: "6oyg0qac",
    dataset: "production",
    apiVersion: "2023-05-03",
    useCdn: true,
};

// Convierte referencias de imagen de Sanity en URL directa CDN
function getSanityImageUrl(source) {
    if (!source) return "WEBP/imagen_Comercial.webp";
    if (typeof source === "string") return source;
    if (source.asset && source.asset._ref) {
        const ref = source.asset._ref;
        // image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg -> 2000x3000.jpg
        const [, id, dimensions, format] = ref.split('-');
        return `https://cdn.sanity.io/images/${SANITY_CONFIG.projectId}/${SANITY_CONFIG.dataset}/${id}-${dimensions}.${format}`;
    }
    return "WEBP/imagen_Comercial.webp";
}

// Normaliza categorías a IDs consistentes
function normalizeCategoryId(catName) {
    if (!catName) return "general";
    const lower = catName.toLowerCase();
    if (lower.includes("tribut") || lower.includes("fiscal") || lower.includes("impuesto")) return "tributario";
    if (lower.includes("audit")) return "auditoria";
    if (lower.includes("contab") || lower.includes("outsourc")) return "contabilidad";
    if (lower.includes("riesgo") || lower.includes("forens")) return "riesgos";
    return lower.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "-");
}

// Helper functions para consulta local y remota
function getAllArticles() {
    return articulosData;
}

function getArticleById(id) {
    return articulosData.find(a => a.id === id) || null;
}

function getRelatedArticles(currentId, categoryId, limit = 3) {
    return articulosData
        .filter(a => a.id !== currentId && (a.categoriaId === categoryId || !categoryId))
        .slice(0, limit);
}

// Carga en vivo desde Sanity.io (cuando el cliente publica en su panel)
async function fetchSanityArticles() {
    try {
        const query = encodeURIComponent(`*[_type in ["noticia", "post", "articulo"]] | order(publishedAt desc, _createdAt desc)`);
        const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${query}`;
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        
        if (data.result && data.result.length > 0) {
            const mapped = data.result.map(doc => {
                const slug = doc.slug?.current || doc._id;
                const fecha = doc.publishedAt 
                    ? new Date(doc.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) 
                    : (doc._createdAt ? new Date(doc._createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : "Reciente");
                
                // Procesar cuerpo de bloques editoriales de Sanity
                let contenido = [];
                if (Array.isArray(doc.body)) {
                    doc.body.forEach(block => {
                        if (block._type === 'block') {
                            const text = block.children ? block.children.map(c => c.text).join('') : '';
                            if (block.style === 'h2' || block.style === 'h3') {
                                contenido.push({ tipo: 'subtitulo', texto: text });
                            } else if (block.style === 'blockquote') {
                                contenido.push({ tipo: 'cita', texto: text });
                            } else {
                                contenido.push({ tipo: 'parrafo', texto: text });
                            }
                        }
                    });
                } else if (typeof doc.body === 'string') {
                    contenido.push({ tipo: 'parrafo', texto: doc.body });
                }

                return {
                    id: slug,
                    titulo: doc.title || doc.titulo || "Publicación",
                    categoria: doc.category || doc.categoria || "Actualidad",
                    categoriaId: normalizeCategoryId(doc.category || doc.categoria),
                    fecha: fecha,
                    tiempoLectura: doc.readTime || doc.tiempoLectura || "5 min de lectura",
                    imagen: getSanityImageUrl(doc.mainImage || doc.imagen),
                    destacado: !!doc.featured,
                    resumen: doc.summary || doc.resumen || (contenido[0] ? contenido[0].texto.slice(0, 160) + '...' : ''),
                    autor: {
                        nombre: doc.author?.name || doc.autor?.nombre || "Equipo Editorial",
                        cargo: doc.author?.role || doc.autor?.cargo || "PAEZ, FLORENCIA & CO.",
                        avatar: doc.author?.image ? getSanityImageUrl(doc.author.image) : "WEBP/Gabriel Paez.webp"
                    },
                    contenido: contenido.length > 0 ? contenido : [{ tipo: 'parrafo', texto: doc.summary || '' }]
                };
            });

            articulosData.length = 0;
            articulosData.push(...mapped);
            return mapped;
        } else {
            articulosData.length = 0;
            return [];
        }
    } catch (e) {
        console.warn("Conexión con Sanity API activa:", e);
        return null;
    }
}

// Exportación global explícita para compatibilidad total en el navegador
if (typeof window !== "undefined") {
    window.articulosData = articulosData;
    window.getAllArticles = getAllArticles;
    window.getArticleById = getArticleById;
    window.getRelatedArticles = getRelatedArticles;
    window.fetchSanityArticles = fetchSanityArticles;
}
