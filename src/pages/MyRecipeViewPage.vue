<template>
    <div>
      <h1 class="recipe-title">{{ recipe.title }}</h1>
      <img :src="recipe.image" class="homepage-image"/>
        <b-container v-if="recipe" class="recipe-body content-overlay">
          <b-row>
            <RecipeInfoComponent :recipe="recipe"></RecipeInfoComponent>
          </b-row>
          <b-row>
            <b-col>
              <h4 class="header" v-if="recipe.portions">Ingredients ({{ recipe.portions }} portions):</h4>
              <h4 v-else class="header">Ingredients:</h4>
                  <b-list-group>
                    <b-list-group-item v-for="(r, index) in recipe.ingredients"
                      :key="index + '_' + r.recipe_id">
                      {{ r.ingredient_name }} - {{ r.quantity }}
                    </b-list-group-item>
                  </b-list-group>
            </b-col>
            <b-col>
              <h4 class="header">Instructions:</h4>
              <b-list-group>
                    <b-list-group-item v-for="(i, index) in recipe.instructions"
                      :key="index">
                      {{ i.instruction_number }}. {{ i.instruction_string }}
                    </b-list-group-item>
                  </b-list-group>
            </b-col>
          </b-row>
        </b-container>
    </div>
  </template>
  
  <script>
    import RecipeInfoComponent from '../components/RecipeInfoComponent.vue';
  export default {
    components:{
      RecipeInfoComponent
    },
    data() {
      return {
        recipe: null
      };
    },
    computed: {
      renderedRecipeSummary() {
        return this.recipe.summary;
      }
    },
    async created() {
      try {
        let response;
        // response = this.$route.params.response;
  
        try {
          this.axios.defaults.withCredentials = true;
          response = await this.axios.get(
            this.$root.store.server_domain + "/users/user_recipes/" + this.$route.params.recipeId,
            {
              withCredentials: true
            }
          );
  
          if (response.status !== 200) this.$router.replace("/NotFound");
        } catch (error) {
          console.log("error.response.status", error.response.status);
          this.$router.replace("/NotFound");
          return;
        }
        this.axios.defaults.withCredentials = false;
        let {
          instructions,
          ingredients,
          aggregate_likes,
          ready_in_minutes,
          image,
          title,
          vegan,
          vegetarian,
          gluten_free,
          portions,
          is_seen,
          is_favorite
        } = response.data;

        let _recipe = {
          instructions,
          ingredients,
          aggregate_likes,
          ready_in_minutes,
          image,
          title,
          vegan,
          vegetarian,
          gluten_free,
          portions,
          is_seen,
          is_favorite
        };
  
        this.recipe = _recipe;
      } catch (error) {
        console.log(error);
      }
    },
  };
  </script>
  
  <style scoped>
  .wrapper {
    display: flex;
  }
  .wrapped {
    width: 50%;
  }
  .center { 
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }.icon {
    width: 30px; /* Adjust the width as needed */
    height: 30px; /* Adjust the height as needed */
  }
  .transparent-button {
    background-color: transparent;
    border-color: transparent;
    padding: 0;
    color: black;
  }
  
  .transparent-button:hover {
    background-color: transparent;
    border-color: transparent;
    padding: 0;
    color: black;
  }
  
  .transparent-button:disabled {
    background-color: transparent;
    border-color: transparent;
    padding: 0;
    color: black;
  }
  .recipe-page-header{
    max-height: 310px;
    width: 100%;
  }
  
  .recipe-page-header>img {
    max-height: 300px;
    object-fit: cover;
    object-position: center;
  }
  .recipe-info{
    color:black;
  }
  
  .recipe-title{
    font-family: "Frank Ruhl Libre",Georgia,serif;
    text-align: center;
  }
  
  .header{
    font-family: "Frank Ruhl Libre",Georgia,serif;
  }
  
  .recipe-body{
    padding-top: 20px;
  }
  .homepage-image{
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    object-fit: cover;
    width: 90%;
    height: 500px;
    margin-right: 5%;
    margin-left: 5%;
  }
  
  .content-overlay{
    background: white;
    border-radius: 5px;
    box-shadow: 0 4px 10px 4px rgba(213,213,232,.25);
    position: relative;
    margin-top: -160px;
  }
  </style>
  