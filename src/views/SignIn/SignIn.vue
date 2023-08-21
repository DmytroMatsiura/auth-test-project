<template>
  <div>
    <header class="mb-4">
      <thunderbolt-filled class="text-5xl text-sky-400 mb-4" />
    </header>

    <main>
      <a-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        layout="vertical"
        class="flex flex-col mb-8"
        @finish="login"
      >
        <a-form-item name="email" label="Email">
          <a-input
            v-model:value="form.email"
            type="email"
            placeholder="email@example.com"
          >
            <template #prefix>
              <MailOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password" label="Password">
          <a-input-password
            v-model:value="form.password"
            placeholder="********"
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-button
          class="w-full flex items-center justify-center"
          type="primary"
          size="large"
          html-type="submit"
        >
          <rocket-outlined />
          Login
        </a-button>
      </a-form>

      <p class="text-sm text-gray-500">
        Don't have an account? |
        <router-link :to="{ name: routeNames.signUp }">
          Create account
        </router-link>
      </p>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import {
  ThunderboltFilled,
  RocketOutlined,
  MailOutlined,
  LockOutlined
} from '@ant-design/icons-vue'

import { routeNames } from '../../router/constants.js'
import { api } from '../../api/api.js'
import { lsSet } from '../../utils/local-storage.js'

const formRef = ref()
const form = ref({
  email: '',
  password: ''
})

const formRules = {
  email: [{ required: true, message: 'Please input your email' }],
  password: [{ required: true, message: 'Please input your password' }]
}

const login = async () => {
  try {
    await formRef.value.validate()
    const { token, refresh_token } = await api.auth.login(form.value)

    lsSet('access_token', token)
    lsSet('refresh_token', refresh_token)
  } catch (error) {
    if (error.data?.code === 401) {
      message.error('Invalid credentials')
      return
    }

    message.error(error.message ?? 'Something went wrong')
  }
}
</script>
