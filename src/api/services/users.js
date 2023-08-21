export const users = (api) => ({
  register: (data) => api('/users/register', { method: 'POST', body: data }),
  getCurrentUser: () => api('/users/me')
})
