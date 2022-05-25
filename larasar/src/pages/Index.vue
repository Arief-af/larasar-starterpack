<template>
  <q-page class=" q-pa-lg">

    <div class="userCard q-pa-lg shadow-6 q-my-lg">
      Data from auth
      <div class="q-my-md">
        {{ currentUser }}
      </div>
    </div>
    
   <q-card class="my-card">
     <q-card-actions class="q-pl-md">
      State button
     </q-card-actions>
     <q-card-section>
       <!-- <q-btn color="primary" icon="check" label="logout" @click="logout" /> -->
       <q-btn class="q-ml-sm" color="warning" icon="check" :label="likes" @click="addLike" />
     </q-card-section>
   </q-card>

   <q-card class="my-card">
     <q-card-actions class="q-pl-md q-mt-lg">
      Data Tabel
     </q-card-actions>
     <q-card-section>
       <!-- <q-btn color="primary" icon="check" label="logout" @click="logout" /> -->
       <q-btn class="q-ml-sm" color="warning" @click="goto('Table')" icon="home" label="Room" />
     </q-card-section>
   </q-card>
    
    <!-- <div class="userCard q-pa-lg shadow-6 q-my-lg" v-for="(user, index) in users" :key="user.index">
       <q-btn color="primary" icon="delete" label="" @click="destroy(index)" />
      {{ user }}
    </div> -->

    <!-- <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
     
    <q-input v-model="user.name" type="text" label="name" />
    <q-input v-model="user.email" type="email" label="email" />
    <q-input v-model="user.password" type="password" label="password" />

     <div>
       <q-btn label="Submit" type="submit" color="primary"/>
       <q-btn label="Reset" @click="onReset" type="reset" color="primary" flat class="q-ml-sm" />
     </div>
   </q-form> -->

  </q-page>
</template>

<script>
import { defineComponent,cumputed, reactive, ref, computed } from 'vue';
import { api } from 'boot/axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageIndex',
  setup(){
    const router = useRouter()
    let users = ref([])
    const user = ref([])
    const $store = useStore()
    const currentUser = $store.state.user.user

    // api.get('/api/tes')
    // .then((result) => {
    //   // handle success
    //   users.value = result.data.data
    // })

    // function onReset() {
    //   user.value = []
    // }

    // function onSubmit() {
    //    api.post('/api/kirim',{
    //      name: user.value.name,
    //      email: user.value.email,
    //      password: user.value.password
    //    }).then(function (response) {
    //     // handle success
    //     users.value.push(response.data.data);
    //     user.value = '';
    //   })
    // }

    // function destroy(id) {
    //   users.value.splice(id, 1);
    // }

    
    const likes = computed(()=>{
      return $store.state.user.totalLikes;
    })
  
    const addLike = () => {
      $store.commit('user/increment')
    }
    
    let goto = (name) => {
      if (router.name !== name) {
          router.push(
          {
              name: name
          }
          )
      }else{
        
      }
    }
    
    return {
      currentUser,users,user,addLike,likes,goto
    }
  }
})
</script>
