export default ($axios) => (resource) => ({
  calculate(payload) {
    return $axios.$post(`${resource}`, payload)
  }
})
