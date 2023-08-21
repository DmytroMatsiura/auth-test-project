<template>
  <main class="grid grid-cols-2 flex-1">
    <section class="border-r-4 border-amber-400 p-24">
      <router-view />
    </section>

    <section class="bg-amber-50 rounded-r-2xl flex items-center p-24">
      <figure class="flex flex-col items-center">
        <img src="../assets/images/auth/man-at-pc.svg" alt="man at pc" />

        <figcaption class="text-lg max-w-lg text-center">
          Improve your customer experience by creating concrete foundation for
          your projects
        </figcaption>
      </figure>
    </section>
  </main>
</template>

<script setup></script>
