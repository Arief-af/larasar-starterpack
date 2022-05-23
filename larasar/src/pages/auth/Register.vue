<template>
    <div class="q-pa-lg ">
        {{ errors }}
        <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
        >
            <!-- input -->
            <div class="form-label">
                <q-input v-model="user.email" type="text" label="Email" />
                <div class="text-negative q-my-sm" v-if="errors.email">{{errors.email[0]}}</div>
            </div>
            <div class="form-label">
                <q-input v-model="user.name" type="text" label="Name" />
                <div class="text-negative q-my-sm" v-if="errors.name">{{errors.name[0]}}</div>
            </div>
            <div class="form-label">
                <q-input v-model="user.username" type="text" label="Username" />
                <div class="text-negative q-my-sm" v-if="errors.username">{{errors.username[0]}}</div>
            </div>
            <div class="form-label">
                <q-input v-model="user.password" type="password" label="Password" />
                <div class="text-negative q-my-sm" v-if="errors.password">{{errors.password[0]}}</div>
            </div>
            <div class="form-label">
                 <q-input v-model="user.password_confirmation" type="password" label="Confirm Password" />
                <div class="text-negative q-my-sm" v-if="errors.password_confirmation">{{errors.password_confirmation[0]}}</div>
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
import {ref} from 'vue'
import { api } from 'boot/axios'
export default {
    setup() {
        const user = ref([])
        const errors = ref([])
        function onReset() {
            user.value = []
            errors.value = []
        }
        function onSubmit() {
            api.post('/api/register',{
                name: user.value.name,
                email: user.value.email,
                username: user.value.username,
                password: user.value.password,
                password_confirmation: user.value.password_confirmation,
            }).then(() => {
                console.log('saved');
                user.value = []
            }).catch((error) => {
                // console.log(error.response.data);
                errors.value = error.response.data.errors
                errors.value['password_confirmation'] = ["Password confirmation didn't match"]
            })
            console.log('submit');
        }
        return {
            user,onReset,onSubmit,errors
        }
    },
}
</script>