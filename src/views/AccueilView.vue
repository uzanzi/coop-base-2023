<script setup>
import TheWelcome from "../components/TheWelcome.vue";
import {useUserStore} from "../stores/user";
const user = useUserStore();
onMounted(() => {
  api.get('ping').then(response => {
    console.log("L'api fonctionne !")
  })
  // let member = {fullname:'ok',email:'oui@ok.fr',password:'poiutfgio'};
  // api.delete('members',{body:member}).then(response => {
  //   console.log(response)
  // })
})
</script>

<template>
  <div class="container text-center">
    <TheWelcome/>

  </div>
</template>