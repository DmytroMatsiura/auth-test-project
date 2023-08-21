<template>
  <a-modal v-model:open="isOpened" centered :footer="false">
    <main class="flex flex-col">
      <check-circle-two-tone class="text-3xl mb-6" />

      <p>Please confirm your email address</p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci
        beatae, laboriosam neque quae velit! Adipisci amet animi, architecto
        enim eveniet exercitationem hic id labore laudantium, nemo pariatur
        sapiente sequi!
      </p>

      <p>
        Didn't receive the email?
        <button class="text-blue-500 underline" @click="resendEmail">
          Resend now
        </button>
      </p>
    </main>
  </a-modal>
</template>

<script setup>
import { CheckCircleTwoTone } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

import { useStore } from '../../store.js'
import { api } from '../../api/api.js'

const mainStore = useStore()

const isOpened = defineModel('isOpened')

const resendEmail = async () => {
  try {
    await api.users.resendVerificationEmail(
      mainStore.user.uuid,
      mainStore.user.email
    )
    message.success('Email sent')
  } catch (error) {
    message.error(error.message)
  }
}
</script>
