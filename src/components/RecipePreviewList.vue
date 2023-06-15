<template>
  <div>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-card-group columns>
      <div v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
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
</style>
