<template>
    <div>
        <b-container class="bv-example-row">
            <b-row align-v="center">
                <b-col>    
                    <RecipePreviewList :recipes="recipes" title="Favorite Recipes" class="RandomRecipes center" />
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
                    const response = await this.axios.get(
                    this.$root.store.server_domain + "/users/favorites",
                    { withCredentials: true }

                    );

                    console.log(response);
                    const recipes = response.data;
                    this.recipes = [];
                    this.recipes.push(...recipes);
                    // console.log(this.recipes);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };
</script>

<style>

</style>