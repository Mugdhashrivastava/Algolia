// import algoliasearch from 'algoliasearch/lite';
// import { autocomplete, getAlgoliaResults,getAlgoliaFacets } from '@algolia/autocomplete-js';

// import '@algolia/autocomplete-theme-classic';

// const searchClient = algoliasearch(
//   "S4DA3UQ9TS",
//   "64e8c3ef89266fff1719ad8b745d7e03"
// );

// autocomplete({
//   container: '#autocomplete',
//   placeholder: 'Search for products',
//   openOnFocus: true,
//   getSources({ query }) {
//     if (!query) {
//       return [
//         {
//           sourceId: 'links',
//           getItems() {
//             return [
//               { label: 'Shipping', url: '#shipping' },
//               { label: 'Contact', url: '#contact' },
//             ];
//           },
//           getItemUrl({ item }) {
//             return item.url;
//           },
//           templates: {
//             item({ item }) {
//               return item.label;
//             },
//           },
//         },
//       ];
//     }

//     return [
//       {
//         sourceId: 'products',
//         getItems() {
//           return getAlgoliaResults({
//             searchClient,
//             queries: [
//               {
//                 indexName: 'instant_search',
//                 query,
//               },
//             ],
//           });
//         },
//         getItemUrl({ item }) {
//           return item.url;
//         },
//         templates: {
//           item({ item }) {
//             return item.name;
//           },
//         },
//       },
//     ];
//   },
// });


import algoliasearch from 'algoliasearch/lite';
import { autocomplete, getAlgoliaFacets } from '@algolia/autocomplete-js';

import '@algolia/autocomplete-theme-classic';

const searchClient = algoliasearch(
  "S4DA3UQ9TS",
  "64e8c3ef89266fff1719ad8b745d7e03"
);

autocomplete({
  // ...
  getSources() {
    return [
      {
        sourceId: 'brands',
        getItems({ query }) {
          return getAlgoliaFacets({
            searchClient,
            queries: [
              {
                indexName: 'instant_search',
                facet: 'brand',
                params: {
                  facetQuery: query,
                  maxFacetHits: 5,
                },
              },
            ],
            transformResponse({ facetHits }) {
              return facetHits[0].map((hit) => ({ ...hit, facet: 'brand' }));
            },
          });
        },
        templates: {
          item({ item, components, html }) {
            return html`<div class="aa-ItemWrapper">
              <div class="aa-ItemContent">
                <div class="aa-ItemContentBody">
                  <div class="aa-ItemContentTitle">
                    ${components.Highlight({ hit: item, attribute: 'label' })}
                  </div>
                </div>
              </div>
              <div class="aa-ItemActions">
                <button
                  class="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                  type="button"
                  title="Filter"
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                </button>
              </div>
            </div>`;
          },
        },
      },
    ];
  },
});