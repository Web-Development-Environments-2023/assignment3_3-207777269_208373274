<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
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
      }
    ]
    };
  },
  mounted() {
    // this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random",
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        console.log(response);
        const recipes = response.data.recipes;
        this.recipes = [];
        this.recipes.push(...recipes);
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
