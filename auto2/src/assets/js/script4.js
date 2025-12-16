import "@algolia/autocomplete-theme-classic";

import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
import algoliasearch from "algoliasearch";






const searchClient = algoliasearch(
  "S4DA3UQ9TS",
  "64e8c3ef89266fff1719ad8b745d7e03"
);






autocomplete({
  container: "#autocomplete",
  placeholder: "Search for products",
  openOnFocus: true,
detachedMediaQuery: '',
  

  getSources({ query }) {
    return [
        {
          sourceId: 'products',
        
            getItemUrl({ item }) {
              console(item.color);
              return item.color;
            },
        getItems() {
          return getAlgoliaResults({
            searchClient,
            queries: [
              {
                indexName: "CLOTH",
                query,
                params: {
                  hitsPerPage: 5,
                  attributesToSnippet: ["color:10", "price:35"],
                  snippetEllipsisText: "color",
                },
              },
            ],
          });
        },
        templates: {
            item({ item }) {
              return `material: ${item.material}`;
            },
        },
        getItemUrl({ item }) {
          return item.url;
        },
      },
    ];
  },





  navigator: {
    navigate({ itemUrl }) {
      window.location.assign(itemUrl);
    },
    navigateNewTab({ itemUrl }) {
      const windowReference = window.open(itemUrl, '_blank', 'noopener');

      if (windowReference) {
        windowReference.focus();
      }
    },
    navigateNewWindow({ itemUrl }) {
      window.open(itemUrl, '_blank', 'noopener');
    },
}
});




