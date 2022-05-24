<template>
    <div class="q-pa-lg ">
        
        {{ errors }} <!-- log -->
        <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
        >
            <!-- input -->
            <div class="form-label">
                <q-input v-model="user.username" type="text" label="Username" />
                <div class="text-negative q-my-sm" v-if="errors.username">{{errors.username[0]}}</div>
            </div>
            <div class="form-label">
                <q-input v-model="user.password" type="password" label="Password" />
                <div class="text-negative q-my-sm" v-if="errors.password">{{errors.password[0]}}</div>
            </div>
            <div class="form-label">
                <div class="text-negative q-my-sm" v-if="errors.message">{{errors.message[0]}}</div>
            </div>
            <!-- button submit -->
            <div>
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
        </q-form>
    </div>
</template>


<script>
import { api } from 'boot/axios'
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import { useStore } from 'vuex'
export default {
    setup() {
        const $store = useStore()
        const router = useRouter()
        const user = ref([])
        const errors = ref([])
        const loginLog = ref(null)
        function onReset() {
            user.value = []
        }
        function onSubmit() {
            api.post('/api/login',{
                username: user.value.username,
                password: user.value.password
            }).then((response) => {
               localStorage.setItem('token',response.data.token)
               $store.commit('user/setUser', response.data.user)
               router.push({ name: 'index' })
            }).catch((error) => {
                errors.value = error.response.data.errors
            })
        }
        return {
            user,onReset,onSubmit,errors,loginLog,router    
        }
    },
}
</script>