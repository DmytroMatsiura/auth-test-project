<template>
  <a-config-provider
    :theme="{
      token: {
        fontFamily: 'Roboto, sans-serif'
      }
    }"
  >
    <a-spin :spinning="isLoading" tip="Loading..." size="large">
      <a-layout class="bg-sky-50 min-h-screen p-4">
        <a-layout-content
          class="shadow rounded-2xl bg-sky-100 bg-opacity-75 flex flex-col"
        >
          <router-view v-if="!isLoading" />
        </a-layout-content>
      </a-layout>
    </a-spin>
  </a-config-provider>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

import { api } from './api/api.js'
import { useStore } from './store.js'
import { routeNames } from './router/constants.js'

const router = useRouter()
const mainStore = useStore()

const isLoading = ref(false)

const loadAppData = async () => {
  isLoading.value = true

  try {
    mainStore.user = await api.users.getCurrentUser()
  } catch (e) {
    message.warn('You need to login to access this page.')
    router.push({ name: routeNames.signIn })
  } finally {
    isLoading.value = false
  }
}

loadAppData()
</script>
