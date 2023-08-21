<template>
  <section class="flex flex-col gap-y-2 py-2">
    <strong class="text-lg">{{ title }}</strong>

    <span>{{ value }}</span>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Title'
  },
  value: {
    type: String,
    default: 'Value'
  }
})
</script>
