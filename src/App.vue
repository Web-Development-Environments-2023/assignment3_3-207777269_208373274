<template>
  <div id="app">
      <div>
          <b-modal id="my-modal" size="xl" title="New recipe is cooking..." :hide-footer="true">
              <AddMyRecipeComponent @recipeAdded="recipeAdded()"></AddMyRecipeComponent>
          </b-modal>          
          <b-navbar toggleable="lg" type="dark" variant="dark" class="nabvar">
            <b-navbar-brand>
              <img src="./assets/icons/pngwing.com.png" width="40px" height="40px">
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav>
                <router-link :to="{ name: 'main' }" class="nav-link">Home</router-link>
                <router-link :to="{ name: 'search' }" class="nav-link">Search</router-link>
                <router-link :to="{ name: 'about' }" class="nav-link">About</router-link>
                <router-link v-if="$root.store.username" :to="{}" v-b-modal.my-modal class="nav-link">Create Recipe</router-link>
              </b-navbar-nav>

              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
                  
                  <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template #button-content>
                      Hello Guest
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
                    <b-dropdown-item :to="{ name: 'family_recipes' }">Family Recipes</b-dropdown-item>
                    <b-dropdown-item @click="Logout()">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
                
      
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
      </div>
    <router-view class="page"/>
  </div>
</template>

<script>
import AddMyRecipeComponent from './components/AddMyRecipeComponent.vue';
export default {
  name: "App",
  components:{
    AddMyRecipeComponent
  },
  methods: {
    data(){
      return{
        routerKey: 0
      };
    },
    // Logout() {
    //   this.$root.store.logout();
    //   this.$root.toast("Logout", "User logged out successfully", "success");

    //   this.$router.push("/").catch(() => {
    //     this.$forceUpdate();
    //   });
    // }
    async Logout() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(
          this.$root.store.server_domain +"/logout", 
          {
            withCredentials: true
          }
        );
        this.$root.store.logout();
        this.$root.toast("Logout", "User logged out successfully", "success");
        this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
        // this.$forceUpdate();
      } catch (err) {

      }
      this.axios.defaults.withCredentials = false;  

    },
    navigateToAddRecipe() {
      // Find the AddMyRecipeComponent using the ref
      const addRecipeComponent = this.$refs.addRecipeModal;
      if (addRecipeComponent) {
        // Set showModal data property to true to show the modal
        addRecipeComponent.showModal = true;
      }
    }
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
  background-color: aliceblue;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  // font-family: Roboto,Helvetica,sans-serif;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.header{
  font-family: "Frank Ruhl Libre",Georgia,serif;
}

.navbar{
  box-shadow: 0 0.25rem 0.25rem rgba(0,0,0,.25), inset 0 -1px 5px rgba(0,0,0,.25);

}
.flex-center{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
/* custom scrollbar */
::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
.page{
  padding-top: 20px;
}
</style>
