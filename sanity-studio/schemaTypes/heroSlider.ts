import {defineField, defineType} from 'sanity'

export const heroSlider = defineType({
  name: 'heroSlider',
  title: 'Слайдер главной',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Изображения',
      description: 'Загрузите изображения в нужном порядке. Их можно перетаскивать.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Описание изображения',
              description: 'Короткое описание для скринридеров и поисковых систем.',
              type: 'string',
            }),
          ],
        },
      ],
      validation: (rule) => rule.min(1).required(),
    }),
  ],
  preview: {
    select: {images: 'images'},
    prepare({images}) {
      return {
        title: 'Слайдер главной',
        subtitle: `${images?.length ?? 0} изображений`,
      }
    },
  },
})
