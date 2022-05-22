<template>
  <q-page class="flex flex-center">
   tes
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import axios from 'axios'
export default defineComponent({
  name: 'PageIndex',
  setup(){
    const data = ref([])

    axios.get('/tes').then(function (response) {
      // handle success
      console.log(response);
    })
    return {
      data
    }
  }
})
</script>
