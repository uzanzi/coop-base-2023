<script setup>
import {useRouter} from "vue-router";

const router = useRouter()


let member = reactive({
  fullname: '',
  email: '',
  password: ''
})

function validationFormulaire(){
  api.post('members', {
    body : member

  }).then((response) => {
    if (response.message){
      alert(response.message)
    }else {
      if (confirm("Votre compte à bien été créé. Voulez-vous vous connecter ?")){
        // rediriger vers un la route /se-connecter
        router.push('/connexion')
      }
    }
  })
}
</script>
<template>
  <main class="container">
    <h1>Créer un compte</h1>
    <form @submit.prevent="validationFormulaire">
      <div class="form-group my-2">
        <label class="p-2">Email</label>
        <input type="email" class="form-control" v-model="member.email" aria-describedby="emailHelp" placeholder="Email">
      </div>
      <div class="form-group my-2">
        <label class="p-2">Nom</label>
        <input type="text" class="form-control" v-model="member.fullname" placeholder="Nom">
      </div>
      <div class="form-group my-2">
        <label class="p-2">Password</label>
        <input type="password" class="form-control" v-model="member.password" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary w-100">S'inscrire</button>
    </form>
  </main>
</template>