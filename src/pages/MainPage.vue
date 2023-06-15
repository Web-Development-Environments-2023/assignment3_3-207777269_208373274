<template>
  <div class="container">
    <b-container class="bv-example-row">
    <b-row align-v="center">
      <b-col>    
        <RecipePreviewList :recipes="randomRecipes" title="Random Recipes" class="RandomRecipes center" />
      </b-col>
      <b-col v-if="$root.store.username">
        <RecipePreviewList
          title="Last Viewed Recipes"
          :recipes="lastWatchedRecipes"
          :class="{
            RandomRecipes: true,
            center: true
          }"
          disabled
        ></RecipePreviewList>
      </b-col>
      <b-col v-else>
        <LoginComponent></LoginComponent>
      </b-col>
    </b-row>
  </b-container>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginComponent from "../components/LoginComponent.vue"
import { executionAsyncResource } from "async_hooks";
export default {
  components: {
    RecipePreviewList,
    LoginComponent
  },
  data(){
    return{
      randomRecipes: [],
      lastWatchedRecipes: [],
      recipes: [
      {
        "recipe_id": 102,
        "title": "Simple Macaroni and Cheese",
        "image": "https://img.taste.com.au/TCLQitqx/w720-h480-cfill-q80/taste/2022/09/all-in-one-tuscan-chicken-pasta-bake-181120-2.jpg",
        "ready_in_minutes": 45,
        "aggregate_likes": 5987,
        "vegetarian": false,
        "vegan": false,
        "gluten_free": false,
        "is_seen": false,
        "is_favorite": true
      },
      {
        "recipe_id": 102,
        "title": "Pizza",
        "image": "https://www.allrecipes.com/thmb/iXKYAl17eIEnvhLtb4WxM7wKqTc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/240376-homemade-pepperoni-pizza-Beauty-3x4-1-6ae54059c23348b3b9a703b6a3067a44.jpg",
        "ready_in_minutes": 45,
        "aggregate_likes": 5987,
        "vegetarian": false,
        "vegan": false,
        "gluten_free": false,
        "is_seen": false,
        "is_favorite": true
      },
      {
        "recipe_id": 102,
        "title": "Pizza",
        "image": "https://www.allrecipes.com/thmb/iXKYAl17eIEnvhLtb4WxM7wKqTc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/240376-homemade-pepperoni-pizza-Beauty-3x4-1-6ae54059c23348b3b9a703b6a3067a44.jpg",
        "ready_in_minutes": 45,
        "aggregate_likes": 5987,
        "vegetarian": false,
        "vegan": false,
        "gluten_free": false,
        "is_seen": false,
        "is_favorite": false
      }
    ]
    }
  },
  mounted() {
    this.randomRecipes = this.recipes;
    this.lastWatchedRecipes = this.recipes;

    // this.getRandomRecipes();
    // this.getLastWatchedRecipes();
  },
  methods: {
    async getRandomRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random",{
            withCredentials: true,
            params: {
                number: 3
            }
        });

        console.log(response);
        const recipes = response.data;
        this.randomRecipes = [];
        this.randomRecipes.push(...recipes);
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async getLastWatchedRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/last_watched_recipes",
          {
            withCredentials: true,
            params: {
                number: 3
            }
        });

        console.log(response);
        const recipes = response.data;
        this.lastWatchedRecipes = [];
        this.lastWatchedRecipes.push(...recipes);
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
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
</style>
