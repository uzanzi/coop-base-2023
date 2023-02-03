import {inject, ref} from 'vue'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', () => {

    const router = inject('router')

    const data = reactive({
        member: {},
        token: false,
    })

    function setSession(member, token){
        data.member = member
        data.token = token
    }

    function emptySession(){
        data.member = false
        data.token = false
    }

    async function isValid(){
        if (!data.token){
            seConnecter()
            return false
        }else {
            const mid = data.member.id
            const response = await api.get(`members/${mid}/signedin?token=${data.token}`)
            const d = await response
            if (!d.token){
                seConnecter()
                return false
            }
            return true
        }
    }

    function seConnecter(){
        router.push('/connexion')
    }
    return { data, setSession, isValid, emptySession }
}, {
    persist: true,
})
