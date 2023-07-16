<template>
  <div class="flex-center">
    <h3 class="header">
      {{ title }}:
      <slot></slot>
    </h3>
    <b-card-group class="flex-center">
      <div v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :width="width" :height="height" :recipe="r" :route_name="route_name"/>
      </div>
    </b-card-group>
 

    </div>
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
    },
    recipes: {
      type: Array,
      required: true
    },
    route_name: {
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
  mounted() {
    // this.updateRecipes();
  },

};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
.recipePreview{
  padding: 0px 10px 10px 0px;
}
.card-group{
  flex-flow: column wrap;
}
</style>
