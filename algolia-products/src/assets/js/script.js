import algoliasearch from "algoliasearch/lite";
import instantsearch from "instantsearch.js";
import {
  searchBox,
  hits,
  refinementList,
  index,
  menu,
  rangeSlider,
  configure

} from "instantsearch.js/es/widgets";
import { history } from "instantsearch.js/es/lib/routers";
import qs from 'qs';



 

const searchClient = algoliasearch(
  "S4DA3UQ9TS",
  "64e8c3ef89266fff1719ad8b745d7e03"
);





function getCategorySlug(name) {
  return name
    .split(' ')
    .map(encodeURIComponent)
    .join('+');
}
function getCategoryName(slug) {
  return slug
    .split('+')
    .map(decodeURIComponent)
    .join(' ');
}


const search = instantsearch({
  indexName: "",
  searchClient,

  routing: {
    router:history({

      createURL({ qsModule, routeState, location }) {
        const urlParts = location.href.match(/^(.*?)\/search/);
        const baseUrl = `${urlParts ? urlParts[1] : ""}/`;
        // console.log("base url",baseUrl);
        // console.log(routeState, "routeState1")
        const categoryPath = routeState.material
          ? `${getCategorySlug(routeState.material)}/`
          : "";

          
        const queryParameters = {};

        if (routeState.query) {
          queryParameters.query = encodeURIComponent(routeState.query);
        }
        if (routeState.page !== 1) {
          queryParameters.page = routeState.page;
        }
        if (routeState.colorList) {
          queryParameters.colorList =
            routeState.colorList.map(encodeURIComponent);
        }

        const queryString = qsModule.stringify(queryParameters, {
          addQueryPrefix: true,
          arrayFormat: "repeat",
        });
       
        // console.log(categoryPath,"cp");
        // console.log(queryString,"qS");

        return `${baseUrl}search/${queryString}${categoryPath}`;
      },

      parseURL({ qsModule, location }) {
        const pathnameMatches = location.pathname.match(/search\/(.*?)\/?$/);
        const material = getCategoryName(
          (pathnameMatches && pathnameMatches[1]) || ""
        );
        const {
          query = "",
          page,
          colorList = [],
        } = qsModule.parse(location.search.slice(1));
        // `qs` does not return an array when there's a single value.
        const allColor = Array.isArray(colorList)
          ? colorList
          : [colorList].filter(Boolean);

        return {
          query: decodeURIComponent(query),
          page,
          colorList: allColor.map(decodeURIComponent),
          material,
        };
      },
    }),

    stateMapping: {
      stateToRoute(uiState) {
        const indexUiState = uiState["product1"] || {};
      //  console.log(uiState, "uistate---")
        return {
          query: indexUiState.query,
          page: indexUiState.page,
          colorList:
            indexUiState.refinementList && indexUiState.refinementList.color,
          material: indexUiState.menu && indexUiState.menu.material,
        };
      },

      routeToState(routeState) {
        return {
          product1: {
            query: routeState.query,
            page: routeState.page,
            menu: {
              material: routeState.material,
            },
            refinementList: {
              color: routeState.colorList,
            },
          },
        };
      },
    },
  },
});

search.addWidgets([


  index({
    indexName: "CLOTH",
    indexId: "product1",
  }).addWidgets([
    refinementList({
      container: "#refinement-list",
      attribute: "color",
    }),
    // configure({
    
    // sortFacetValuesBy: 'alpha',
    

    // }),
    
    hits({
      container: "#hits",
    }),
    rangeSlider({
      container: "#range-slider",
      attribute: "price",
    }),
    menu({
      container: "#menu",
      attribute: "material",
      
      sortBy:["count"], //isse hmne uska odering inhibit kiya h upon selection
      // transformItems(items) {
      //   console.log(items,"items")
      //   return items.map(item => ({
      //     ...item,
      //     label: item.label.toUpperCase(),
      //   }));
      // },
    }),
  ]),

  index({
    indexName: "SHOE",
    indexId: "product2",
  }).addWidgets([
    refinementList({
      container: "#refinement-list2",
      attribute: "color",
     
    }),
    

    hits({
      container: "#hits2",
    }),

    menu({
      container: "#menu2",
      attribute: "material",
    }),

    rangeSlider({
      container: "#range-slider2",
      attribute: "price",
    }),
  ]),



//common thats why outside of index but inside of search.addWidgets
  searchBox({
    container: "#searchbox",
  })
]);

search.start();
