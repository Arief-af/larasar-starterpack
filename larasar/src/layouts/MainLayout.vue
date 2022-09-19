<template>    
   <q-layout class="position-relative">
       <div class="navbar" style="position: sticky; top: 0px">
          <q-header class="bg-white text-primary relative-position" style="min-height: 44px;">
              <div class="float-right  q-pa-sm q-mr-sm">
                  
                <q-btn flat round>
                    <i class='bx bx-bell' style="font-size: 24px"></i>
                    <q-menu anchor="bottom right" self="top end">
                            <q-list style="min-width: 20px">
                              <q-item clickable v-close-popup>
                                <q-item-section>
                                  <q-item-label>Photos</q-item-label>
                                </q-item-section>
                              </q-item>

                              <q-item clickable v-close-popup>
                                <q-item-section>
                                  <q-item-label>Videos</q-item-label>
                                </q-item-section>
                              </q-item>

                              <q-item clickable v-close-popup>
                                <q-item-section>
                                  <q-item-label>Articles</q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-list>
                    </q-menu>
                </q-btn>

                <q-btn flat round>
                    <i class='bx bx-user' style="font-size: 24px"></i>
                    <q-menu anchor="bottom right" self="top end">
                        <div class="row no-wrap q-pa-md">
                        <div class="column">
                            <div class="text-h6 q-mb-md">Settings</div>
                            <q-toggle v-model="notification" label="notification" />
                        </div>

                        <q-separator vertical inset class="q-mx-lg" />

                        <div class="column items-center">
                            <q-avatar size="72px">
                            <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                            </q-avatar>

                            <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

                            <q-btn
                              color="primary"
                              label="Logout"
                              push
                              size="sm"
                              v-close-popup
                              @click="logout"
                            />
                        </div>
                        </div>
                    </q-menu>
                </q-btn>
                    
              </div>
            </q-header>
       </div>
      <div style="width: 100%; height: 58px;"></div>
      <div class="q-pa-md">
            <div class="flex flex-center">
          
            <div class="content">
                <div class="on-left f-title q-mb-md text-primary"> HELLO USER!</div>
                <div class="line q-mb-lg "></div>
                <br>
                <router-view />
            </div>
        </div>
      </div>
       <div style="position: sticky; bottom: 0px; left: 0px; width: 100%;">
           <img class="no-border no-shadow" src="~assets/svg/wave.svg" style="shape-renderer: crispEdges !important; width: 100%; height: 100%; z-index: -1 !important;">
           <div class="bg-primary no-border no-shadow" style="border: none !important; margin-top: -6px; height: 100% !important; min-height: 70px">
                <div class="text-center">
                    <div class="footer-tools">
                        <div class="row justify-center">
                            <div class="col-auto">
                                <q-btn @click="goto('library')" class="bg-white q-sm-sm-sm text-primary" round flat>
                                    <i class='bx bx-library' style="font-size: 24px"></i>
                                </q-btn>
                            </div>
                            <div class="col-auto">
                                <q-btn @click="goto('home')" class="bg-white q-sm-sm-sm text-primary" round flat>
                                    <i class='bx bx-home' style="font-size: 24px"></i>
                                </q-btn>
                            </div>
                            <div class="col-auto">
                                <q-btn @click="goto('calendar')" class="bg-white q-sm-sm-sm text-primary" round flat>
                                    <q-icon name="card_giftcard" style="font-size: 24px"/>
                                </q-btn>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
       </div>
    </q-layout>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { api } from  'boot/axios'
import { useStore } from 'vuex';
export default {
  setup() {
    const $store = useStore()
    api.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    const Router = useRouter()
    let goto = (name) => {
        Router.push({
          name: name
        })
    }
    function logout() {
      api.post('/api/logout')   
      .then(()=>{
        api.defaults.headers.common["Authorization"] = null;
        localStorage.removeItem('token')
        $store.commit('auth/setUser', null)
        Router.push({
          name: 'Login'
        })
      })
    }
    let notification = ref(true);
    return {
     notification, goto,logout
    }
  },
}
</script>

<style>
q-item{
  background-color: red !important;
}
</style>