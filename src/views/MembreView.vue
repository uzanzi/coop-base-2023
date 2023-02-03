<script setup>
import { ref } from 'vue'
let membres = ref(false)
let session = inject('session')
api.get(`members?token=${session.data.token}`).then(response => {
  membres.value = response
})
</script>

<template>
  <div class="container text-center">
    <h1>Membres</h1>
    <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Adresse mail</th>
            <th scope="col">Créé le</th>
            <th scope="col">profil</th>
            <th scope="col">Supprimer</th>
          </tr>
        </thead>
        <tbody>
        <template v-for="membre in membres">
          <tr>
            <td>{{ membre.fullname }}</td>
            <td>{{ membre.email }}</td>
            <td>{{ membre.created_at }}</td>
            <td><router-link class="btn btn-primary" :to="{name: 'profil', params : {id : membre.id }}">Profil</router-link></td>
            <td><button class="btn btn-danger">Supprimer</button></td>
          </tr>
        </template>
        </tbody>
      </table>
  </div>
</template>