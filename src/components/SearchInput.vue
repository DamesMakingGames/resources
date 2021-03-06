<template>
  <div class="relative mx-auto w-80">
    <search-focus @keyup="focusSearch"></search-focus>

    <div class="relative w-80">
      <input
        type="text"
        placeholder="Search"
        class="bg-background-form border border-gray-500 rounded-full px-4 pl-10 py-2 outline-none focus:border-gray-500 w-80"
        v-model="query"
        @input="softReset"
        @keyup="performSearch"
        @keyup.esc="searchResultsVisible = false"
        @keydown.up.prevent="highlightPrev"
        @keydown.down.prevent="highlightNext"
        @keyup.enter="gotoLink"
        @blur="searchResultsVisible = false"
        @focus="searchResultsVisible = true"
        ref="search"
      />
      <div class="absolute top-0 ml-3" style="top:10px">
        <svg
          fill="currentColor"
          class="text-gray-500 h-5 w-5"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            class="heroicon-ui"
            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
          />
        </svg>
      </div>
      <div
        v-if="query.length > 0"
        class="absolute top-0 right-0 text-2xl mr-3 cursor-pointer text-gray-600 hover:text-gray-800"
        style="top:2px;"
        @click="reset"
      >
        &times;
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="query.length > 0 && searchResultsVisible"
        class="normal-case absolute border left-0 right-0 w-108 text-left mb-4 mt-2 rounded-lg shadow overflow-hidden z-10 overflow-y-auto no-underline"
        style="max-height: 32rem"
      >
        <div class="flex flex-col" ref="results">
          <a
            v-for="(post, index) in results"
            :key="index"
            :href="post.item.URL"
            @click="reset"
            class="search-result"
            :class="{ 'search-highlighted': index === highlightedIndex }"
          >
            <span class="title">{{ post.item.Name }}</span>
            <span class="summary">{{ post.item.Notes }}</span>
          </a>

          <div
            v-if="results.length === 0"
            class="bg-background-form font-normal w-full border-b cursor-pointer p-4"
          >
            <p class="my-0">
              No results for '
              <strong>{{ query }}</strong
              >'
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<static-query>
  {
    metadata{
      pathPrefix
    }
  }
</static-query>

<script>
import axios from "axios";
import SearchFocus from "./SearchFocus";

export default {
  components: {
    SearchFocus,
  },
  created() {
    axios("/search.json")
      .then((response) => {
        this.resourcesc19 = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      query: "",
      results: [],
      resourcesc19: [],
      highlightedIndex: 0,
      searchResultsVisible: false,
      options: {
        shouldSort: true,
        includeMatches: true,
        threshold: 0.5,
        location: 0,
        distance: 500,
        maxPatternLength: 32,
        minMatchCharLength: 3,
        keys: ["Name", "Notes"],
      },
    };
  },
  methods: {
    reset() {
      this.query = "";
      this.highlightedIndex = 0;
    },
    softReset() {
      this.highlightedIndex = 0;
      this.searchResultsVisible = true;
    },
    performSearch() {
      this.$search(this.query, this.resourcesc19, this.options).then(
        (results) => {
          this.results = results;
        }
      );
    },
    highlightPrev() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex = this.highlightedIndex - 1;
        this.scrollIntoView();
      }
    },
    highlightNext() {
      if (this.highlightedIndex < this.results.length - 1) {
        this.highlightedIndex = this.highlightedIndex + 1;
        this.scrollIntoView();
      }
    },
    scrollIntoView() {
      this.$refs.results.children[this.highlightedIndex].scrollIntoView({
        block: "nearest",
      });
    },
    gotoLink() {
      if (this.results[this.highlightedIndex]) {
        window.location = this.results[this.highlightedIndex].item.url;
      }
    },
    focusSearch(e) {
      if (e.key === "/") {
        this.$refs.search.focus();
      }
    },
  },
};
</script>

<style scoped lang="postcss">
.search-result {
  @apply bg-white border-b border-gray-400 text-lg cursor-pointer p-4 search-hover no-underline leading-tight;
  .title {
    @apply block text-lg font-bold my-1;
  }
  .summary {
    @apply block font-normal text-sm my-1 text-black;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.search-highlighted {
  @apply bg-green-100;
}

.search-hover {
  @apply bg-green-200;
}
</style>
