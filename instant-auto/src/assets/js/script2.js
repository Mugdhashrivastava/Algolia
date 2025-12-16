//instant search
import algoliasearch from "algoliasearch";
import instantsearch from "instantsearch.js";
import historyRouter from "instantsearch.js/es/lib/routers/history";
import {
  hierarchicalMenu,
  hits,
//   searchBox,
  pagination,
  
} from "instantsearch.js/es/widgets";

//connector
import { connectSearchBox } from 'instantsearch.js/es/connectors';

//autocomplete
import { autocomplete } from '@algolia/autocomplete-js';

import { createLocalStorageRecentSearchesPlugin} from '@algolia/autocomplete-plugin-recent-searches';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';

import '@algolia/autocomplete-theme-classic';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76',
);
const INSTANT_SEARCH_INDEX_NAME = 'instant_search';
const instantSearchRouter = historyRouter();
const search = instantsearch({
  searchClient,
  indexName: INSTANT_SEARCH_INDEX_NAME,
  routing: instantSearchRouter,
});

//step2 virtualBox
const virtualSearchBox = connectSearchBox(() => {});


search.addWidgets([

    virtualSearchBox({}),
//   searchBox({
//     container: '#searchbox',
//     placeholder: 'Search for  
  hierarchicalMenu({
    container: '#categories',
    attributes: ['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1'],
  }),
  hits({
    container: '#hits',
     
  }),
  
  pagination({
    container: '#pagination',
  }),
  
    
]);

search.start();


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

//   autocomplete({
//     container: "#autocomplete",
//     placeholder: "Search for products",
//     openOnFocus: true,
//     plugins: [recentSearchesPlugin, querySuggestionsPlugin],

 
//   });



// Set the InstantSearch index UI state from external events.
function setInstantSearchUiState(indexUiState) {
    search.setUiState(uiState => ({
      ...uiState,
      [INSTANT_SEARCH_INDEX_NAME]: {
        ...uiState[INSTANT_SEARCH_INDEX_NAME],
        // We reset the page when the search state changes.
        page: 1,
        ...indexUiState,
      },
    }));
  }
  
  // Return the InstantSearch index UI state.
  function getInstantSearchUiState() {
    const uiState = instantSearchRouter.read();
  
    return (uiState && uiState[INSTANT_SEARCH_INDEX_NAME]) || {};
  }
  
  const searchPageState = getInstantSearchUiState();
  
  let skipInstantSearchUiStateUpdate = false;
  const { setQuery } = autocomplete({
    container: '#autocomplete',
    placeholder: 'Search for products',
    plugins: [recentSearchesPlugin, querySuggestionsPlugin],
    detachedMediaQuery: 'none',
    initialState: {
      query: searchPageState.query || '',
    },
    onSubmit({ state }) {
      setInstantSearchUiState({ query: state.query });
    },
    onReset() {
      setInstantSearchUiState({ query: '' });
    },
    onStateChange({ prevState, state }) {
      console.log(state.query.length,'query')
      if (!skipInstantSearchUiStateUpdate && prevState.query !== state.query) {
        setInstantSearchUiState({ query: state.query });
      }
      skipInstantSearchUiStateUpdate = false;
    },
  })
  
  // This keeps Autocomplete aware of state changes coming from routing
  // and updates its query accordingly
  window.addEventListener('popstate', () => {
    skipInstantSearchUiStateUpdate = true;
    setQuery(search.helper?.state.query || '');
  });
  