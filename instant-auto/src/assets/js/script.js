import { autocomplete } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import historyRouter from 'instantsearch.js/es/lib/routers/history';
import { connectSearchBox } from 'instantsearch.js/es/connectors';
import { hierarchicalMenu, hits, pagination } from 'instantsearch.js/es/widgets';



import { createLocalStorageRecentSearchesPlugin} from '@algolia/autocomplete-plugin-recent-searches';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';

import '@algolia/autocomplete-theme-classic';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76',
);

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
    key: 'navbar',
  });


  const querySuggestionsPlugin = createQuerySuggestionsPlugin({
    searchClient,
    indexName: 'instant_search_demo_query_suggestions',
  });

const INSTANT_SEARCH_INDEX_NAME = 'instant_search';
const instantSearchRouter = historyRouter();

const search = instantsearch({
  searchClient,
  indexName: INSTANT_SEARCH_INDEX_NAME,
  routing: instantSearchRouter,
});

// Mount a virtual search box to manipulate InstantSearch's `query` UI
// state parameter.
const virtualSearchBox = connectSearchBox(() => {});

search.addWidgets([
  virtualSearchBox({}),
  hierarchicalMenu({
    container: '#categories',
    attributes: ['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1'],
  }),
  hits({
    container: '#hits',
    templates: {
      item(hit, { html, components }) {
        return html`
          <div>
            ${components.Highlight({ attribute: 'name', hit })}
          </div>
        `;
      },
    },
  }),
  pagination({
    container: '#pagination',
  }),
]);

search.start();

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
