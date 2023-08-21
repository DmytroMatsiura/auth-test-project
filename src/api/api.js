import { company } from './services/company.js'
import { apiUat } from './instances.js'
import { jobRoles } from './services/job-roles.js'
import { auth } from './services/auth.js'
import { users } from './services/users.js'

export const api = {
  company: company(apiUat),
  jobRoles: jobRoles(apiUat),
  auth: auth(apiUat),
  users: users(apiUat)
}
