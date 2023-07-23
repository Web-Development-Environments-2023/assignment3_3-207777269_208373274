<template>
    <div>
        <b-container class="bv-example-row">
            <b-row align-v="center">
                <b-col>    
                    <RecipePreviewList :recipes="recipes" title="Family Recipes" class="RandomRecipes center" route_name="family_recipe_view" />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import RecipePreviewList from "../components/RecipePreviewList";
    export default{
        name: "MyRecipes",
        components: {
            RecipePreviewList,
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
                    this.$root.store.server_domain + "/users/family_recipes",
                    { withCredentials: true }

                    );

                    const recipes = response.data;
                    this.recipes = [];
                    this.recipes.push(...recipes);
                } catch (error) {
                    console.log(error);
                }
                this.axios.defaults.withCredentials = false;
            }
        }
    };
</script>

<style>
.add-new-recipe-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.icon-plus {
  font-size: 1.2rem;
  font-weight: bold;
}

</style>