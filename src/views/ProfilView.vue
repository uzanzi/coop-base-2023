<script setup>
  import {ref} from "vue";
  const session = inject('session')
  const route = inject('route')
  const membre = ref(false)
  api.get(`members?token=${session.data.token}`).then(response => {
    response.forEach((data) => {
      if (data.id === route.params.id){
        membre.value = data
      }
    })
  })
</script>

<template>
  <div class="container text-center">
    <h1>Profil</h1>
    <p>{{ membre.id }}</p>
    <p>{{ membre.fullname }}</p>
    <p>{{ membre.created_at }}</p>
  </div>
</template>