<template>
    <q-layout class="flex flex-center">
       <div  v-if="page <= 1"  class="fixed-top q-ml-xl q-py-lg">
           <q-btn color="primary"  label=" < back" @click="goto('welcome')" />
       </div>
       <div v-if="page >= 2" class="fixed-top q-ml-xl q-py-lg">
           <q-btn color="primary"  label=" < back" @click="page -= 1" />
       </div>
       <div style="margin-top: -100px">
           <div class="content">
                <div class="text-bold b-title text-primary">CREATE <br> ACCOUNT</div>
                    <q-input 
                        v-if="page == 1" 
                        style="width: 100%;" 
                        class="q-mt-xl" 
                        v-model="user.email" 
                        type="email" 
                        label="Your email" 
                    />
                    <div class="text-negative q-my-sm" v-if="errors.email && page == 1">{{errors.email[0]}}</div>

                    <q-input 
                        v-if="page == 2" 
                        style="width: 100%;" 
                        class="q-mt-xl" 
                        v-model="user.name"
                        type="text" 
                        label="Your name" 
                    />
                    <div class="text-negative q-my-sm" v-if="errors.name && page == 2">{{errors.name[0] }}</div>

                    <q-input 
                        v-if="page == 3" 
                        style="width: 100%;" 
                        class="q-mt-xl" 
                        v-model="user.username"
                        type="text" 
                        label="Your username" 
                    />
                    <div class="text-negative q-my-sm" v-if="errors.username && page == 3">{{errors.username[0]}}</div>

                    <q-input 
                        v-if="page == 4" 
                        style="width: 100%;" 
                        class="q-mt-xl" 
                        v-model="user.password"
                        type="password" 
                        label="Your password" 
                    />
                    <div class="text-negative q-my-sm" v-if="errors.password && page == 4">{{errors.password[0] }}</div>

                    <q-input 
                        v-if="page == 4" 
                        style="width: 100%;" 
                        v-model="user.password_confirmation"
                        type="password" 
                        label="Your password confirmation" 
                    />
                    <div class="text-negative q-my-sm" v-if="errors.password_confirmation && page == 4">{{errors.password_confirmation[0] }}</div>
           </div>
       </div>

       <div class="fixed-bottom">
           <img class="wave" src="~assets/svg/wave.svg" style="width: 100%; height: 100%;">
            <!-- <img src="~assets/img/welcome.png" alt="" srcset=""  style="width: 100%; height: 100%;"> -->
            <div class="bg-primary" style="margin-top: -30px; height: 100px;">
                <div class="text-center">
                    <q-btn v-if="page < 4" class="bg-white text-gray mybtn"  label="next" @click="page += 1" />
                    <q-btn v-if="page == 4" class="bg-white text-gray mybtn"  label="submit" @click="submit" />
                </div>
            </div>
       </div>
    </q-layout>
</template>

<script>
import {api} from 'boot/axios'
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
export default {
    setup() {
        const $q = useQuasar()
        const Router = useRouter()
        let goto = (name) => {
            Router.push({
                name: name
            }) 
        }
        const errors = ref([])
        const page = ref(1)
        const user = ref([])

        function submit() {
            api.post('/api/register',{
                name: user.value.name,
                email: user.value.email,
                username: user.value.username,
                password: user.value.password,
                password_confirmation: user.value.password_confirmation,
            }).then(() => {
                user.value = []
                $q.notify({
                    message: 'Successfully registered',
                    color: 'success'
                })
                Router.push({
                    name: 'Login'
                })
                 
            }).catch((error) => {
                page.value = 1
                errors.value = error.response.data.errors
                errors.value['password_confirmation'] = ["Password confirmation didn't match"]
            })
        }
        
        return {
            user, page, submit, errors,goto
        }
    },
}
</script>
