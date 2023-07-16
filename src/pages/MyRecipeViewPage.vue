<template>
    <RecipeViewComponent :recipe="recipe"></RecipeViewComponent>
  </template>
  
  <script>
  import RecipeViewComponent from '../components/RecipeViewComponent.vue';
  export default {
    components:{
      RecipeViewComponent
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
          response = await this.axios.get(
            this.$root.store.server_domain + "/users/user_recipes/" + this.$route.params.recipeId,
            {
              withCredentials: true
            }
          );
  
          console.log(response);
          if (response.status !== 200) this.$router.replace("/NotFound");
        } catch (error) {
          console.log("error.response.status", error.response.status);
          this.$router.replace("/NotFound");
          return;
        }
  
        let {
          instructions,
          extended_ingredients,
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
        console.log(instructions)
        let _instructions = instructions
          .map((fstep) => {
            fstep.steps[0].step = fstep.name + fstep.steps[0].step;
            return fstep.steps;
          })
          .reduce((a, b) => [...a, ...b], []);
  
        let _recipe = {
          instructions,
          _instructions,
          analyzed_instructions,
          extended_ingredients,
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
  