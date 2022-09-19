<template>
    <q-layout class="flex flex-center items-center">
        
       <div class="content">
           <img src="~assets/img/welcome.png" alt="" srcset="">
           <div class="text-center text-bold f-title text-primary">WELCOME TO  SENARAI APP</div>
           <p class="text-center">Buat harimu menjadi lebih teratur</p>
       </div>
       <div class="fixed-bottom">
           <img src="~assets/svg/wave.svg" style="width: 100%; height: 100%;">
            <!-- <img src="~assets/img/welcome.png" alt="" srcset=""  style="width: 100%; height: 100%;"> -->
           <div class="bg-primary" style="margin-top: -30px; height: 100px;">
              
                   <div class="text-center">
                       <q-btn class="bg-white text-gray mybtn"  label="LET’S START" @click="register" />
                       <div class="q-my-sm text-white cursor-pointer" @click="login">Already have Account?</div>
                   </div>
             
           </div>
       </div>
    </q-layout>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    setup() {
        const Router = useRouter()
        const register = () => {
            Router.push({
                name: 'Register'
            })
        }
        const login = () => {
            Router.push({
                name: 'Login'
            })
        }
        return {register,login}
    },
}
</script>
