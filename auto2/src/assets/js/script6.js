import "@algolia/autocomplete-theme-classic";
import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
import algoliasearch from "algoliasearch";

import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'navbar',
});

const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: 'instant_search_demo_query_suggestions',
  categoryAttribute: [
    'instant_search',
    'facets',
    'exact_matches',
    'hierarchicalCategories.lvl0',
  ],
});

const input = document.querySelector('#autocomplete');

function getPlugins(query) {
  if (query.length > 3) {
    return [recentSearchesPlugin, querySuggestionsPlugin];
  }
  return [];
}

autocomplete({
  container: "#autocomplete",
  placeholder: "Search for products",
  openOnFocus: true,
  plugins: getPlugins(""), // Start with an empty query
  onInput({ query }) {
    // Dynamically update the plugins based on query length
    this.update({ plugins: getPlugins(query) });
  },
});
