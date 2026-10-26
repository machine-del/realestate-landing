import {defineField, defineType} from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Кейс',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название проекта',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Адрес кейса',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'string',
      options: {
        list: [
          {title: 'Instagram', value: 'Instagram'},
          {title: 'TikTok', value: 'TikTok'},
          {title: 'Reels', value: 'Reels'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'clientName',
      title: 'Клиент / компания',
      type: 'string',
      description: 'Имя или название, которое увидят посетители сайта.',
    }),
    defineField({
      name: 'task',
      title: 'Краткая задача',
      description: 'Одно короткое предложение для карточки кейса.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'thumbnail',
      title: 'Превью кейса',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'metricValue',
      title: 'Крупная цифра',
      description: 'Например: 31K',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'metricLabel',
      title: 'Подпись к крупной цифре',
      type: 'string',
      initialValue: 'подписчиков',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'growthFrom',
      title: 'Результат до начала работы',
      description: 'Например: 1 000',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'growthTo',
      title: 'Результат после работы',
      description: 'Например: 31 000',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Краткий итог',
      description: 'Короткое описание результата для полной страницы кейса.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'details',
      title: 'Дополнительное описание',
      description: 'Дополнительные подробности о проекте. Существующие тексты сохраняются.',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'initialSituation',
      title: 'Исходная ситуация / точка А',
      description: 'С чем пришёл клиент и какие были исходные показатели.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'strategy',
      title: 'Стратегия и концепция',
      description: 'Какой подход выбрали и почему.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'workDone',
      title: 'Что сделали',
      description: 'Кратко перечислите основные действия и этапы работы.',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'resultStats',
      title: 'Результаты в цифрах',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'metricType',
              title: 'Показатель',
              type: 'string',
              options: {
                layout: 'dropdown',
                list: [
                  {title: 'Просмотры коротких видео', value: 'Просмотры коротких видео'},
                  {title: 'Лайки на ролике-лидере', value: 'Лайки на ролике-лидере'},
                  {title: 'Комментарии на ролике-лидере', value: 'Комментарии на ролике-лидере'},
                  {title: 'Поделились роликом-лидером', value: 'Поделились роликом-лидером'},
                  {title: 'Другое', value: 'Другое'},
                ],
              },
              validation: (rule) =>
                rule.custom((value, context) => {
                  const parent = context.parent;
                  const hasLegacyLabel =
                    parent
                    && typeof parent === 'object'
                    && 'label' in parent
                    && typeof parent.label === 'string'
                    && parent.label.trim().length > 0;
                  return value || hasLegacyLabel ? true : 'Выберите показатель'
                }),
            }),
            defineField({
              name: 'customLabel',
              title: 'Свой показатель',
              type: 'string',
              hidden: ({parent}) => parent?.metricType !== 'Другое',
              validation: (rule) =>
                rule.custom((value, context) => {
                  const parent = context.parent;
                  if (
                    parent
                    && typeof parent === 'object'
                    && 'metricType' in parent
                    && parent.metricType === 'Другое'
                    && (typeof value !== 'string' || !value.trim())
                  ) {
                    return 'Укажите название показателя'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'label',
              title: 'Старое название показателя',
              type: 'string',
              hidden: true,
            }),
            defineField({name: 'value', title: 'Значение', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {
            select: {title: 'metricType', customLabel: 'customLabel', legacyLabel: 'label', subtitle: 'value'},
            prepare: ({title, customLabel, legacyLabel, subtitle}) => ({
              title: title === 'Другое' ? customLabel || 'Другое' : title || legacyLabel || 'Показатель',
              subtitle,
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'contentExamples',
      title: 'Примеры роликов',
      description: 'Ссылки на сильные ролики и их превью.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Название ролика', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'url', title: 'Ссылка на ролик', type: 'url', validation: (rule) => rule.required()}),
            defineField({name: 'image', title: 'Превью ролика', type: 'image', options: {hotspot: true}}),
          ],
          preview: {select: {title: 'title', subtitle: 'url', media: 'image'}},
        },
      ],
    }),
    defineField({
      name: 'statisticsScreenshots',
      title: 'Скриншоты результатов',
      description: 'Загрузите скриншоты с показателями проекта: охваты, просмотры, подписчики, заявки и другие результаты.',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'testimonial',
      title: 'Отзыв клиента',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'testimonialImages',
      title: 'Изображения к отзыву',
      description: 'Необязательные изображения или скриншоты, приложенные к отзыву.',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'conclusion',
      title: 'Вывод / точка Б',
      description: 'К чему пришёл проект и за счёт чего сработал подход.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'order',
      title: 'Порядок отображения',
      description: 'Меньшее число отображается выше.',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
})
