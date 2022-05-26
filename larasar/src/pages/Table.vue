<template>
  <div class="q-pa-md">
    <div class="q-my-lg">Room Table</div>
       <q-card class="my-card">
           <q-card-section>
               Dark Mode 
               <q-toggle
                color="warning"
                dark
                v-model="darkMode"
                />
           </q-card-section>
       </q-card>
       <q-card class="my-card q-my-md">
           <q-card-section>
               <q-form
                    @submit="onSubmit"
                    @reset="onReset"
                    class="q-gutter-md"
                >
                    <!-- input -->
                    <div class="form-label">
                        <q-input color="warning" v-model="room.name"  type="text" label="Room Name" />
                        <div class="text-negative q-my-sm" v-if="errors.name">{{errors.name[0]}}</div>
                    </div>
                    
                    <!-- button submit -->
                    <div>
                        <q-btn class="q-ma-sm" label="Submit" type="submit" color="warning"/>
                        <q-btn class="q-ma-sm" label="Reset" type="reset" color="warning" flat />
                    </div>
                </q-form>
           </q-card-section>
       </q-card>
       <q-table
          title="Simple"
          :rows="rooms"
          :columns="columns"
          row-key="name"
          dense
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn dense round flat color="warning" @click="editRow(props)" icon="edit"></q-btn>
              <q-btn dense round flat color="negative" @click="deleteRow(props)" icon="delete"></q-btn>
            </q-td>          
          </template>
        </q-table>
  </div>
</template>

<script>
import { useQuasar } from 'quasar';
import { api } from 'boot/axios';
import { ref,onMounted,computed,onUpdated, reactive, watch } from 'vue';
import { useStore } from 'vuex'

export default {
  setup () {
    api.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    const $store = useStore();
    const stateDarkMode = computed(()=>{
      return $store.state.user.dark;
    })
    let darkMode = ref()
    darkMode.value = stateDarkMode.value
    const $q = useQuasar()
    watch(  () => {
       if (darkMode.value == true) {
            $q.dark.set(true) 
            $store.commit('user/darkMode', true)
       }else{
           $q.dark.set(false) 
           $store.commit('user/darkMode', false)
       }
     })
    const rooms = ref([])
    api.get('/api/room').then((response) => {
        rooms.value = response.data.data
        console.log(response.data.data);
    })
    const columns = [
    {
        name: 'name',
        required: true,
        label: 'Room',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
    },
    { name: 'id',  label: 'ID', field: 'id', sortable: true, },
    { name: 'user_id', align: 'center',  label: 'User ID', field: 'user_id', sortable: true, },
    { name: 'token',  align: 'center', label: 'Token', field: 'token', sortable: true , },
    { name: 'actions', label: 'Actions', field: '', align:'center' },
    ]

    function update(room,i) {
      $q.dialog({
        color: 'warning',
        title: 'Update room name',
        prompt: {
          model: room.name,
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
       console.log(data);
       api.put(`/api/room/${room.id}/update`,{
           name: data
       }).then((response)=>{
           rooms.value[i] = response.data.data
       })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    }
    
    function editRow(params) {
        const i = rooms.value.indexOf(params.row)
        const data = params.row
        update(data, i)
    }
    

    function deleteRow(params) {
        const i = rooms.value.indexOf(params.row)
        rooms.value.splice(i,1);
        api.delete(`/api/room/${params.row.id}`).then((response)=>{
            console.log(response);
            $q.notify({
                message: 'Room has been deleted',
                icon: 'bolt',
                color: 'warning'
            })
        })
        console.log(params.row);
    }
    const room = ref([])
    const errors = ref([])
    function onSubmit() {
        api.post('/api/room',{
            name: room.value.name,
        }).then((response) => {
            rooms.value.push(response.data.data);
            room.value = []
            $q.notify({
                message: 'Room created',
                icon: 'bolt',
                color: 'warning'
            })
        }).catch((error) => {
            errors.value = error.response.data.errors
        })
    }
    function onReset() {
        room.value = []
        errors.value = []
    }
    return {
      darkMode,
      onReset,
      room,
      errors,
      onSubmit,
      columns,
      rooms,
      editRow,
      deleteRow
    }
  }
}
</script>