<script setup>
import {useRouter} from "vue-router";
import {useSessionStore} from "../stores/session.js";
import {useUserStore} from "../stores/user.js";

let router = useRouter()
let session = useSessionStore()
let user = useUserStore()

let member = reactive({
  email: '',
  password: ''
})
function validationFormulaire(){
  api.post('members/signin', {
    body: member
  }).then(response => {
    if (response.message){
      alert(response.message)
    }else {
      session.setSession(response.member, response.token)
      router.push('/')
    }
  })
}
</script>

<template>
  <main>
    <main class="container">
      <h1>Se connecter</h1>
      <form @submit.prevent="validationFormulaire">
        <div class="form-group my-2">
          <label class="p-2">Email</label>
          <input type="email" class="form-control" v-model="member.email" aria-describedby="emailHelp" placeholder="Email">
        </div>
        <div class="form-group my-2">
          <label class="p-2">Mot de passe</label>
          <input type="password" class="form-control" v-model="member.password" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary w-100">Se connecter</button>
        <small><router-link to="inscription">S'inscrire</router-link></small>
      </form>
    </main>
  </main>
</template>
