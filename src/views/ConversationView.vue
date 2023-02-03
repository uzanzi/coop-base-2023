<script setup>
import {ref} from "vue";
const route = inject("route")
const session = inject('session')
const membre = ref(false)

const conversation = reactive({
  channel: {},
  messages: [],
  membres: [],
})

const post = reactive({
  message: '',
  member_id: session.data.member.id,
  token: session.data.token
})

const editedMessage = reactive({
  message: '',
  token: session.data.token
})

api.get(`channels/${route.params.id}?token=${session.data.token}`)
  .then((response => {
    conversation.channel = response
  }))

function getMembres(){
  return api.get(`members?token=${session.data.token}`).then((response) => {
    conversation.membres = response
  })
}

function getMessages(){
  api.get(`channels/${route.params.id}/posts?token=${session.data.token}`)
    .then((response => {
      response.reverse()
      conversation.messages = response
      if (conversation.messages.length){
        conversation.messages.forEach(message => {
          message.edit = false
          conversation.membres.forEach((membre) => {
            if (membre.id === message.member_id){
              message.membre = membre
              message.delete = false
            }
          })
        })
      }
  }))
}

function posterMessage(){
  api.post(`channels/${route.params.id}/posts`, {
    body: post
  })
    .then((response => {
      getMessages()
      post.message = ''
    }))
}

function editMessage(messageToModify){
  conversation.messages.forEach(message => {
    if(messageToModify.id === message.id){
      message.edit = true
      editedMessage.message = message.message
    }
  })
}

function saveMessage(message){
  api.put(`channels/${conversation.channel.id}/posts/${message.id}`, {
    body: editedMessage
  }).then(r => {
    getMessages()
  })
}

function deleteMessage(message){
  api.delete(`channels/${conversation.channel.id}/posts/${message.id}`, {
    body: {
      token : session.data.token
    }
  })
    .then(response => {
      getMessages()
    })
}
getMembres().then(() => {
  getMessages()
})
</script>

<template>
  <div class="container">
    <div class="text-center">
      <h1>Conversation N°{{ conversation.channel.id }}</h1>
      <h2>Sujet : {{ conversation.channel.topic }}</h2>
      <h3>Description : {{ conversation.channel.label }}</h3>
    </div>
  <template v-for="message in conversation.messages">
    <div class="card m-4">
      <div class="card-body bg-light">
        <p><small>Posté par : <router-link :to="{name: 'profil', params : {id : message.membre.id }}">{{ message.membre.fullname }}</router-link> le : {{ message.created_at }} Modifié le : {{ message.modified_at }}</small></p>
        <p>{{ message.message }}<template v-if="session.data.member.id === message.membre.id"><i class="bi bi-pencil-fill mx-1 pe-auto" @click="editMessage(message)"></i><i class="bi bi-trash-fill" @click="deleteMessage(message)"></i></template></p>
          <template v-if="message.edit === true">
            <div class="form-outline">
              <textarea class="form-control" rows="2" v-model="editedMessage.message"></textarea>
              <div class="float-end mt-2 pt-1">
                <button type="button" class="btn btn-primary btn-sm mx-2" @click="saveMessage(message)">Modifier</button>
                <button type="button" class="btn btn-outline-primary btn-sm">Annuler</button>
              </div>
            </div>
          </template>
      </div>
    </div>
  </template>
    <form @submit.prevent="posterMessage">
      <div class="form-group my-2">
        <input type="text" class="form-control my-2" aria-describedby="emailHelp" placeholder="Message" v-model="post.message">
        <button type="submit" class="btn btn-primary w-100">Poster</button>
      </div>
    </form>
  </div>
</template>