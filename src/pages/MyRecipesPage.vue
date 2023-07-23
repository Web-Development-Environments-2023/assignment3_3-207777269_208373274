<template>
    <div>
        <b-container class="bv-example-row">
            <b-row align-v="center">
                <b-col>    
                    <RecipePreviewList :recipes="recipes" title="My Recipes" class="RandomRecipes center" route_name="user_recipe_view" />
                </b-col>
            </b-row>
        </b-container>
        <b-button
        class="add-new-recipe-button"
        variant="primary"
        size="md"
        rounded
        pill
        v-b-tooltip.hover
        title="Add a new recipe"
        v-b-modal.my-modal
        >
            <b-icon icon="plus" class="icon-plus"></b-icon>
        </b-button>
        <b-modal id="my-modal" size="xl" title="New recipe is cooking..." :hide-footer="true">
            <AddMyRecipeComponent @recipeAdded="recipeAdded()"></AddMyRecipeComponent>
        </b-modal>

        </div>
</template>

<script>
    import RecipePreviewList from "../components/RecipePreviewList";
    import AddMyRecipeComponent from "../components/AddMyRecipeComponent.vue";
    export default{
        name: "MyRecipes",
        components: {
            RecipePreviewList,
            AddMyRecipeComponent
        },
        data() {
            return {
                recipes: []
            }
        },
        mounted() {
            this.updateRecipes();
        },
        methods: {
            async updateRecipes() {
                try {
                    this.axios.defaults.withCredentials = true;
                    const response = await this.axios.get(
                    this.$root.store.server_domain + "/users/user_recipes",
                    { withCredentials: true }

                    );

                    const recipes = response.data;
                    this.recipes = [];
                    this.recipes.push(...recipes);
                } catch (error) {
                    console.log(error);
                }
                this.axios.defaults.withCredentials = false;
            },
            recipeAdded(){
                this.updateRecipes();
            }
        }
    };
</script>

<style>
.add-new-recipe-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.5); /* Add the box-shadow property */
}
.icon-plus {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>