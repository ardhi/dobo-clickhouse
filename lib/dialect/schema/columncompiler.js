// From: https://github.com/DnAp/KnexClickhouseDialect/blob/master/src/schema/columncompiler.js

async function factory () {
  const { importModule } = this.app.bajo

  const ColumnCompiler = await importModule('doboKnex:node_modules/knex/lib/schema/columncompiler.js')
  const Raw = await importModule('doboKnex:node_modules/knex/lib/raw.js')

  class ColumnCompilerClickHouse extends ColumnCompiler {
    modifiers = ['defaultTo']

    increments = 'UUID default generateUUIDv7()'

    bigincrements = 'UUID default generateUUIDv7()'

    smallint = 'Int8'

    mediumint = 'Int16'

    integer = 'Int32'

    bigint = 'Int64'

    text = 'String'

    varchar = 'String'

    datetime = 'datetime'

    timestamp = 'datetime'

    time = 'time'

    double (precision, scale) {
      return `Decimal32(${this._num(precision, 8)}, ${this._num(scale, 2)})`
    }

    enu (allowed) {
      // todo
      // let enumData = [];
      // allowed.forEach((v, k) => {
      //     enumData += '';
      // });
      return `enum('${allowed.join('\', \'')}')`
    }

    bit (length) {
      return length ? `bit(${this._num(length)})` : 'bit'
    }

    binary (length) {
      return length ? `varbinary(${this._num(length)})` : 'blob'
    }

    json () {
      return 'json'
    }

    jsonb () {
      return 'json'
    }

    // Modifiers
    // ------

    defaultTo (value) {
      if (value === null || value === undefined) {
        return ''
      }
      if (value instanceof Raw) {
        value = value.toQuery()
      } else if (this.type === 'bool' || this.type === 'UInt8') {
        if (value === 'false') value = 0
        value = value ? 1 : 0
      } else {
        value = this.client._escapeBinding(value.toString())
      }
      return 'default ' + value
    }

    unsigned () {
      return ''
    }

    comment () {
      return ''
    }

    first () {
      return ''
    }

    after (column) {
      return `after ${this.formatter.wrap(column)}`
    }

    collate (collation) {
      return collation && `collate '${collation}'`
    }
  }

  return ColumnCompilerClickHouse
}

export default factory
