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
        <div class="flex">
            <q-input rounded type="text" outlined v-model="saerch" placeholder="search" >
            
              <template v-slot:prepend>
                <q-btn @click="newDataDialog = !newDataDialog" color="primary" rounded label="new"/>
              </template>
              
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">Field content</div>
              </template>

              <template v-slot:append>
                <q-icon name="search" class="cursor-pointer" />
              </template>

            </q-input>
        </div>
      
      <q-list bordered class="q-mt-md" style="border-radius: 40px">
        <q-item rounded @click="shape = !shape" style="border-radius: 40px">
          <q-item-section>Icon as side</q-item-section>
          <q-item-section side>
            <div class="flex items-center">
                  <q-btn-group push>
                      <q-btn class="bg-primary text-white" rounded flat icon="delete" />
                      <q-btn class="bg-primary text-white" @click="edit(0)" rounded flat icon="edit" />
                  </q-btn-group>
            </div>
          </q-item-section>
        </q-item>
      </q-list>

      <q-list bordered class="q-mt-md" style="border-radius: 40px !important">
        <q-item  rounded @click="shape = !shape" style="border-radius: 40px">
          <q-item-section>Icon as side</q-item-section>
          <q-item-section side>
            <div class="text-white flex items-center">
                  <q-btn-group push>
                      <q-btn class="bg-primary text-white" rounded flat icon="delete" />
                      <q-btn class="bg-primary text-white" @click="edit(1)" rounded flat icon="edit" />
                  </q-btn-group>
            </div>
          </q-item-section>
        </q-item>
      </q-list>

      <q-list bordered class="q-mt-md" style="border-radius: 40px">
        <q-item rounded @click="shape = !shape" style="border-radius: 40px">
          <q-item-section>Icon as side</q-item-section>
          <q-item-section side>
            <div class="flex items-center">
                  <q-btn-group push>
                      <q-btn class="bg-primary text-white" rounded flat icon="delete" />
                      <q-btn class="bg-primary text-white" @click="edit(2)" rounded flat icon="edit" />
                  </q-btn-group>
            </div>
          </q-item-section>
        </q-item>
      </q-list>

      <q-list bordered class="q-mt-md" style="border-radius: 40px">
        <q-item rounded @click="shape = !shape" style="border-radius: 40px">
          <q-item-section>Icon as side</q-item-section>
          <q-item-section side>
            <div class="flex items-center">
                  <q-btn-group push>
                      <q-btn class="bg-primary text-white" rounded flat icon="delete" />
                      <q-btn class="bg-primary text-white" rounded flat icon="edit" />
                  </q-btn-group>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
      
      
      </div>

     </div>

     <q-dialog v-model="newDataDialog" persistent>
       <q-card>
         <q-card-section>
          Create New
          <q-input v-model="newData.name"  type="text" label="Name" />
          <br>
          <div class="q-mb-md">Date : </div>
          <q-date
            v-model="newData.date"
            minimal
          />
         </q-card-section>
         <q-card-actions align="right">
           <q-btn flat label="Cancel" color="primary" v-close-popup />
           <q-btn flat label="Submit" color="primary" @click="submit" />
         </q-card-actions>
       </q-card>
     </q-dialog>

     <q-dialog v-model="editDialog" persistent>
       <q-card>
         <q-card-section>
          Edit Task
          <q-input v-model="dataDialog.name"  type="text" label="Name" />
          <q-input v-model="dataDialog.date"  type="date" label="Date" />
         </q-card-section>
         <q-card-actions align="right">
           <q-btn flat label="Cancel" color="primary" v-close-popup />
           <q-btn flat label="Update" color="primary" v-close-popup />
         </q-card-actions>
       </q-card>
     </q-dialog>
     
   </div>
</template>

<script>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
export default {
    setup() {
      let newDataDialog = ref(false)
      let submit = () => {
        api.post('/api/tasks', {
          'date': newData.value.date,
          'name': newData.value.name
        }).then((response) => {
          newDataDialog.value = !newDataDialog
          console.log(response);
          newData.value = []
        })
      }
      let dataDialog = ref({})
      let newData = ref([])
      let data = ref([
        {
          id: 1,
          name: 'task',
          date: '2022-06-16'
        },
        {
          id: 2,
          name: 'task1',
          date: '2022-06-16'
        },
        {
          id: 3,
          name: 'task2',
          date: '2022-06-16'
        },
        {
          id: 4,
          name: 'task2',
          date: '2022-06-16'
        }
      ])
      let editDialog = ref(false)
      let $q = useQuasar()
      let edit = (id) => {
        dataDialog.value = data.value[id]
        editDialog.value = true
      }
      console.log(data.value);
      let saerch = ref('')
      let slide = ref(1)
      let shape = ref(true)
      return {
         submit, slide, saerch, data, shape, edit, editDialog,dataDialog,newData,newDataDialog
      }
    },
}
</script>