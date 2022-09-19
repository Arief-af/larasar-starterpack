<template>
    <q-layout class="flex flex-center">
        <div  class="fixed-top q-ml-xl q-py-lg">
           <q-btn color="primary"  label=" < back" @click="goto('welcome')" />
       </div>
       <div style="margin-top: -100px">
           <div class="content">
               <div class="text-bold b-title text-primary">Login</div>
                <q-input style="width: 100%;" class="q-mt-xl" v-model="user.username" type="text" label="Your username" />
                 <div class="text-negative q-my-sm" v-if="errors.username">{{errors.username[0]}}</div>
                <q-input style="width: 100%;" class="q-mt-xl" v-model="user.password" type="password" label="Your password" />
                 <div class="text-negative q-my-sm" v-if="errors.password">{{errors.password[0]}}</div>
                 <div class="text-negative q-my-sm" v-if="errors.message">{{errors.message[0]}}</div>
           </div>
       </div>

       <div class="fixed-bottom">
           <img class="wave" src="~assets/svg/wave.svg" style="width: 100%; height: 100%;">
            <!-- <img src="~assets/img/welcome.png" alt="" srcset=""  style="width: 100%; height: 100%;"> -->
            <div class="bg-primary" style="margin-top: -30px; height: 100px;">
                <div class="text-center">
                    <q-btn  class="bg-white text-gray mybtn"  label="submit" @click="onSubmit" />
                </div>
            </div>
       </div>
    </q-layout>
</template>

<script>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {api} from 'boot/axios'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
export default {
    setup() {
        const $q = useQuasar()
        const $store = useStore()
        const Router = useRouter()
        let goto = (name) => {
            Router.push({
            name: name
            })
        }
        const errors = ref([]) 
        const user = ref([])
        function onSubmit() {
            api.post('/api/login',{
                username: user.value.username,
                password: user.value.password
            }).then((response) => {
               localStorage.setItem('token',response.data.token)
               api.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
               $store.commit('auth/setUser', response.data.user)
               $q.notify({
                    message: 'Successfully Login',
                    color: 'success'
                })
               Router.push({ name: 'home' })
            }).catch((error) => {
                console.log(error);
                errors.value = error.response.data.errors
            })
        }
        
        return {
            user,goto,onSubmit,errors
        }
    },
}
</script>

