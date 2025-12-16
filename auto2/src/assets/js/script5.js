import { autocomplete , getAlgoliaResults} from '@algolia/autocomplete-js';
import algoliasearch from "algoliasearch";
import '@algolia/autocomplete-theme-classic';


const searchClient = algoliasearch(
    "S4DA3UQ9TS",
    "64e8c3ef89266fff1719ad8b745d7e03"
  );
  

autocomplete({
  container: '#autocomplete',
  placeholder: 'Search',
  getSources({ query }) {
    return [
      {
        sourceId: 'products',
        getItems() {
          return getAlgoliaResults({
            searchClient,
            queries: [
              {
                indexName: 'CLOTH',
                query,
                params: {
                  hitsPerPage: 5,
                },
              },
            ],
          });
        },
        templates: {
          item({ item }) {
            return `<div>${item.color}</div>`;
          },
        },
      },
    ];
  },
  getEnvironmentProps({ state, props }) {
    return {
      ...props,
      onKeyDown(event) {
        if (event.key === 'ArrowUp') {
          console.log("arrow up");
        } else if (event.key === 'ArrowDown') {
          console.log('arrow down');
        }
      },
    };
  },
});
