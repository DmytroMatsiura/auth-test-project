<template>
  <section class="grid grid-cols-2 gap-x-4">
    <a-form-item name="firstName" label="Name" required>
      <a-input v-model:value="form.firstName" placeholder="Your name" />
    </a-form-item>

    <a-form-item name="lastName" label="Last name" required>
      <a-input v-model:value="form.lastName" placeholder="Your last name" />
    </a-form-item>
  </section>

  <a-form-item name="countryCode" required label="Country">
    <a-select
      v-model:value="form.countryCode"
      placeholder="Select your country"
      show-search
      :filter-option="false"
      @search="search = $event"
    >
      <a-select-option
        v-for="country in filteredCountries"
        :key="country.alpha2Code"
        :value="country.alpha2Code"
      >
        {{ country.name }}
      </a-select-option>
    </a-select>
  </a-form-item>

  <a-form-item name="email" required label="Email">
    <a-input v-model:value="form.email" type="email" placeholder="Your email" />
  </a-form-item>

  <section class="grid grid-cols-2 gap-x-4">
    <a-form-item name="password" required label="Password">
      <a-input-password v-model:value="form.password" placeholder="********" />
    </a-form-item>

    <a-form-item
      label="Confirm password"
      name="passwordConfirmation"
      :rules="[
        {
          required: true,
          validator: validatePasswordConfirmation
        }
      ]"
    >
      <a-input-password
        v-model:value="form.passwordConfirmation"
        required
        placeholder="********"
      />
    </a-form-item>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

import { constants } from '../../constants.js'

const form = defineModel('form')

const validatePasswordConfirmation = (_, value) => {
  if (!value) {
    return Promise.reject('This field is required')
  } else if (value !== form.value.password) {
    return Promise.reject('Passwords do not match')
  }

  return Promise.resolve()
}

const countries = constants.COUNTRIES

const search = ref('')

const filteredCountries = computed(() => {
  if (!search.value) {
    return countries
  }

  return countries.filter((country) => {
    return [country.name.toLowerCase(), country.alpha2Code.toLowerCase()].some(
      (value) => value.includes(search.value.toLowerCase())
    )
  })
})
</script>
