<script setup>
import {ref} from "vue";
const session = inject('session')
let conversations = reactive({
  list : []
})
let state = reactive({
  conversation: {},
  messages: []
})


let channel = reactive({
  label: '',
  topic: ''
})

function validationFormulaire(){
  api.post(`channels?token=${session.data.token}`, {
    body: channel
  })
    .then((response) => getConversations())
}

function getConversations(){
  api.get(`channels?token=${session.data.token}`)
      .then(response => conversations.list = response)
}

function supprimerConversation(id){
  api.delete(`channels/${id}?token=${session.data.token}`)
  getConversations()
}

getConversations()
</script>

<template>
  <div class="container text-center">
    <h1>Conversations</h1>
    <form @submit.prevent="validationFormulaire">
      <div class="form-group my-2">
        <label class="p-2">sujet de la conversation</label>
        <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Sujet" v-model="channel.topic">
      </div>
      <div class="form-group my-2">
        <label class="p-2">Description de la conversation</label>
        <input type="text" class="form-control" placeholder="Description" v-model="channel.label">
      </div>
      <button type="submit" class="btn btn-primary w-100">Créer la conversation</button>
    </form>
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Crée par</th>
        <th scope="col">Sujet</th>
        <th scope="col">Description</th>
        <th scope="col">Créé le</th>
        <th scope="col">Modifié le</th>
        <th scope="col">Consulter</th>
        <th scope="col">Supprimer</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="conversation in conversations.list">
        <tr>
          <td>{{ conversation.id }}</td>
          <td>{{ conversation.topic }}</td>
          <td>{{ conversation.label }}</td>
          <td>{{ conversation.created_at }}</td>
          <td>{{ conversation.modified_at }}</td>
          <td><router-link class="btn btn-primary" :to="{name: 'conversation', params : {id : conversation.id }}">Consulter</router-link></td>
          <td><button class="btn btn-danger" @click="supprimerConversation(conversation.id)">Supprimer</button></td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>