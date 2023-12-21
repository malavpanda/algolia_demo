/* global algoliasearch, instantsearch */
import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import {
  configure,
  hits,
  pagination,
  panel,
  refinementList,
  rangeSlider,
  stats,
  searchBox,
} from 'instantsearch.js/es/widgets';

import { hitTemplate } from "./helpers";

const search = instantsearch({
  indexName: "dev_movies_demo",
  searchClient: algoliasearch("04NBJB03SX", "9961db7b6f70dfddd222675325798bda"),
});

search.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 5,
    attributesToSnippet: ["Overview", "Genre", "Release_Date"],
    snippetEllipsisText: " [...]",
  })
);

// Uncomment the following widget to add hits list.

search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      empty: "No results.",
      item: hitTemplate,
    },
  })
);

// Uncomment the following widget to add a search bar.

search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#searchbox",
    placeholder: "Search for movies",
    autofocus: false,
  })
) /
  // Uncomment the following widget to add search stats.

  search.addWidget(
    instantsearch.widgets.stats({
      container: "#stats",
      templates: {
        text(hit, { html }) {
          return html`<span role="img" aria-label="emoji">⚡️</span>
            <strong>${hit.nbHits}</strong> results found ${" "}
            ${hit.query != ""
              ? html`for <strong>"${hit.query}"</strong>`
              : html``}
            ${" "} in <strong>${hit.processingTimeMS}ms</strong>`;
        },
      },
    })
  );

// Uncomment the following widget to add categories list.
// Before `search.start()`
search.addWidget(
  instantsearch.widgets.panel({
    templates: {
      header: "Genre",
    },
  })(instantsearch.widgets.refinementList)({
    container: "#genre",
    attribute: "Genre",
    limit: 4,
  })
);

// Uncomment the following widget to add brands list.

search.addWidget(
  instantsearch.widgets.panel({
    templates: {
      header: "Original Language",
    },
  })(instantsearch.widgets.refinementList)({
    container: "#brands",
    attribute: "Original_Language",
    limit: 4,
  })
);

// Uncomment the following widget to add price range.

search.addWidget(
  instantsearch.widgets.panel({
    templates: {
      header: "Rating",
    },
  })(instantsearch.widgets.rangeSlider)({
    container: "#price",
    attribute: "Vote_Average",
  })
);

// Uncomment the following widget to add pagination.

search.addWidget(
  instantsearch.widgets.pagination({
    container: "#pagination",
  })
);

search.start();
