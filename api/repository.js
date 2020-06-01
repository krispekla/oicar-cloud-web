export default ($axios) => (resource) => ({
  get(id) {
    return $axios.$get(`${resource}/${id}`)
  },

  getAll() {
    return $axios.$get(`${resource}/getAll`)
  },

  add(payload) {
    return $axios.$post(`${resource}/add`, payload)
  },

  update(payload) {
    return $axios.$put(`${resource}/update`, payload)
  },

  remove(payload) {
    return $axios.$delete(`${resource}/remove`, payload)
  }
})
