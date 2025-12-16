// import algoliasearch from 'algoliasearch';
// import instantsearch from 'instantsearch.js';
// import historyRouter from 'instantsearch.js/es/lib/routers/history';
// import {
//   hierarchicalMenu,
//   hits,
//   pagination,

// } from 'instantsearch.js/es/widgets';

// // connector
// import { connectSearchBox } from 'instantsearch.js/es/connectors';

// // autocomplete
// import { autocomplete } from '@algolia/autocomplete-js';

// import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
// import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';

// import '@algolia/autocomplete-theme-classic';

// const searchClient = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
// const INSTANT_SEARCH_INDEX_NAME = 'instant_search';
// const instantSearchRouter = historyRouter();
// const search = instantsearch({
//   searchClient,
//   indexName: INSTANT_SEARCH_INDEX_NAME,
//   routing: instantSearchRouter,
// });

// // step2 virtualBox
// const virtualSearchBox = connectSearchBox(() => {});

// search.addWidgets([
//   virtualSearchBox({}),
//   hierarchicalMenu({
//     container: '#categories',
//     attributes: ['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1'],
//   }),
//   hits({
//     container: '#hits',
//   }),
//   pagination({
//     container: '#pagination',
//   }),
  
// ]);

// search.start();

// const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
//   key: 'navbar',
// });

// const querySuggestionsPlugin = createQuerySuggestionsPlugin({
//   searchClient,
//   indexName: 'instant_search_demo_query_suggestions',
//   categoryAttribute: [
//     'instant_search',
//     'facets',
//     'exact_matches',
//     'hierarchicalCategories.lvl0',
//   ],
// });

// // Set the InstantSearch index UI state from external events.
// function setInstantSearchUiState(indexUiState) {
//   search.setUiState((uiState) => ({
//     ...uiState,
//     [INSTANT_SEARCH_INDEX_NAME]: {
//       ...uiState[INSTANT_SEARCH_INDEX_NAME],
//       // We reset the page when the search state changes.
//       page: 1,
//       ...indexUiState,
//     },
//   }));
// }

// // Return the InstantSearch index UI state.
// function getInstantSearchUiState() {
//   const uiState = instantSearchRouter.read();

//   return (uiState && uiState[INSTANT_SEARCH_INDEX_NAME]) || {};
// }

// const searchPageState = getInstantSearchUiState();

// let skipInstantSearchUiStateUpdate = false;

// const { setQuery } = autocomplete({
//   container: '#autocomplete',
//   placeholder: 'Search for products',
//   detachedMediaQuery: 'none',
//   plugins:[],
//   initialState: {
//     query: searchPageState.query || '',
//   },
//   onSubmit({ state }) {
//     setInstantSearchUiState({ query: state.query });
//   },
//   onReset() {
//     setInstantSearchUiState({ query: '' });
//   },

//   onStateChange({ prevState, state }) {
//     if (!skipInstantSearchUiStateUpdate && prevState.query !== state.query) {
//       setInstantSearchUiState({ query: state.query });
//     }
    
//     skipInstantSearchUiStateUpdate = false;
  
//     if (state.query.length >= 3) {
    
//       autocomplete({
//         container: '#autocomplete',
//         placeholder: 'Search for products',
//         plugins: [recentSearchesPlugin, querySuggestionsPlugin],
//         detachedMediaQuery: 'none',
//         initialState: {
//           query: state.query || '',
//         },
//         onSubmit({ state }) {
//           setInstantSearchUiState({ query: state.query });
//         },
//         onReset() {
//           setInstantSearchUiState({ query: '' });
//         },
//         onStateChange({ prevState, state }) {
//           if (!skipInstantSearchUiStateUpdate && prevState.query !== state.query) {
//             setInstantSearchUiState({ query: state.query });
//           }
//           skipInstantSearchUiStateUpdate = false;
//         },
//       });
//     } else {
      
//       setInstantSearchUiState({ query: '' });
//     }
//   }
  
// });

// // This keeps Autocomplete aware of state changes coming from routing
// // and updates its query accordingly
// window.addEventListener('popstate', () => {
//   skipInstantSearchUiStateUpdate = true;
//   setQuery(search.helper?.state.query || '');
// });
 




import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';
import historyRouter from 'instantsearch.js/es/lib/routers/history';
import {
  hierarchicalMenu,
  hits,
  pagination,
} from 'instantsearch.js/es/widgets';

// connector
import { connectSearchBox } from 'instantsearch.js/es/connectors';

// autocomplete
import { autocomplete } from '@algolia/autocomplete-js';

import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';

import '@algolia/autocomplete-theme-classic';

const searchClient = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
const INSTANT_SEARCH_INDEX_NAME = 'instant_search';
const instantSearchRouter = historyRouter();
const search = instantsearch({
  searchClient,
  indexName: INSTANT_SEARCH_INDEX_NAME,
  routing: instantSearchRouter,
});

// step2 virtualBox
const virtualSearchBox = connectSearchBox(() => {});

search.addWidgets([
  virtualSearchBox({}),
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

// Create the autocomplete instance once
const autocompleteInstance = autocomplete({
  container: '#autocomplete',
  placeholder: 'Search for products',
  detachedMediaQuery: 'none',
  plugins: [], // Initialize without plugins
  initialState: {
    query: search.helper?.state.query || '',
  },
  onSubmit({ state }) {
    setInstantSearchUiState({ query: state.query });
  },
  onReset() {
    setInstantSearchUiState({ query: '' });
  },
  onStateChange({ prevState, state }) {
    if (!skipInstantSearchUiStateUpdate && prevState.query !== state.query) {
      setInstantSearchUiState({ query: state.query });
    }
    skipInstantSearchUiStateUpdate = false;

    // Update plugins based on query length
    if (state.query.length >= 3) {
      autocompleteInstance.updateOptions({
        plugins: [recentSearchesPlugin, querySuggestionsPlugin],
      });
    } else {
      autocompleteInstance.updateOptions({
        plugins: [], // Remove plugins if query length is less than 3
      });
    }
  },
});

// Set the InstantSearch index UI state from external events.
function setInstantSearchUiState(indexUiState) {
  search.setUiState((uiState) => ({
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

// This keeps Autocomplete aware of state changes coming from routing
// and updates its query accordingly
window.addEventListener('popstate', () => {
  skipInstantSearchUiStateUpdate = true;
  autocompleteInstance.setQuery(search.helper?.state.query || '');
});
