// ══════════════════════════════════════════════════════════════
// PAEZ, FLORENCIA & CO.  —  Base de Datos de Noticias y Artículos
// Estructura compatible con Headless CMS (Sanity.io / Strapi / Decap)
// ══════════════════════════════════════════════════════════════

const articulosData = [
    {
        id: "reformas-tributarias-ecuador-2026",
        titulo: "Actualización sobre Reformas Tributarias y Fiscales en el Ecuador 2026",
        categoria: "Asesoría Tributaria",
        categoriaId: "tributario",
        fecha: "28 de Febrero, 2026",
        tiempoLectura: "5 min de lectura",
        imagen: "imagen_Comercial.png",
        destacado: true,
        resumen: "Analizamos las principales disposiciones emitidas por el SRI y el Ministerio de Economía, sus repercusiones directas en el impuesto a la renta societario y las estrategias clave de optimización fiscal.",
        autor: {
            nombre: "Dra. Patricia Florencia",
            cargo: "Socia Directora de Impuestos & Tax Advisory",
            avatar: "Gabriel Paez.png"
        },
        contenido: [
            {
                tipo: "destacado",
                texto: "El entorno tributario para el ejercicio fiscal 2026 impone nuevos desafíos de cumplimiento y gobernanza fiscal para las sociedades ecuatorianas y grupos multinacionales con operaciones en el país."
            },
            {
                tipo: "parrafo",
                texto: "Con la entrada en vigor de los recientes cuerpos normativos emitidos por el Servicio de Rentas Internas (SRI) y los ajustes en el marco fiscal nacional, las organizaciones deben revaluar sus estructuras de deducciones, retenciones en la fuente y tarifas aplicables al impuesto a la renta. La transparencia fiscal y la digitalización de procesos se han convertido en los pilares fundamentales de la administración tributaria."
            },
            {
                tipo: "subtitulo",
                texto: "1. Modificaciones Clave en la Base Imponible Societaria"
            },
            {
                tipo: "parrafo",
                texto: "Entre los puntos de mayor impacto resalta la limitación gradual a la deducibilidad de ciertos gastos de gestión corporativa internacional no soportados fehacientemente, así como la exigencia de un mayor nivel de detalle en la justificación de transacciones con partes relacionadas locales y del exterior."
            },
            {
                tipo: "cita",
                texto: "«La planificación fiscal ética no solo evita contingencias pecuniarias; es un activo estratégico que preserva el patrimonio y la reputación corporativa de las empresas.»",
                autor: "Dra. Patricia Florencia"
            },
            {
                tipo: "subtitulo",
                texto: "2. Automatización y Bancarización Obligatoria"
            },
            {
                tipo: "parrafo",
                texto: "El SRI ha intensificado el cruce automatizado de información bancaria transfronteriza y registros electrónicos de facturación. Toda transacción no canalizada formalmente a través del sistema financiero nacional o que carezca de sustento de bancarización fehaciente perderá automáticamente su validez deducible tanto para efectos de Impuesto a la Renta como de crédito tributario de IVA."
            },
            {
                tipo: "caja_clave",
                titulo: "Puntos Clave para la Dirección Financiera:",
                items: [
                    "Revisión anticipada del anexo de partes relacionadas (APR) y estudio de precios de transferencia.",
                    "Auditoría interna preventiva a los soportes de facturación electrónica y retenciones.",
                    "Evaluación del impacto del anticipo extraordinario en el flujo de caja del segundo semestre.",
                    "Actualización de las políticas corporativas de retenciones y gastos de representación."
                ]
            },
            {
                tipo: "parrafo",
                texto: "En PAEZ, FLORENCIA & CO., nuestro equipo de asesores tributarios y directores se encuentra a su disposición para coordinar una revisión exhaustiva de sus declaraciones y diseñar un plan preventivo adaptado a su sector de negocio."
            }
        ]
    },
    {
        id: "normas-niif-sostenibilidad-auditoria-2026",
        titulo: "Adopción de las Normas Internacionales de Información Financiera (NIIF S1 y S2) en Auditoría Corporativa",
        categoria: "Auditoría Externa",
        categoriaId: "auditoria",
        fecha: "15 de Febrero, 2026",
        tiempoLectura: "6 min de lectura",
        imagen: "Auditorias_2025.jpg",
        destacado: false,
        resumen: "El impacto de los nuevos estándares globales de revelación sobre sostenibilidad y clima en los dictámenes de auditoría externa y estados financieros bajo supervisión societaria.",
        autor: {
            nombre: "Ing. Gabriel Páez",
            cargo: "Socio Principal de Auditoría Externa",
            avatar: "Gabriel Paez.png"
        },
        contenido: [
            {
                tipo: "destacado",
                texto: "La convergencia global hacia revelaciones financieras vinculadas al clima y la sostenibilidad (ISSB - NIIF S1 y S2) redefine los estándares de dictamen y aseguramiento financiero."
            },
            {
                tipo: "parrafo",
                texto: "La Superintendencia de Compañías, Valores y Seguros ha marcado una hoja de ruta progresiva para la integración de factores ambientales, sociales y de gobernanza (ASG) en los reportes anuales de las compañías medianas y grandes en el Ecuador. Esto implica que la auditoría financiera ya no puede aislarse de la cuantificación de riesgos climáticos y operativos."
            },
            {
                tipo: "subtitulo",
                texto: "Integración en los Estados Financieros"
            },
            {
                tipo: "parrafo",
                texto: "Las entidades deben evaluar si los riesgos físicos y de transición hacia una economía de bajas emisiones afectan el deterioro de activos de larga duración (NIC 36), las vidas útiles de la propiedad, planta y equipo (NIC 16) y la necesidad de registrar provisiones por remediación o contingencias futuras (NIC 37)."
            },
            {
                tipo: "cita",
                texto: "«Un dictamen de auditoría moderno debe brindar a accionistas, bancos e inversionistas una visión certera tanto de los números pasados como de la resiliencia futura del negocio.»",
                autor: "Ing. Gabriel Páez"
            },
            {
                tipo: "caja_clave",
                titulo: "Recomendaciones de los Auditores:",
                items: [
                    "Identificar la matriz de riesgos materiales climáticos según la industria (manufactura, agroindustria, comercial).",
                    "Capacitar a los departamentos contables en las métricas de cuantificación NIIF S1 y S2.",
                    "Coordinar con los auditores externos la revelación de notas complementarias sobre sostenibilidad."
                ]
            }
        ]
    },
    {
        id: "ciberseguridad-gestion-riesgos-financieros",
        titulo: "Gestión de Riesgos Financieros y Tecnológicos en la Era de la Inteligencia Artificial",
        categoria: "Gestión de Riesgos",
        categoriaId: "riesgos",
        fecha: "02 de Febrero, 2026",
        tiempoLectura: "4 min de lectura",
        imagen: "imagen_Tecnología.png",
        destacado: false,
        resumen: "Cómo la automatización de procesos y los ciberriesgos impactan el control interno, la integridad de los datos contables y la continuidad operativa empresarial.",
        autor: {
            nombre: "Ing. William Florencia",
            cargo: "Gerente de Auditoría de Sistemas & TI",
            avatar: "William Florencia.png"
        },
        contenido: [
            {
                tipo: "destacado",
                texto: "La digitalización de los sistemas ERP y las plataformas financieras exige auditorías de sistemas exhaustivas para proteger la confidencialidad de la información corporativa."
            },
            {
                tipo: "parrafo",
                texto: "El incremento en ataques de suplantación de identidad corporativa, vulnerabilidades en pasarelas de pago y manipulación de bases de datos contables ha colocado a la ciberseguridad en la primera línea de riesgo de los comités de auditoría. Un control interno robusto ya no se limita a autorizaciones en papel, sino a protocolos de autenticación multifactor, cifrado y trazabilidad inmutable de transacciones."
            },
            {
                tipo: "subtitulo",
                texto: "Auditoría de TI como Salvaguarda Estratégica"
            },
            {
                tipo: "parrafo",
                texto: "Nuestra práctica de auditoría de tecnologías evalúa los controles generales de TI (GITCs), la segregación de funciones en los sistemas administrativos y la efectividad de los planes de contingencia ante incidentes informáticos graves."
            },
            {
                tipo: "caja_clave",
                titulo: "Acciones Críticas de Control:",
                items: [
                    "Evaluación periódica de vulnerabilidades en infraestructura y servidores contables.",
                    "Políticas estrictas de acceso y segregación de funciones entre el personal de tesorería y contabilidad.",
                    "Simulacros de continuidad de negocio y respaldo cifrado en la nube."
                ]
            }
        ]
    },
    {
        id: "outsourcing-contable-optimizacion-costos",
        titulo: "El Rol Estratégico del Outsourcing Contable en la Eficiencia Operativa Empresarial",
        categoria: "Contabilidad & Outsourcing",
        categoriaId: "contabilidad",
        fecha: "20 de Enero, 2026",
        tiempoLectura: "4 min de lectura",
        imagen: "imagen_Manufactura.png",
        destacado: false,
        resumen: "Delegar los procesos contables en firmas especializadas permite a la alta gerencia enfocarse en el negocio principal mientras asegura precisión técnica y cumplimiento estricto.",
        autor: {
            nombre: "CPA. Andrés Morales",
            cargo: "Gerente de Outsourcing Contable",
            avatar: "Gabriel Paez.png"
        },
        contenido: [
            {
                tipo: "destacado",
                texto: "La tercerización contable de alto nivel transforma los centros de costo administrativo en fuentes de información estratégica y toma de decisiones ágiles."
            },
            {
                tipo: "parrafo",
                texto: "En un entorno económico competitivo, las organizaciones requieren balances al día, nóminas procesadas con absoluta puntualidad y declaraciones tributarias sin margen de error. Mantener un departamento contable interno sobredimensionado puede significar altos costos fijos y riesgo de obsolescencia técnica ante cambios normativos constantes."
            },
            {
                tipo: "subtitulo",
                texto: "Información Financiera para Decidir en Tiempo Real"
            },
            {
                tipo: "parrafo",
                texto: "A través de nuestro servicio de outsourcing, los clientes acceden a directores contables experimentados, tecnología de conciliación automatizada y reportería gerencial ejecutiva con indicadores clave de liquidez, rentabilidad y endeudamiento."
            }
        ]
    },
    {
        id: "precios-transferencia-cumplimiento-sri",
        titulo: "Claves para el Cumplimiento Técnico en Precios de Transferencia ante el SRI",
        categoria: "Asesoría Tributaria",
        categoriaId: "tributario",
        fecha: "10 de Enero, 2026",
        tiempoLectura: "5 min de lectura",
        imagen: "imagen_Construccion.png",
        destacado: false,
        resumen: "Metodologías de plena competencia (Arm's Length), rangos intercuartiles y la documentación soporte indispensable para operaciones vinculadas locales e internacionales.",
        autor: {
            nombre: "Dra. Patricia Florencia",
            cargo: "Socia Directora de Impuestos & Tax Advisory",
            avatar: "Gabriel Paez.png"
        },
        contenido: [
            {
                tipo: "destacado",
                texto: "El régimen de precios de transferencia en el Ecuador contempla sanciones severas por omisión o inconsistencia técnica en el Informe Integral y Anexo de Operaciones con Partes Relacionadas."
            },
            {
                tipo: "parrafo",
                texto: "Las compañías que superen los umbrales establecidos por la normativa tributaria deben presentar un informe técnico riguroso que demuestre que sus transacciones con partes relacionadas se pactaron a precios de libre competencia. La adecuada selección del método (Precio Comparable No Controlado, Costo Adicionado, Márgenes Transaccionales) es el factor determinante para evitar glosas y ajustes fiscales onerosos."
            }
        ]
    },
    {
        id: "auditoria-forense-deteccion-fraudes",
        titulo: "Auditoría Preventiva y Forense: Blindaje Institucional contra el Fraude Corporativo",
        categoria: "Auditoría Externa",
        categoriaId: "auditoria",
        fecha: "05 de Enero, 2026",
        tiempoLectura: "6 min de lectura",
        imagen: "imagen_Servicios.png",
        destacado: false,
        resumen: "Metodologías de investigación contable especializada para detectar irregularidades, apropiaciones indebidas y proteger los activos patrimoniales.",
        autor: {
            nombre: "Ing. Gabriel Páez",
            cargo: "Socio Principal de Auditoría Externa",
            avatar: "Gabriel Paez.png"
        },
        contenido: [
            {
                tipo: "destacado",
                texto: "La auditoría forense combina destrezas contables, técnicas de investigación legal y análisis de datos para documentar y prevenir pérdidas financieras sustanciales."
            },
            {
                tipo: "parrafo",
                texto: "Ante indicios de anomalías en compras, inventarios, tesorería o registros contables, las empresas requieren un examen independiente e imparcial con valor probatorio. Nuestros informes periciales y forenses brindan la solidez probatoria indispensable para la toma de decisiones directivas y acciones legales pertinentes."
            }
        ]
    }
];

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
    if (!source) return "imagen_Comercial.png";
    if (typeof source === "string") return source;
    if (source.asset && source.asset._ref) {
        const ref = source.asset._ref;
        // image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg -> 2000x3000.jpg
        const [, id, dimensions, format] = ref.split('-');
        return `https://cdn.sanity.io/images/${SANITY_CONFIG.projectId}/${SANITY_CONFIG.dataset}/${id}-${dimensions}.${format}`;
    }
    return "imagen_Comercial.png";
}

