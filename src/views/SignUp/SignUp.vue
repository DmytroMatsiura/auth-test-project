<template>
  <div>
    <header class="mb-4">
      <thunderbolt-filled class="text-5xl text-sky-400 mb-4" />

      <h1>{{ currentStepData.title }}</h1>
    </header>

    <main>
      <a-form
        ref="formRef"
        :model="form"
        layout="vertical"
        class="flex flex-col mb-8"
        @finish="proceed"
      >
        <keep-alive>
          <component :is="currentStepData.component" v-model:form="form" />
        </keep-alive>

        <footer class="flex gap-x-4">
          <a-button
            v-if="!isFirstStep"
            class="w-full flex-[25%]"
            type="primary"
            ghost
            danger
            size="large"
            @click="goToPrevStep"
          >
            Back
          </a-button>

          <a-button
            class="w-full"
            type="primary"
            size="large"
            html-type="submit"
          >
            {{ isLastStep ? 'Register' : 'Continue' }}
          </a-button>
        </footer>
      </a-form>

      <p class="text-sm text-gray-500">
        Already have an account? |
        <router-link :to="{ name: routeNames.signIn }">Login</router-link>
      </p>
    </main>
  </div>

  <ConfirmEmailModal v-model:is-opened="isConfirmEmailModalOpened" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { message } from 'ant-design-vue'
import { ThunderboltFilled } from '@ant-design/icons-vue'

import { routeNames } from '../../router/constants.js'
import { api } from '../../api/api.js'

import AccountInfo from '../../components/AccountInfo/AccountInfo.vue'
import CustomerInfo from '../../components/CustomerInfo/CustomerInfo.vue'
import ConfirmEmailModal from '../../components/ConfirmEmailModal/ConfirmEmailModal.vue'

const formRef = ref()
const form = ref({
  email: '',
  password: '',
  passwordConfirmation: '',
  firstName: '',
  lastName: '',
  countryCode: null,
  jobRole: null,
  memberships: [
    {
      company: {
        name: null,
        size: null,
        businessPlan: ''
      }
    }
  ]
})

const stepKeys = {
  accountInfo: 'accountInfo',
  customerInfo: 'customerInfo'
}

const steps = [
  {
    key: stepKeys.accountInfo,
    title: 'Register',
    component: AccountInfo,
    nextStepKey: stepKeys.customerInfo
  },
  {
    key: stepKeys.customerInfo,
    title: 'Information about you',
    component: CustomerInfo,
    prevStepKey: stepKeys.accountInfo
  }
]

const currentStepKey = ref(stepKeys.accountInfo)

const currentStep = computed(() => {
  return steps.find((step) => step.key === currentStepKey.value)
})

const isFirstStep = computed(() => {
  return !currentStep.value.prevStepKey
})

const isLastStep = computed(() => {
  return !currentStep.value.nextStepKey
})

const goToPrevStep = () => {
  if (currentStep.value.prevStepKey) {
    currentStepKey.value = currentStep.value.prevStepKey
  }
}

const currentStepData = computed(() => {
  return steps.find((step) => step.key === currentStepKey.value)
})

const isConfirmEmailModalOpened = ref(false)

const registerAccount = async () => {
  try {
    await formRef.value.validate()
    await api.users.register(form.value)
    isConfirmEmailModalOpened.value = true
  } catch (error) {
    message.error(error.data?.['hydra:title'] || error.message)
  }
}

const proceed = () => {
  if (currentStep.value.nextStepKey) {
    currentStepKey.value = currentStep.value.nextStepKey
  } else {
    registerAccount()
  }
}
</script>
