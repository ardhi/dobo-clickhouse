import clientFactory from '../../../lib/dialect/client.js'

async function clickhouseDriverFactory () {
  const { DoboKnexDriver } = this.app.baseClass

  class DoboClickhouseDriver extends DoboKnexDriver {
    constructor (plugin, name, options) {
      super(plugin, name, options)
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

    async connect (connection, noRebuild) {
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

  return DoboClickhouseDriver
}

export default clickhouseDriverFactory
