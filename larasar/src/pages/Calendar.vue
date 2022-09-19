<template>
   <div style="min-width: 350px; min-height: 600px">
       <div>
           <center>
            <q-date
                    class="justify-center"
                    v-model="date"
                    minimal
                />
            <div v-if="check && date" class="q-mt-md">You have tasks at {{ date }}</div>
            <div v-if="!check && date" class="q-mt-md">You didn't have tasks at {{ date }}</div>
            </center>
       </div>
   </div>

   
</template>

<script>
import { ref,watchEffect } from 'vue'
export default {
    
    setup() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = `${yyyy}/${mm}/${dd}`
        const data = ref([
            {
                date : '2022/06/21',
                todo: 'membeli seblak'
            }
        ])
        let date = ref()
        date.value = today
        let check = ref(false)
    
        watchEffect(()=>{
            for (let i = 0; i < data.value.length; i++) {
                console.log(date.value);
                console.log(data.value[i].date);
                if (data.value[i].date == date.value) {
                console.log('ada');
                check.value = true
                }
            }
        })
       
        return {
            date, check
        }
    },
}
</script>