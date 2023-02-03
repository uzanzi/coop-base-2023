<script setup>
import Header from "./components/Header.vue";
import {useSessionStore} from "./stores/session.js";
import {useRouter, useRoute} from "vue-router";
provide('router', useRouter())
provide('route', useRoute())
provide('session', useSessionStore())
let session = useSessionStore()
session.isValid()
</script>

<template>
  <Header/>
  <RouterView />
</template>

<style scoped>
</style>
