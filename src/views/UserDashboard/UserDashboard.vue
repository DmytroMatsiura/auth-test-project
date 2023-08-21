<template>
  <a-layout v-if="user" class="bg-transparent">
    <a-layout-header
      class="!bg-amber-200 rounded-t-2xl flex justify-center items-center relative"
    >
      <strong class="text-lg">{{ user.firstName }} {{ user.lastName }}</strong>

      <a-avatar
        size="large"
        class="bg-sky-400 flex justify-center items-center absolute left-1/2 -translate-x-1/2 -bottom-6"
      >
        <template #icon>
          <user-outlined />
        </template>
      </a-avatar>

      <a-button
        shape="round"
        type="primary"
        class="flex items-center justify-center text-white absolute right-4 top-1/2 -translate-y-1/2"
        @click="logout"
      >
        Logout
        <logout-outlined />
      </a-button>
    </a-layout-header>

    <a-layout-content class="p-12 flex flex-col items-center">
      <section class="w-full max-w-2xl">
        <h1 class="mb-4 text-center">Dashboard</h1>

        <a-card>
          <template #title>
            <h2 class="text-2xl mb-0">User Info</h2>
          </template>

          <main class="grid gap-y-4">
            <InfoItem
              v-for="infoField in userInfoFields"
              :key="infoField.title"
              :title="infoField.title"
              :value="infoField.value"
              class="border-b last:border-b-0"
            />
          </main>
        </a-card>
      </section>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { useStore } from '../../store.js'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { routeNames } from '../../router/constants.js'
import { lsRemove } from '../../utils/local-storage.js'

import InfoItem from '../../components/InfoItem/InfoItem.vue'

const router = useRouter()

const { user } = storeToRefs(useStore())

const userInfoFields = computed(() => {
  return [
    {
      title: 'First name',
      value: user.value.firstName
    },
    {
      title: 'Last name',
      value: user.value.lastName
    },
    {
      title: 'Email',
      value: user.value.email
    }
  ]
})

const logout = () => {
  lsRemove('access_token')
  lsRemove('refresh_token')
  router.push({ name: routeNames.signIn })
}
</script>
