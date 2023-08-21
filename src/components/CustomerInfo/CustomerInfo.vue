<template>
  <a-form-item name="jobRole" label="Job role" required>
    <a-select
      v-model:value="form.jobRole"
      placeholder="Select your role"
      show-search
      :filter-option="false"
      @search="searchJobRoles"
    >
      <a-select-option
        v-for="role in jobRoles"
        :key="role.id"
        :value="role['@id']"
      >
        {{ role.name }}
      </a-select-option>
    </a-select>
  </a-form-item>

  <a-form-item
    required
    label="Company name"
    :name="['memberships', 0, 'company', 'name']"
  >
    <a-select
      v-model:value="form.memberships[0].company.name"
      placeholder="Your company name"
      :filter-option="false"
      show-search
      @search="companySearch = $event"
      @input-key-down="handleCompanySearchKeyDown"
    >
      <a-select-option
        v-for="company in companies"
        :key="company.id"
        :value="company.name"
      >
        {{ company.name }}
      </a-select-option>

      <template #dropdownRender="{ menuNode: menu }">
        <component :is="menu" />
      </template>

      <template #notFoundContent>
        <hr class="my-1" />
        <div class="flex items-center justify-center p-2">
          <a-button v-if="canAddCompany" @click="addCompanyAndSelect">
            Create "{{ companySearch }}" company
          </a-button>
          <a-spin v-else />
        </div>
      </template>
    </a-select>
  </a-form-item>

  <a-form-item
    :name="['memberships', 0, 'company', 'size']"
    label="Company size"
    required
  >
    <a-select
      v-model:value="form.memberships[0].company.size"
      placeholder="Select your company size"
    >
      <a-select-option
        v-for="size in companySizeChoices"
        :key="size.value"
        :value="size.value"
      >
        {{ size.value }} employees
      </a-select-option>
    </a-select>
  </a-form-item>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import debounce from 'lodash/debounce'

import { api } from '../../api/api.js'

const form = defineModel('form')

const companySizeChoices = [
  {
    value: '0-10'
  },
  {
    value: '11-50'
  }
]

const companies = ref([])
const companySearch = ref('')
const isCompaniesLoading = ref(false)

const fetchCompanies = async (search) => {
  isCompaniesLoading.value = true

  const data = await api.company.getCompanies(search)

  companies.value = data['hydra:member']

  isCompaniesLoading.value = false
}

fetchCompanies()

watch(companySearch, debounce(fetchCompanies, 300))

const canAddCompany = computed(() => {
  return (
    !companies.value.length && companySearch.value && !isCompaniesLoading.value
  )
})

const addCompanyAndSelect = () => {
  if (!canAddCompany.value) {
    return
  }

  companies.value.push({
    id: companySearch.value,
    name: companySearch.value
  })
}

const handleCompanySearchKeyDown = (event) => {
  if (event.which === 13) {
    event.preventDefault()
    event.stopPropagation()
    addCompanyAndSelect()
  }
}

const jobRoles = ref([])

const fetchJobRoles = async (search) => {
  const data = await api.jobRoles.getJobRoles(search)

  jobRoles.value = data['hydra:member']
}

fetchJobRoles()

const searchJobRoles = debounce(fetchJobRoles, 300)
</script>
