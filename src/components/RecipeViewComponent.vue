<template>
    <div>
      <h1 class="recipe-title">{{ recipe.title }}</h1>
      <img :src="recipe.image" class="homepage-image"/>
      <!-- <b-card overlay
                img-src="https://www.allrecipes.com/thmb/0xH8n2D4cC97t7mcC7eT2SDZ0aE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6776_Pizza-Dough_ddmfs_2x1_1725-fdaa76496da045b3bdaadcec6d4c5398.jpg"
                :img-alt="recipe.title"
                class="recipe-page-header"
                >
              </b-card> -->
        <b-container v-if="recipe" class="recipe-body content-overlay">
          <b-row>
            <RecipeInfoComponent :recipe="recipe"></RecipeInfoComponent>
          </b-row>
          <b-row>
            <b-col>
              <h4 class="header" v-if="recipe.portions">Ingredients ({{ recipe.portions }} portions):</h4>
              <h4 v-else class="header">Ingredients:</h4>
                  <b-list-group>
                    <b-list-group-item v-for="(r, index) in recipe.extended_ingredients"
                      :key="index + '_' + r.recipe_id">
                      {{ r.original }}
                    </b-list-group-item>
                  </b-list-group>
            </b-col>
            <b-col>
              <h4 class="header">Instructions:</h4>
                <b-list-group>
                    <b-list-group-item v-for="(s,index) in recipe._instructions" :key="s.number">
                      <b>{{ index+1 }}.</b> {{ s.step }}
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
    props:{
        recipe: null
    },

    methods: {
      async addToFavorites(event) {
        console.log(this.recipe.recipe_id);
        try {
          
          const response = await this.axios.post(
            this.$root.store.server_domain +"/users/favorites",
            { 
              recipe_id: this.recipe.recipe_id
            }
            
          );
        } catch (err) {
          console.log(err);
        }
        this.recipe.is_favorite = true;
      }
    }
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
  