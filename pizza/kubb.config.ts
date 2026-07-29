import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'
import { defineConfig } from 'kubb/config'

export default defineConfig({
  root: '.',
  // input: 'https://juniorsbootcamp.ru/api/rest/pizza.json',
  input: './openapi/pizza.json',
  output: { path: './generated', clean: true },
  plugins: [
    pluginTs({
      output: { path: './types', mode: 'directory' },
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Types`,
      },
    }),
    pluginZod({
      output: { path: './zod', mode: 'directory' },
      group: { type: 'tag', name: ({ group }) => `${group}Schemas` },
      importPath: 'zod',
    }),
    pluginFetch({
      baseURL: 'https://juniorsbootcamp.ru',
      output: { path: './clients', mode: 'directory', barrel: { type: 'named' } },
      validator: 'zod',
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Service`,
      },
    }),
    pluginReactQuery({
      output: { path: './hooks', mode: 'directory' },
      client: 'fetch',
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Hooks`,
      },
    }),
  ],
})
