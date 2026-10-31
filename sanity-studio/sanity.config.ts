import {defineConfig} from 'sanity'
import {structureTool, type StructureResolver} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'vertex',
  title: 'CONTENT PORT — кейсы',

  basePath: '/studio',
  projectId: 'j2snaqzy',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: ((S) =>
        S.list()
          .title('CONTENT PORT')
          .items([
            S.listItem()
              .title('Слайдер главной')
              .id('heroSlider')
              .child(S.document().schemaType('heroSlider').documentId('heroSlider')),
            S.documentTypeListItem('caseStudy').title('Кейсы'),
          ])) satisfies StructureResolver,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
