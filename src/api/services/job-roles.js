export const jobRoles = (api) => ({
  getJobRoles: (name) => api('/job_roles', { query: { name } })
})
