/**
 * Plugin factory
 *
 * @param {string} pkgName - NPM package name
 * @returns {class}
 */
async function factory (pkgName) {
  const me = this

  /**
   * DoboClickhouse class
   *
   * @class
   */
  class DoboClickhouse extends this.app.pluginClass.base {
    static alias = 'dbclickhouse'
    static dependencies = ['dobo', 'dobo-knex']

    constructor () {
      super(pkgName, me.app)
      this.config = {
        connections: []
      }
    }

    exit = () => {
      for (const instance of this.instances) {
        instance.client.destroy()
      }
    }
  }

  return DoboClickhouse
}

export default factory
