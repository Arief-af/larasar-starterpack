<template>
  <q-page>

       
        <q-date
        v-model="date"
        minimal
       
      />
      <br>
       {{ date }}

  <!-- {{ check }}
      <div v-if="check">
        Anda memiliki tasks yang harus dikerjakan
      </div>
      <div v-else>
        Anda tidak memiliki tasks
      </div> -->

      <q-btn color="primary" icon="check" :label="num" @click="num += 1" />
  </q-page>
</template>

<script>
import {  ref, watchEffect } from 'vue'

export default {
  setup () {
    let date = ref()
    const data = ref([
      {
        date : '2022/06/21',
        todo: 'membeli seblak'
      }
    ])

    // if (data != data.) {
      
    // }

    watchEffect(()=>{
        for (let i = 0; i < data.value.length; i++) {
         console.log(date.value);
         console.log(data.value[i].date);
        if (data.value[i].date == date.value) {
          console.log('ada');
          // check.value = true
        }
      }
    })

    
    return {
      date
    }
  }
}
</script>
