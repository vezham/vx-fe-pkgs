import type { PermissionPolicy, Storage, TamizhiPlugin, Tool } from './types'

export const memoryStoragePlugin = (): TamizhiPlugin => {
  const owners = new Map<
    string,
    Map<string, Awaited<ReturnType<Storage['get']>>>
  >()
  return {
    name: 'storage.memory',
    inject: ['tamizhi'],
    apply: context => {
      const storage: Storage = {
        get: async (owner, id) => {
          const value = owners.get(owner)?.get(id)
          return value ? structuredClone(value) : undefined
        },
        put: async (owner, conversation) => {
          let records = owners.get(owner)
          if (!records) {
            records = new Map()
            owners.set(owner, records)
          }
          records.delete(conversation.id)
          records.set(conversation.id, structuredClone(conversation))
          if (records.size > 100) {
            const oldest = records.keys().next().value
            if (oldest) records.delete(oldest)
          }
        }
      }
      context.tamizhi.storage.register(context, 'default', storage)
      context.effect(() => () => owners.clear())
    }
  }
}

export const permissionPolicyPlugin = (
  options: { allowFullAccess?: boolean } = {}
): TamizhiPlugin => ({
  name: 'permissions.default',
  inject: ['tamizhi'],
  apply: context => {
    const policy: PermissionPolicy = {
      evaluate: (mode, tool) => {
        if (mode === 'full' && options.allowFullAccess) return 'allow'
        if (mode === 'safe' && tool.risk === 'read') return 'allow'
        return 'ask'
      }
    }
    context.tamizhi.permissions.register(context, 'default', policy)
  }
})

export const toolPlugin = (tool: Tool): TamizhiPlugin => ({
  name: `tool.${tool.name}`,
  inject: ['tamizhi'],
  apply: context => context.tamizhi.tools.register(context, tool.name, tool)
})
