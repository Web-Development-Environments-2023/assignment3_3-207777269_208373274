<template>
  <div>
    <b-card
      no-body
      tag="article"
      :style="{ height: height, width: width }"
      class="mb-2"
    >
       <router-link :to="{ name: route_name, params: { recipeId: recipe.recipe_id } }"
               >
        <b-card-img :src="recipe.image" class="card-img-top"/> 
      </router-link>
      <b-card-title class="recipe-title">
        {{ recipe.title }}
      </b-card-title>
      <b-card-text>
        <b-row>

        </b-row>
      </b-card-text>
      
      <b-container class="bv-example-row">
        <b-row>
          <b-col class="info-center">
              <b-icon icon="clock-history" aria-hidden="true"></b-icon>
              <p>
                {{ recipe.ready_in_minutes }} mins
              </p>
            </b-col>
            <b-col v-if="recipe.aggregate_likes !== undefined" class="info-center">
              <b-icon icon="hand-thumbs-up" aria-hidden="true"></b-icon>
              <p> {{ recipe.aggregate_likes }} likes</p>
            </b-col>
          <b-col v-if="$root.store.username && (recipe.is_favorite == true || recipe.is_favorite == false)" class="info-center">
            <b-button :disabled="recipe.is_favorite==true" @click="addToFavorites()" class="transparent-button" variant="outline-dark"
            >
              <b-icon v-if="!recipe.is_favorite" icon="heart" aria-hidden="true"
              v-b-tooltip.hover="{ variant: 'secondary' }" title="Add to favorites"></b-icon>
              <b-icon v-else icon="heart-fill" aria-hidden="true"></b-icon>
            </b-button>
          </b-col>
          <b-col v-if="recipe.is_seen" class="info-center">
            <b-icon  icon="eye-fill" aria-hidden="true"
            v-b-tooltip.hover="{ variant: 'secondary' }" title="Seen"></b-icon>
          </b-col>
          <b-col v-if="recipe.vegan" class="info-center">
            <img :src="require('@/assets/icons/vegan-icon.svg')" 
                  role="img" alt="icon" class="icon"
                  v-b-tooltip.hover="{ variant: 'secondary' }" title="Vegan">
          </b-col>
          <b-col v-if="recipe.vegetarian && !recipe.vegan" class="info-center">
            <img :src="require('@/assets/icons/vegetarian-icon.svg')" 
                  role="img" alt="icon" class="icon"
                  v-b-tooltip.hover="{ variant: 'secondary' }" title="Vegetarian">
          </b-col>
          <b-col v-if="recipe.gluten_free" class="info-center">
            <img :src="require('@/assets/icons/gluten.png')"
                  role="img" alt="icon" class="icon"
                  v-b-tooltip.hover="{ variant: 'secondary' }" title="Gluten Free">
          </b-col>
        </b-row>

      </b-container>



      <!-- <b-card-text class="recipe-summary">
        {{ recipe.summary }}
      </b-card-text> -->
      <!-- <RecipeInfoComponent :recipe="recipe"></RecipeInfoComponent> -->

    </b-card>
</div>
</template>

<script>
import RecipeInfoComponent from './RecipeInfoComponent.vue';
export default {
  components:{
  },
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
    this.recipe_ = this.recipe;
  },
  data() {
    return {
      image_load: false,
      recipe_: {}
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    route_name:{
      type: String
    },
    width: {
      type: String,
      default: "400px"
    },
    height: {
      type: String,
      default: "380px"
    }
  },
  methods: {
    async addToFavorites() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(
          this.$root.store.server_domain +"/users/favorites",
          { 
            recipe_id: this.recipe_.recipe_id
          }
          
        );
      } catch (err) {
        console.log(err);
      }
      this.axios.defaults.withCredentials = false;
      this.recipe.is_favorite = true;
    },

    navigateToRecipe(){
      this.$router.push({ name: 'recipe', params: { recipeId: this.recipe.id } });
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}

.icon {
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
.clickable-card {
  cursor: pointer;
}
.recipe-summary{
  max-height: 200px;
  overflow-y: auto;
}

.recipe-title{
  font-family: "Frank Ruhl Libre",Georgia,serif;
  padding: 5px;
  height: 150px;
  overflow-y: auto;
}

.card{
  /* height: 400px;
  width: 400px; */
  border-radius: 5;
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.1);
}

.card-img-top{
  height: 200px;
  object-fit: cover;
  border-radius: 0;
}

.info-center{
  text-align: center;
}
</style>
