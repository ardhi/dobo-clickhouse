// From: https://github.com/DnAp/KnexClickhouseDialect/blob/master/src/transaction.js

/**
 * @implements {Knex.Transaction}
 */
class TransactionClickHouse {
  executionPromise = Promise.resolve(undefined)

  commit (value) {
    return undefined
  }

  isCompleted () {
    return true
  }

  query (conn, sql, status, value) {
    return undefined
  }

  rollback () {
    return undefined
  }

  savepoint (transactionScope) {
    return undefined
  }
}

export default TransactionClickHouse
