export const company = (api) => ({
  getCompanies: (name) => api('/companies', { query: { name } })
})
