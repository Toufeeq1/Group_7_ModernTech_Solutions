<script>
import NavBar from '@/components/NavBar.vue'
import EmployeeData from './components/EmployeeData.vue';
export default {
  name: 'App',
  components: {
    NavBar,
  },
};

</script>

<template>
  <v-app>
    <NavBar>
      <router-view />
    </NavBar>
  </v-app>
</template>


