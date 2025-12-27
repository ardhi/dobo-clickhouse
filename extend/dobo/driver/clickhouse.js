import clientFactory from '../../../lib/dialect/client.js'

async function clickhouseDriverFactory () {
  const { KnexDriver } = this.app.doboKnex.baseClass

  class ClickhouseDriver extends KnexDriver {
    constructor (plugin, options) {
      super(plugin, options)
      this.idField = {
        name: 'id',
        type: 'string',
        required: true,
        autoInc: true,
        index: 'primary'
      }
      this.idGenerator = 'uuidv7'
      this.defaultEngine = 'MergeTree'
      this.support.returning = false
    }

    async sanitizeConnection (item) {
      await super.sanitizeConnection(item)
      item.port = item.port ?? 8123
      item.user = item.user ?? 'default'
      item.host = item.host ?? '127.0.0.1'
      item.database = item.database ?? 'default'
    }

    async createClient (connection) {
      const { importPkg } = this.app.bajo
      const knex = await importPkg('doboKnex:knex')
      const client = await clientFactory.call(this.plugin)
      const { user, password, host, port, database } = connection.options
      connection.client = knex({
        client,
        connection: () => {
          return `clickhouse://${user}:${password}@${host}:${port}/${database}`
        },
        ...this.options
      })
    }
  }

  return ClickhouseDriver
}

export default clickhouseDriverFactory
