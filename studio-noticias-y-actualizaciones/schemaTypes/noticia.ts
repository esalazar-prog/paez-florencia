import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'noticia',
  title: 'Noticia / Artículo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Artículo',
      type: 'string',
      description: 'Encabezado principal de la publicación.',
      validation: (Rule) => Rule.required().error('El título es obligatorio'),
    }),
    defineField({
      name: 'slug',
      title: 'Enlace Permanente (Slug)',
      type: 'slug',
      description: 'Identificador único en la URL. Haz clic en "Generate" para crearlo automáticamente desde el título.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Debes generar el enlace permanente'),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      description: 'Línea de servicio o área técnica a la que corresponde la noticia.',
      options: {
        list: [
          {title: 'Asesoría Tributaria', value: 'Asesoría Tributaria'},
          {title: 'Auditoría Externa', value: 'Auditoría Externa'},
          {title: 'Contabilidad & Outsourcing', value: 'Contabilidad & Outsourcing'},
          {title: 'Gestión de Riesgos', value: 'Gestión de Riesgos'},
          {title: 'Actualidad y Normativa', value: 'Actualidad y Normativa'},
        ],
      },
      validation: (Rule) => Rule.required().error('Debes seleccionar una categoría'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'readTime',
      title: 'Tiempo estimado de lectura',
      type: 'string',
      initialValue: '5 min de lectura',
      placeholder: 'Ej: 4 min de lectura',
    }),
    defineField({
      name: 'featured',
      title: '¿Destacar en Portada?',
      type: 'boolean',
      description: 'Si se activa, aparecerá con tarjeta grande destacada en el encabezado del blog.',
      initialValue: false,
    }),
    defineField({
      name: 'mainImage',
      title: 'Fotografía o Portada Principal',
      type: 'image',
      description: 'Imagen en alta resolución para el artículo.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'summary',
      title: 'Resumen o Bajada (Extracto)',
      type: 'text',
      rows: 3,
      description: 'Texto breve que sintetiza el artículo en los listados y redes sociales.',
    }),
    defineField({
      name: 'body',
      title: 'Cuerpo del Artículo',
      type: 'array',
      description: 'Redacta aquí el contenido del artículo. Puedes agregar subtítulos, párrafos y citas.',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Párrafo Estándar', value: 'normal'},
            {title: 'Subtítulo Principal (H2)', value: 'h2'},
            {title: 'Subtítulo Secundario (H3)', value: 'h3'},
            {title: 'Cita Destacada / Frase Clave', value: 'blockquote'},
          ],
          lists: [
            {title: 'Viñetas (Bullet)', value: 'bullet'},
            {title: 'Numeración', value: 'number'},
          ],
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Autor de la Publicación',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Nombre del Autor',
          type: 'string',
          initialValue: 'Dra. Patricia Florencia',
        },
        {
          name: 'role',
          title: 'Cargo o Especialidad',
          type: 'string',
          initialValue: 'Socia Directora de Impuestos',
        },
        {
          name: 'image',
          title: 'Fotografía del Autor',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
})
