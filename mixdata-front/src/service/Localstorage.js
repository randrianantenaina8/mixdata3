export const Localstorage = () => {
  const ITEM = "MIXDATA_STATE"
  return {
    isAuth: () => {
      return localStorage.getItem(ITEM)
    },
    authenticate: (item) => {
      localStorage.setItem(ITEM, JSON.stringify(item))
    },
    clearAuth: () => {
      localStorage.removeItem(ITEM)
    }
  }
}
