<template>
  <div class="container">
    <b-container class="bv-example-row">
    <b-row align-v="center">
      <b-col>    
        <RecipePreviewList title="Randome Recipes" class="RandomRecipes center" />
      </b-col>
      <b-col v-if="$root.store.username">
        <RecipePreviewList
          title="Last Viewed Recipes"
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


    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginComponent from "../components/LoginComponent.vue"
export default {
  components: {
    RecipePreviewList,
    LoginComponent
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
