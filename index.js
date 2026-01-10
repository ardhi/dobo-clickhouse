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
  class DoboClickhouse extends this.app.baseClass.Base {
    constructor () {
      super(pkgName, me.app)
      this.config = {
        connections: []
      }
    }

    exit = () => {
    }
  }

  return DoboClickhouse
}

export default factory
