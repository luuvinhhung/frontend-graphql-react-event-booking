import AuthStore from './authentication'
// import i18nStore from './i18n'

// Root Store Declaration
class Store {
  constructor () {
    this.authStore = new AuthStore(this)
    // this.i18nStore = new i18nStore(this)
  }
}
export default new Store()