// Helper functions para consulta local y remota
function getAllArticles() {
    return articulosData;
}

function getArticleById(id) {
    return articulosData.find(a => a.id === id) || articulosData[0];
}

function getRelatedArticles(currentId, categoryId, limit = 3) {
    return articulosData
        .filter(a => a.id !== currentId && (a.categoriaId === categoryId || !categoryId))
        .slice(0, limit);
}

// Carga en vivo desde Sanity.io (si hay publicaciones en el dataset)
async function fetchSanityArticles() {
    try {
        const query = encodeURIComponent(`*[_type in ["noticia", "post", "articulo"]] | order(_createdAt desc)`);
        const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${query}`;
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        
        if (data.result && data.result.length > 0) {
            // Mapear el formato de Sanity al formato del diseño
            const mapped = data.result.map(doc => {
                const slug = doc.slug?.current || doc._id;
                const fecha = doc.publishedAt ? new Date(doc.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : (doc._createdAt ? new Date(doc._createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : "Reciente");
                
                // Procesar cuerpo de bloques
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

function normalizeCategoryId(catName) {
    if (!catName) return "general";
    const lower = catName.toLowerCase();
    if (lower.includes("tribut") || lower.includes("fiscal") || lower.includes("impuesto")) return "tributario";
    if (lower.includes("audit")) return "auditoria";
    if (lower.includes("contab") || lower.includes("outsourc")) return "contabilidad";
    if (lower.includes("riesgo") || lower.includes("forens")) return "riesgos";
    return lower.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "-");
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
                        avatar: doc.author?.image ? getSanityImageUrl(doc.author.image) : "Gabriel Paez.png"
                    },
                    contenido: contenido.length > 0 ? contenido : [{ tipo: 'parrafo', texto: doc.summary || '' }]
                };
            });

            // Si hay artículos en Sanity, podemos combinarlos o reemplazar los borradores
            // Evitar duplicados si se llama más de una vez
            const sanityIds = new Set(mapped.map(m => m.id));
            const filteredLocals = articulosData.filter(a => !sanityIds.has(a.id));
            articulosData.length = 0;
            articulosData.push(...mapped, ...filteredLocals);
            return mapped;
        }
        return null;
    } catch (e) {
        console.warn("No se pudo conectar con Sanity API (utilizando artículos locales):", e);
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

