<template>
   <div style="min-width: 350px; min-height: 600px">
       <q-carousel
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated
            control-color="primary"
            arrows
            height="200px"
            class="bg-white shadow-2 rounded padding-none"
    >
      <q-carousel-slide :name="1" class="flex flex-center items-center">
           <div class="text-center text-bold text-primary">
             Today
            <br>
            <q-circular-progress
              show-value
              font-size="20px"
              value=91
              size="100px"
              :thickness="0.22"
              color="primary"
              track-color="grey-3"
              class="q-ma-md"
            >
            81
           </q-circular-progress>
           </div>
           <img src="~assets/img/progress.png" alt="" srcset="">
  
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="flex flex-center items-center">
        <div class="text-center text-bold text-primary">
             Tomorrow
            <br>
            <q-circular-progress
              show-value
              font-size="20px"
              value="0"
              size="100px"
              :thickness="0.22"
              color="primary"
              track-color="grey-3"
              class="q-ma-md"
            >
            0
           </q-circular-progress>
           </div>
           <img src="~assets/img/progress.png" alt="" srcset="">
      </q-carousel-slide>
    </q-carousel>

     <div style="width: 100%; height: 100%;">

     <div class="q-mt-md">

      <q-input rounded type="text" outlined v-model="search" placeholder="search" >
       
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">Field content</div>
        </template>

        <template v-slot:append>
          <q-icon name="search" class="cursor-pointer" />
        </template>

      </q-input>
    
     <q-list bordered class="q-mt-md" style="border-radius: 40px !important" v-for="(item, index) in filteredList" :key="index">
       <q-item :class="item.status == true ? 'bg-primary text-white' : ''"  rounded clickable v-ripple @click="status(item.id,index)" style="border-radius: 40px">
         <q-item-section>{{ item.name }}</q-item-section>
         <q-item-section side>
           <q-checkbox
            val="red" 
            keep-color
            class="text-white"
            :color="item.status == true ? 'white' : 'grey'"
            left-label
            v-model="item.status"
            checked-icon="task_alt"
            unchecked-icon="highlight_off"
          />
         </q-item-section>
       </q-item>
     </q-list>     

    </div>

     </div>
   </div>
</template>

<script>
import { computed, ref } from 'vue'
import { api } from 'boot/axios'
export default {
    setup() {
       
        let data = ref([])
        api.get('/api/tasks').then((response)=>{
          data.value = response.data.data
        })
        let status = (id,index) => {
          api.put(`/api/task/${id}/status`)
          .then(()=>{
            data.value[index].status = !data.value[index].status
          })
        }
        let search = ref('')
        let slide = ref(1)
        let shape = ref(true)
        let filteredList = computed(() => {
              return data.value.filter(tasks => {
              return tasks.name.toLowerCase().includes(search.value.toLowerCase())
          })
        })
        return {
            slide,search, shape, data,status,filteredList
        }
    },
}
</script>