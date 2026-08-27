import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'
import { defineConfig } from 'kubb/config'
import { ast } from 'kubb/kit'

const stripController = (operationId: string) => {
  const stripped = operationId.replace(/^[A-Za-z]*[Cc]ontroller_?/, '')
  return stripped.charAt(0).toLowerCase() + stripped.slice(1)
}

const stripControllerMacro = ast.defineMacro({
  name: 'strip-controller-from-operation-id',
  operation(node) {
    if (!node.operationId) return undefined
    return { ...node, operationId: stripController(node.operationId) }
  },
})

export default defineConfig({
  root: '.',
  // input: 'http://127.0.0.1:3001/api/rest/pizza.json',
  input: 'https://juniorsbootcamp.ru/api/rest/pizza.json',
  // input: './openapi/pizza.json',
  output: { path: './generated', clean: true },
  plugins: [
    pluginTs({
      output: { path: './types', mode: 'directory', barrel: { type: 'named' } },
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Types`,
      },
      macros: [stripControllerMacro],
    }),
    pluginZod({
      output: { path: './zod', mode: 'directory', barrel: { type: 'named' } },
      group: { type: 'tag', name: ({ group }) => `${group}Schemas` },
      importPath: 'zod',
      macros: [stripControllerMacro],
      resolver: {
        response: {
          response(node) {
            return this.name(`${node.operationId} Success Response`)
          },
        },
      },
      printer: {
        nodes: {
          string(node) {
            let output = this.base(node) // напр. "z.string().min(1)"

            if (output && node.min !== undefined) {
              output = output.replace(
                `.min(${node.min})`,
                `.min(${node.min}, 'error.validation.required')`
              )
            }
            if (output && node.max !== undefined) {
              output = output
                .replace(`.max(${node.max})`, `.max(${node.max}, 'error.validation.tooLong')`)
                .concat(`.length(${node.max}, "error.validation.length")`)
            }
            return output
          },
          number(node) {
            let output = this.base(node)

            if (output && node.min !== undefined) {
              output = output.replace(
                `.min(${node.min})`,
                `.min(${node.min}, 'error.validation.min')`
              )
            }
            if (output && node.max !== undefined) {
              output = output.replace(
                `.max(${node.max})`,
                `.max(${node.max}, 'error.validation.max')`
              )
            }
            return output
          },

          // @IsEmail()
          email(node) {
            const base = this.base(node)
            return base ? base.replace('z.email()', `z.email('error.validation.email')`) : null
          },

          // @IsUUID()
          uuid(node) {
            const base = this.base(node)
            return base
              ? base
                  .replace('z.uuid()', `z.uuid('error.validation.uuid')`)
                  .replace('z.guid()', `z.guid('error.validation.uuid')`)
              : null
          },

          // @IsUrl()
          url(node) {
            const base = this.base(node)
            return base ? base.replace('z.url()', `z.url('error.validation.url')`) : null
          },
        },
      },
    }),
    pluginFetch({
      // oxlint-disable-next-line no-template-curly-in-string
      baseURL: '${typeof window === "undefined" ? "https://juniorsbootcamp.ru" : "/api"}',
      output: { path: './clients', mode: 'directory', barrel: { type: 'named' } },
      validator: 'zod',
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Service`,
      },
      macros: [stripControllerMacro],
    }),
    pluginReactQuery({
      output: { path: './hooks', mode: 'directory', barrel: { type: 'named' } },
      client: 'fetch',
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Hooks`,
      },
      macros: [stripControllerMacro],
      hooks: true,
    }),
  ],
})
