<template>
  <div class="main-container">
    <div class="container search-container">
      <h1 class="title">Search</h1>

      <b-form @submit.prevent="submit" @reset.prevent="reset">
        <b-form-group id="input-group-text_to_search">
          <b-form-input id="text_to_search" v-model="searchForm.text_to_search" placeholder="Recipe/Food..." type="text"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-cuisines" label-cols-sm="3" label="Cuisines:" label-for="cuisine">
          <b-form-select id="cuisine" v-model="searchForm.selected_cuisines" :options="cuisines" multiple :select-size="4"></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-diets" label-cols-sm="3" label="Diets:" label-for="diet">
          <b-form-select id="diet" v-model="searchForm.selected_diets" :options="diets" multiple :select-size="4"></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-intolerances" label-cols-sm="3" label="Intolerances:" label-for="intolerance">
          <b-form-select id="intolerance" v-model="searchForm.selected_intolerances" :options="intolerances" multiple :select-size="4"></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-num_of_results" label-for="num_of_results">
          <b-form-row>
            <b-col>
              <label for="num_of_results">Maximum number of results: {{ searchForm.num_of_results }}</label>
            </b-col>
            <b-col>
              <b-form-input id="num_of_results" v-model="searchForm.num_of_results" type="range" min="1" max="15" step="5"></b-form-input>
            </b-col>
          </b-form-row>
        </b-form-group>

        <b-button type="reset" variant="danger">Reset</b-button>
        <b-button type="submit" variant="primary" style="width:250px;" class="ml-5 w-75" :disabled="!searchable">Search</b-button>
      </b-form>

      <b-alert class="mt-2" v-if="search_error" variant="warning" dismissible show>
        Search failed: {{ search_error }}
      </b-alert>
    </div>

    <div class="container results-container" v-if="showResults">

      <b-button-group size="sm">
        <b-button
          v-for="(btn, idx) in buttons"
          :key="idx"
          :pressed.sync="btn.state"
          variant="primary"
        >
          {{ btn.caption }}
        </b-button>
      </b-button-group>

      <RecipePreviewList 
        :recipes="searchResultsRecipes"
        :title="resultTitle"
        :class="{
          RandomRecipes: true,
          center: true
        }">
      </RecipePreviewList>
    </div>

    <div class="history-container" v-if="searchHistoryRecipes.length > 0">
      <RecipePreviewList 
        :recipes="searchHistoryRecipes"
        :title="searchHistoryTitle"
        :class="{
          RandomRecipes: true,
          center: true
        }">
      </RecipePreviewList>
    </div>

  </div>
</template>

<script>
import cuisines from "../assets/cuisines";
import diets from "../assets/diets";
import intolerances from "../assets/intolerances";
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      searchForm: {
        text_to_search: "",
        selected_cuisines: [],
        selected_diets: [],
        selected_intolerances: [],
        num_of_results: "5"
      },
      cuisines: [],
      diets: [],
      intolerances: [],
      search_error: undefined,
      searchResultsRecipes: []
    };
  },
  mounted() {
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
  },
  methods: {
    async submit() {
      try {
        const response = await this.axios.get(`${this.$root.store.server_domain}/recipes/search`, {
          params: {
            recipeName: this.searchForm.text_to_search,
            cuisine: this.searchForm.selected_cuisines,
            diet: this.searchForm.selected_diets,
            intolerance: this.searchForm.selected_intolerances,
            number: this.searchForm.num_of_results
          }
        });
        this.searchResultsRecipes = response.data;
        if (this.searchResultsRecipes.length > 0) {
          window.sessionStorage.setItem('searchHistoryText', this.searchForm.text_to_search);
          window.sessionStorage.setItem('searchHistoryRecipes', JSON.stringify(this.searchResultsRecipes));
        }
      } catch (err) {
        if (err.response) {
          this.search_error = err.response.data.message;
        } else {
          this.search_error = err.message || "Unknown error";
        }
      }
    },
    async reset() {
      this.searchForm = {
        text_to_search: "",
        selected_cuisines: [],
        selected_diets: [],
        selected_intolerances: [],
        num_of_results: "5"
      };
      this.search_error = undefined;
    }
  },
  computed: {
    searchable() {
      return this.searchForm.text_to_search.trim() !== "" ||
        this.searchForm.selected_cuisines.length > 0 ||
        this.searchForm.selected_diets.length > 0 ||
        this.searchForm.selected_intolerances.length > 0;
    },
    searchHistoryRecipes() {
      const searchHistoryRecipes = window.sessionStorage.getItem('searchHistoryRecipes');
      return searchHistoryRecipes ? JSON.parse(searchHistoryRecipes) : [];
    },
    searchHistoryTitle() {
      return `Your last search, "${window.sessionStorage.getItem('searchHistoryText')}"`;
    },
    showResults() {
      return this.searchResultsRecipes.length > 0;
    },
    resultTitle() {
    return `Showing ${this.searchResultsRecipes.length} Results`;
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
.main-container {
  display: flex;
}
.history-container {
  margin-left: auto;
  margin-right: auto;
}
.results-container {
  max-width: 800px;
}
</style>