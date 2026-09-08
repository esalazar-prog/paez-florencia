# Sanity Studio — Páez, Florencia & Co. (Noticias y Actualizaciones)

Este es el panel de administración editorial para gestionar las noticias, análisis tributarios y artículos de auditoría de la firma **PAEZ, FLORENCIA & CO.**

- **Project ID**: `6oyg0qac`
- **Dataset**: `production`

---

## 🚀 Cómo usarlo

### 1. Instalar dependencias (solo la primera vez)
Abre tu terminal en esta carpeta y ejecuta:
```bash
npm install
```

### 2. Iniciar el panel en tu computadora
```bash
npm run dev
```
Abre tu navegador en:
👉 `http://localhost:3333`

---

## ☁️ Desplegar a la Nube (Para usarlo sin encender la computadora)

Para que el panel quede disponible 24/7 en internet para ti y tu equipo:

```bash
npx sanity deploy
```

Sanity te preguntará qué subdominio quieres (por ejemplo: `paezflorencia`), y quedará listo en:
👉 `https://paezflorencia.sanity.studio`

---

## 🔑 Habilitar CORS en Sanity (1 minuto)

Para que tu sitio web pueda leer los artículos publicados:
1. Ve a [sanity.io/manage](https://sanity.io/manage)
2. Selecciona tu proyecto **6oyg0qac**
3. Ve a **API** -> **CORS Origins** -> **Add CORS origin**
4. Ingresa `*` y marca **Allow credentials** -> **Save**.
