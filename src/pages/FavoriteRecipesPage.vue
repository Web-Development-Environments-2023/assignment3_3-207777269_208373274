<template>
    <div>
        <b-container class="bv-example-row">
            <b-row align-v="center">
                <b-col>    
                    <RecipePreviewList :recipes="recipes" route_name="recipe" title="Favorite Recipes" class="RandomRecipes center" />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import RecipePreviewList from "../components/RecipePreviewList";
    export default{
        name: "FavoriteRecipes",
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
                    this.$root.store.server_domain + "/users/favorites",
                    { withCredentials: true }

                    );
                    console.log(response);
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

</style>