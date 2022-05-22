<template>
  <q-page class=" q-pa-lg">


    <div class="userCard q-pa-lg shadow-6 q-my-lg" v-for="(user, index) in dataUsers" :key="user.index">
      {{ user }}
      <q-btn color="primary" icon="check" label="OK" @click="destroy(index)" />
    </div>

    <div class="userCard q-pa-lg shadow-6 q-my-lg" v-for="(item, index) in log" :key="log.index">
      {{ item }}
    </div>

    <q-form
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
   </q-form>

  </q-page>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import axios from 'axios'
export default defineComponent({
  name: 'PageIndex',
  setup(){
    const log = ref([1,2,3,4])
    let dataUsers = ref([])
    const user = ref([])

    dataUsers.value.push(1)
    console.log(dataUsers.value);

    axios.get('http://localhost:8000/api/tes')
    .then((result) => {
      // handle success
      dataUsers.value = result.data.data
      console.log(dataUsers.value);
    })

    function onReset() {
      console.log('reset');
      user.value = []
    }

    function onSubmit() {
       console.log('tes');
       axios.post('http://localhost:8000/api/kirim',{
         name: user.value.name,
         email: user.value.email,
         password: user.value.password
       }).then(function (response) {
        // handle success
        console.log(response.data.data);
        log.value.push(1);
        console.log(log.value);
        dataUsers.value.push(response.data.data);
        user.value = '';
      })
    }

    function destroy(id) {
      dataUsers.value.splice(id, 1);
    }
    return {
      dataUsers,onSubmit,user,onReset,log,destroy
    }
  }
})
</script>
