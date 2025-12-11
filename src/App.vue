<script>
import NavBar from './components/NavBar.vue';
import LoginPage from './components/LoginPage.vue';
export default {
  name: 'App',
  components: {
    NavBar,
    LoginPage,
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  provide() {
    return {
      setLoggedIn: (value) => {
        this.isLoggedIn = value;
      },
    };
  },
};

</script>

<template>
  <div v-if="isLoggedIn">
    <NavBar />
    <router-view />
  </div>
  <LoginPage v-else />
  <v-app>
    <NavBar>
      <router-view />
    </NavBar>
  </v-app>
</template>


