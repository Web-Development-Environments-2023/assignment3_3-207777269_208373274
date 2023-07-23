<template>
  <div class="main-container">
    <div class="container search-container" :style="searchContainerStyle">
      <h1 class="title" style="font-family: Frank Ruhl Libre, Georgia, serif; font-size: 30px;">Search</h1>

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
              <b-form-input id="num_of_results" v-model="searchForm.num_of_results" type="range" min="5" max="15" step="5"></b-form-input>
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
      <div class="sorting-buttons-container">
        <b-button @click="sortResultsByPreparationTime" squared variant="outline-secondary">Sort by Preparation Time</b-button>
        <b-button @click="sortResultsByPopularity" squared variant="outline-secondary">Sort by Popularity</b-button>
      </div>

      <RecipePreviewList 
        :title="resultTitle"
        :recipes="searchResultsRecipes"
        :class="{
          RandomRecipes: true,
          center: true
        }"
        width="600px"
        :isColumn=true
        route_name="recipe"
        >
      </RecipePreviewList>
    </div>

    <div class="container results-container no-results-container" v-else-if="isSearchPerformed">
      <h1 class="title" style="font-family: Frank Ruhl Libre, Georgia, serif; font-size: 40px;">No Results Found</h1>
      <img src="../assets/Sad Tomato.png" alt="No Results Found" width="150">
    </div>

    <div class="history-container" v-if="searchHistoryRecipes.length > 0">
      <RecipePreviewList 
        :title="searchHistoryTitle"
        :recipes="searchHistoryRecipes"
        :class="{
          RandomRecipes: true,
          center: true
        }"
        width="190px"
        :isColumn=true
        route_name="recipe"
        >
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
      searchResultsRecipes: [],
      previousSearchText: window.sessionStorage.getItem('searchHistoryText') || "",
      previousSearchResults: JSON.parse(window.sessionStorage.getItem('searchHistoryRecipes')) || [],
      isSearchPerformed: false
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
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(`${this.$root.store.server_domain}/recipes/search`, {
          params: {
            recipeName: this.searchForm.text_to_search,
            cuisine: this.searchForm.selected_cuisines,
            diet: this.searchForm.selected_diets,
            intolerance: this.searchForm.selected_intolerances,
            number: this.searchForm.num_of_results
          }
        });
        this.updateSearchHistory();
        this.isSearchPerformed = true;
        this.searchResultsRecipes = response.data;
        if (this.searchResultsRecipes.length > 0) {
          this.updateSearchHistory();
          this.currentSearchText = this.searchForm.text_to_search;
          this.currentSearchResults = this.searchResultsRecipes;
        }
      } catch (err) {
        if (err.response) {
          this.search_error = err.response.data.message;
        } else {
          this.search_error = err.message || "Unknown error";
        }
      }
      this.axios.defaults.withCredentials = false;
    },
    updateSearchHistory() {
      if (this.currentSearchText) {
        window.sessionStorage.setItem('searchHistoryText', this.currentSearchText);
        window.sessionStorage.setItem('searchHistoryRecipes', JSON.stringify(this.currentSearchResults));
        this.previousSearchText = this.currentSearchText;
        this.previousSearchResults = this.currentSearchResults;
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
    },
    sortResultsByPreparationTime() {
        this.searchResultsRecipes.sort((a, b) => a.ready_in_minutes - b.ready_in_minutes);
    },
    sortResultsByPopularity() {
        this.searchResultsRecipes.sort((a, b) => b.aggregate_likes - a.aggregate_likes);
    }
  },
  beforeDestroy() {
    this.updateSearchHistory();
  },
  computed: {
    searchable() {
      return this.searchForm.text_to_search.trim() !== "" ||
        this.searchForm.selected_cuisines.length > 0 ||
        this.searchForm.selected_diets.length > 0 ||
        this.searchForm.selected_intolerances.length > 0;
    },
    searchHistoryTitle() {
      return `Your last search, "${this.previousSearchText}":`;
    },
    searchHistoryRecipes() {
      return this.previousSearchResults;
    },
    showResults() {
      return this.searchResultsRecipes.length > 0;
    },
    resultTitle() {
      let messageToReturn = `${this.searchResultsRecipes.length} recipe`;
      if (this.searchResultsRecipes.length > 1)
        messageToReturn += 's';
      messageToReturn += ' found:';
      return messageToReturn;
    },
    searchContainerStyle() {
      return this.isSearchPerformed ? {} : {
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block'
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.main-container {
  display: flex;
  justify-content: center;
}
.search-container {
  margin-left: 1.5%;
  width: 35%;
}
.results-container {
  width: 60%;
  margin-left: -3%;
}
.history-container {
  margin-right: 1.5%;
  margin-left: -2%;
  max-width: 14%;
}
.sorting-buttons-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.no-results-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5%;
}
</style>