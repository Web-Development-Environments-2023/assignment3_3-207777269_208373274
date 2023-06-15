<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand>RecipesLogo</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <router-link :to="{ name: 'main' }" class="nav-link">Home</router-link>
            <router-link :to="{ name: 'search' }" class="nav-link">Search</router-link>
            <b-nav-item >About</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
              
              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  Guest
                </template>
                <b-dropdown-item :to="{ name: 'register' }">Register
                </b-dropdown-item>
                <b-dropdown-item :to="{ name: 'login' }">Login
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto" v-else>
              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  Hi, {{ $root.store.username }}!
                </template>
                <b-dropdown-item :to="{ name: 'favorite_recipes' }">Favorites</b-dropdown-item>
                <b-dropdown-item :to="{ name: 'user_recipes' }">My Recipes</b-dropdown-item>
                <b-dropdown-item>Family Recipes</b-dropdown-item>
                <b-dropdown-item @click="Logout()">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
  
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
  </div>

</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
    // async Logout() {
    //   try {
        
    //     const response = await this.axios.post(
    //       this.$root.store.server_domain +"/logout", 
    //       {
    //         withCredentials: true
    //       }
    //     );
    //     this.$root.store.logout();
    //     this.$root.toast("Logout", "User logged out successfully", "success");

    //     this.$router.push("/").catch(() => {
    //       this.$forceUpdate();
    //     });
    //   } catch (err) {

    //   }

    // }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
