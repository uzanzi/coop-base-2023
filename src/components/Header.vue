<script setup>
import {useUserStore} from "../stores/user.js";
import {useSessionStore} from "../stores/session.js";
let user = useUserStore()
let session = useSessionStore()
function deconnexion(){
  api.delete('members/signout', { body : { token : session.data.token }}).then(response => console.log(response))
  session.emptySession()
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Co'op</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Accueil</router-link>
          </li>
          <template v-if="session.data.token">
            <li class="nav-item">
              <router-link class="nav-link" to="/membres">Membres</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/conversations">Conversations</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link" @click="deconnexion">Déconnexion</router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="/connexion" class="nav-link">Connexion</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
