<template>
  <div class="container">
    <img src="../assets/grandma_image.png" class="homepage-image"/>
    <b-container class="bv-example-row">
      <b-row align-v="baseline" class="content-overlay">
        <b-col class="flex-center">    
          <RecipePreviewList :recipes="randomRecipes" title="Explore this recipes" class="RandomRecipes center" route_name="recipe"/>
          <b-button style="margin-bottom: 5%;" variant="outline-secondary" @click="getRandomRecipes();">Surprise me</b-button>
        </b-col>
        <b-col v-if="$root.store.username" class="flex-center">
          <RecipePreviewList
            title="Last Viewed Recipes"
            :recipes="lastWatchedRecipes"
            :class="{
              RandomRecipes: true,
              center: true
            }"
            disabled
            route_name="recipe"
          ></RecipePreviewList>
        </b-col>
        <b-col v-else>
          <LoginComponent :isMainPage="true" @login="logIn()"></LoginComponent>
        </b-col>
      </b-row>
  </b-container>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginComponent from "../components/LoginComponent.vue"
export default {
  components: {
    RecipePreviewList,
    LoginComponent
  },
  data(){
    return{
      randomRecipes: [],
      lastWatchedRecipes: []
    }
  },
  mounted() {
    this.getRandomRecipes();
    if(this.$root.store.username)
      this.getLastWatchedRecipes();
  },
  methods: {
    async logIn(){
      this.getRandomRecipes();
      this.getLastWatchedRecipes();
      console.log(this.randomRecipes)
    },
    async getRandomRecipes() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random",{
            withCredentials: true,
            params: {
                number: 3
            }
        });

        const recipes = response.data;
        this.randomRecipes = [];
        this.randomRecipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
      this.axios.defaults.withCredentials = false;
    },
    async getLastWatchedRecipes() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/last_watched_recipes",
          {
            withCredentials: true,
            params: {
                number: 3
            }
        });

        const recipes = response.data;
        this.lastWatchedRecipes = [];
        this.lastWatchedRecipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
      this.axios.defaults.withCredentials = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 3%;
}

.homepage-image{
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 110%;
  height: 75%;
}

.content-overlay{
  background: white;
  border-radius: 5px;
  box-shadow: 0 4px 10px 4px rgba(213,213,232,.25);
  position: relative;
  margin-top: -180px;
}
</style>
