export const auth = (api) => ({
  login: (data) => api('/authentication_token', { method: 'POST', body: data })
})
