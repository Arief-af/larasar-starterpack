<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-warning" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          color="white"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
         <div class="text-white">Larasar</div> 
        </q-toolbar-title>
        <div v-if="user">
          <q-btn style="color: #26A69A !important;" color="white" icon="logout" label="Logout" @click="logout"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import {useStore} from 'vuex'
import {api} from 'boot/axios'
import {useRouter} from 'vue-router'

import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const token = localStorage.getItem("token");
    // api.defaults.headers.common["Authorization"] = "Bearer " + token;
    const $store = useStore()
    const user = computed(()=>{
      return $store.state.user.user;
    })
    const router = useRouter()
    function logout() {
      api.post('/api/logout')
      .then(()=>{
        api.defaults.headers.common["Authorization"] = null;
        localStorage.removeItem('token')
        $store.commit('user/setUser', null)
        router.push({
          name: 'Login'
        })
      })
    }
    const leftDrawerOpen = ref(false)
    const linksList = [
      {
        title: 'Login',
        caption: 'quasar.dev',
        icon: 'school',
        link: 'Login'
      },
      {
        title: 'Register',
        caption: 'github.com/quasarframework',
        icon: 'code',
        link: 'Register'
      },
    ];

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },logout,token,user
    }
  }
})
</script>
