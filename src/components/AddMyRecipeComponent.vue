<template>
    <div class="add-recipe">
      <form @submit.prevent="addRecipe" v-if="recipe.submitSuccess != true">
        <!-- Recipe Title Input -->
        <h6>Recipe Title</h6>
        <b-form-group label-for="recipe-title">
          <b-form-input id="recipe-title" v-model="recipe.title" required></b-form-input>
        </b-form-group>
  
        <!-- Radio for Gluten, Vegetarian, and Vegan -->
        <h6>Dietary Options</h6>
        <b-form-group>
          <b-form-checkbox v-model="recipe.gluten_free" value="1" unchecked-value="0">Gluten</b-form-checkbox>
          <b-form-select v-model="veganOrVegeterian" :options="options" :select-size="2"></b-form-select>
          <!-- <b-form-checkbox v-model="recipe.vegetarian" value="1" unchecked-value="0">Vegeterian</b-form-checkbox>
          <b-form-checkbox v-model="recipe.vegan" value="1" unchecked-value="0">Vegan</b-form-checkbox> -->
        </b-form-group>
  
        <!-- Image Input -->
        <h6>Image URL</h6>
        <b-form-group>
          <b-form-input id="recipe-image" v-model="recipe.image" placeholder="Enter image URL" required></b-form-input>
        </b-form-group>
  
        <!-- Ingredients Inputs -->
        <h6>Ingredients</h6>
        <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="input-container">
            <div class="input-wrapper">
            <b-form-input v-model="ingredient.ingredient_name" placeholder="Ingredient Name" required></b-form-input>
            <b-form-input v-model="ingredient.quantity" placeholder="Quantity" required></b-form-input>
            <b-button v-if="recipe.ingredients.length > 1" variant="danger" @click="removeIngredient(index)" class="icon-button">
                <b-icon icon="trash-fill"></b-icon>
            </b-button>
            </div>
        </div>
        <b-button @click="addIngredient" variant="success" class="icon-button">
            <b-icon icon="plus"></b-icon>
        </b-button>

        <!-- Instructions Inputs -->
        <h6>Instructions</h6>
        <div v-for="(instruction, index) in recipe.instructions" :key="index" class="input-container">
            <div class="input-wrapper">
                <span class="instruction-number">{{ index + 1 }}.</span>
                <b-form-input v-model="instruction.instruction_string" required></b-form-input>
                <b-button v-if="recipe.instructions.length > 1" variant="danger" @click="removeInstruction(index)" class="icon-button">
                    <b-icon icon="trash-fill"></b-icon>
                </b-button>
            </div>
        </div>
        <b-button @click="addInstruction" variant="success" class="icon-button">
            <b-icon icon="plus"></b-icon>
        </b-button>
    
        <!-- Number of Portions Input -->
        <h6>Number of Portions</h6>
        <b-form-group>
          <b-form-input type="number" v-model="recipe.portions" required></b-form-input>
        </b-form-group>
  
        <!-- Preparation Time Input -->
        <h6>Preparation Time (minutes)</h6>
        <b-form-group>
          <b-form-input type="number" v-model="recipe.ready_in_minutes" required></b-form-input>
        </b-form-group>
  
        <!-- Submit Button -->
        <div class="d-flex justify-content-end"> <!-- Use flexbox to align the content to the right -->
            <b-button type="submit" variant="primary">
              <b-icon icon="check"></b-icon> Submit
            </b-button>
        </div>
      </form>
      <div v-else>
        Recipe added successfuly!
      </div>
      <!-- <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
        >
      Login failed: {{ form.submitError }}
    </b-alert> -->
    </div>
  </template>
  
  <script>
  import { BIcon, BFormInput, BFormGroup, BButton } from 'bootstrap-vue';
  
  export default {
    components: {
      BIcon,
      BFormInput,
      BFormGroup,
      BButton,
    },
    data() {
      return {
        recipe: {
          title: '',
          image: '',
          ready_in_minutes: 0,
          veganOrVegeterian: '',
          gluten_free: '0',
          ingredients: [{ ingredient_name: '', quantity: '' }],
          instructions: [{ instruction_number: 1, instruction_string: '' }],
          portions: 1,
          submitError: undefined,
          submitSuccess: undefined
        },
        hideModalFooter: true,
        options: ["Vegeterian", "Vegan", "None"]
      };
    },
    methods: {
      addIngredient() {
        this.recipe.ingredients.push({ ingredient_name: '', quantity: '' });
      },
      removeIngredient(index) {
        this.recipe.ingredients.splice(index, 1);
      },
      addInstruction() {
      this.recipe.instructions.push({ instruction_number: this.recipe.instructions.length + 1, instruction_string: '' }); // Add a new empty instruction input object
    },
    removeInstruction(index) {
      this.recipe.instructions.splice(index, 1); // Remove the instruction input object at the specified index

      // Update the number for each remaining instruction
      this.recipe.instructions = this.recipe.instructions.map((instruction, index) => ({ instruction_number: index + 1, instruction_string: instruction.instruction_string }));
    },
    async addRecipe() {
      try {
        const vegan = 0;
        const vegetarian = 0;
        if (this.recipe.veganOrVegeterian == "Vegan"){
          vegan = 1;
        }
        else if (this.recipe.veganOrVegeterian == "Vegeterian"){
          vegetarian = 1;
        }

        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Register",
          this.$root.store.server_domain + "/users/user_recipes",

          {
            title: this.recipe.title,
            image: this.recipe.image,
            ready_in_minutes: this.recipe.ready_in_minutes,
            vegetarian: vegetarian,
            vegan: vegan,
            gluten_free: this.recipe.gluten_free,
            ingredients: this.recipe.ingredients,
            instructions: this.recipe.instructions,
            portions: this.recipe.portions
          }
        );
        this.recipe.submitSuccess = true;
        this.$emit("recipeAdded")
      } catch (err) {
        console.log(err.response);
        this.recipe.submitError = err.response.data.message;
      }
    },

    },
  };
  </script>
  
  <style>
  .form-group {
    margin-bottom: 1rem;
  }

  .input-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .input-wrapper {
    display: flex;
    flex-grow: 1;
    align-items: center;
  }

  .input-container .instruction-number {
    margin-right: 10px;
  }

  .input-container b-form-input {
    flex-grow: 1;
  }

  .input-container .icon-button {
    margin-left: 10px;
    flex-grow: 0;
  }

  .input-container .trash-button {
    margin-left: 10px;
    flex-grow: 0;
  }

  .icon-button {
    margin-left: 5px;
  }

  .form-input {
    width: 100%;
  }

  .ingredients-title,
  .instructions-title {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  .d-flex {
    display: flex;
}

.justify-content-end {
    justify-content: flex-end; /* Align the content to the right */
}

.add-recipe{
    padding: 20px;
}
</style>
