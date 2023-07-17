<template>
    <b-list-group horizontal class="recipe-info">
        <b-list-group-item class="short info-center" v-if="recipe.is_favorite == true || recipe.is_favorite == false">
            <b-button :disabled="recipe.is_favorite==true" @click="addToFavorites($event)" class="transparent-button" variant="outline-dark"
            >
                <b-icon v-if="!recipe.is_favorite" icon="heart" aria-hidden="true"
                v-b-tooltip.hover="{ variant: 'secondary' }" title="Add to favorites"></b-icon>
                <b-icon v-else icon="heart-fill" aria-hidden="true"></b-icon>
            </b-button>
        </b-list-group-item>
        <b-list-group-item class="long">
        <b-icon icon="clock-history" aria-hidden="true"></b-icon>
        <p>
            {{ recipe.ready_in_minutes }} minutes
        </p>
        </b-list-group-item>
        <b-list-group-item v-if="recipe.aggregate_likes !== undefined" class="long">
            <b-icon icon="hand-thumbs-up" aria-hidden="true"></b-icon>
            <p> {{ recipe.aggregate_likes }} likes</p>
        </b-list-group-item>
        <b-list-group-item v-if="recipe.vegan" class="short">
        <img :src="require('@/assets/icons/vegan-icon.svg')" 
            role="img" alt="icon" class="icon"
            v-b-tooltip.hover="{ variant: 'secondary' }" title="Vegan">
        </b-list-group-item>
        <b-list-group-item v-else-if="recipe.vegetarian" class="short">
        <img :src="require('@/assets/icons/vegetarian-icon.svg')" 
            role="img" alt="icon" class="icon"
            v-b-tooltip.hover="{ variant: 'secondary' }" title="Vegetarian">
        </b-list-group-item>
        <b-list-group-item v-if="recipe.gluten_free" class="short">
        <img :src="require('@/assets/icons/gluten.png')"
            role="img" alt="icon" class="icon"
            v-b-tooltip.hover="{ variant: 'secondary' }" title="Gluten Free">
        </b-list-group-item>
    </b-list-group>

</template>

<script>
    export default{
        props:{
            recipe:{
                type: Object,
                required: true
            }
        },
        methods: {
            async addToFavorites(event) {
            console.log(this.recipe.id);
            try {
                
                const response = await this.axios.post(
                this.$root.store.server_domain +"/users/favorites",
                { 
                    recipe_id: this.recipe.id
                }
                
                );
            } catch (err) {
                console.log(err);
            }
            this.recipe.is_favorite = true;
            }
        }

    }
</script>

<style>
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

    /* .transparent-button:hover {
        background-color: transparent;
        border-color: transparent;
        padding: 0;
    } */

    .transparent-button:disabled {
        background-color: transparent;
        border-color: transparent;
        padding: 0;
        color: black;
    }

    .long{
        text-align: center;
    }
    .short{
        display: flex;
        align-items: center;
    }
    
</style>