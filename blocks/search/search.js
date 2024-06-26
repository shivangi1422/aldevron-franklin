import { loadCSS } from '../../scripts/aem.js';

const searchBody = `
<atomic-search-interface fields-to-include='["snrating", "sncost"]'> 
<atomic-search-layout>
  <div class="header-bg"></div>
  <atomic-layout-section section="search">
    <atomic-search-box></atomic-search-box>
  </atomic-layout-section>
  <atomic-layout-section section="facets">
    <atomic-facet-manager>
      <atomic-category-facet
        field="geographicalhierarchy"
        label="World Atlas"
        with-search
      >
      </atomic-category-facet>
      <atomic-facet field="contenttype" label="Content Type"></atomic-facet>
      <atomic-facet field="pagetype" label="Page Type"></atomic-facet>
    </atomic-facet-manager>
  </atomic-layout-section>
  <atomic-layout-section section="main">
    <atomic-layout-section section="horizontal-facets">
      <atomic-segmented-facet-scrollable>
        <atomic-segmented-facet
          field="inat_kingdom"
          label="Kingdom"
        ></atomic-segmented-facet>
      </atomic-segmented-facet-scrollable>
      <atomic-popover>
        <atomic-facet field="inat_family" label="Family"></atomic-facet>
      </atomic-popover>
      <atomic-popover>
        <atomic-facet field="inat_class" label="Class"></atomic-facet>
      </atomic-popover>
    </atomic-layout-section>
    <atomic-layout-section section="status">
      <atomic-breadbox></atomic-breadbox>
      <atomic-query-summary></atomic-query-summary>
      <atomic-refine-toggle></atomic-refine-toggle>
      <atomic-sort-dropdown>
        <atomic-sort-expression
          label="relevance"
          expression="relevancy"
        ></atomic-sort-expression>
        <atomic-sort-expression
          label="Title"
          expression="title ascending"
        ></atomic-sort-expression>
      </atomic-sort-dropdown>
      <atomic-did-you-mean></atomic-did-you-mean>
      <atomic-notifications></atomic-notifications>
    </atomic-layout-section>
    <atomic-layout-section section="results">
      <atomic-smart-snippet></atomic-smart-snippet>
      <atomic-smart-snippet-suggestions></atomic-smart-snippet-suggestions>
      <atomic-result-list>
        <atomic-result-template must-match-sourcetype="YouTube">
          <template>
            <atomic-result-section-visual image-size="small">
              <img
                loading="lazy"
                src="https://picsum.photos/350"
                class="thumbnail"
              />
            </atomic-result-section-visual>
            <atomic-result-section-title
              ><atomic-result-link></atomic-result-link
            ></atomic-result-section-title>
            <atomic-result-section-excerpt
              ><atomic-result-text field="excerpt"></atomic-result-text
            ></atomic-result-section-excerpt>
          </template>
        </atomic-result-template>

        <atomic-result-template>
          <template>
            <style>
              .field {
                display: inline-flex;
                align-items: center;
              }

              .field-label {
                font-weight: bold;
                margin-right: 0.25rem;
              }

              .thumbnail {
                display: none;
                width: 100%;
                height: 100%;
              }

              .icon {
                display: none;
              }

              .result-root.image-small .thumbnail,
              .result-root.image-large .thumbnail {
                display: inline-block;
              }

              .result-root.image-icon .icon {
                display: inline-block;
              }

              .result-root.image-small atomic-result-section-visual,
              .result-root.image-large atomic-result-section-visual {
                border-radius: var(--atomic-border-radius-xl);
              }

              .salesforce-badge::part(result-badge-element) {
                background-color: #44a1da;
                color: white;
              }
            </style>
            <atomic-result-section-visual>
              <atomic-result-icon class="icon"></atomic-result-icon>
              <img
                loading="lazy"
                src="https://picsum.photos/350"
                class="thumbnail"
              />
            </atomic-result-section-visual>
            <atomic-result-section-badges>
              <atomic-field-condition must-match-sourcetype="Salesforce">
                <atomic-result-badge
                  label="Salesforce"
                  class="salesforce-badge"
                ></atomic-result-badge>
              </atomic-field-condition>
              <atomic-result-badge
                icon="https://raw.githubusercontent.com/Rush/Font-Awesome-SVG-PNG/master/black/svg/language.svg"
              >
                <atomic-result-multi-value-text
                  field="language"
                ></atomic-result-multi-value-text>
              </atomic-result-badge>
              <atomic-field-condition must-match-is-recommendation="true">
                <atomic-result-badge
                  label="Recommended"
                ></atomic-result-badge>
              </atomic-field-condition>
              <atomic-field-condition must-match-is-top-result="true">
                <atomic-result-badge
                  label="Top Result"
                ></atomic-result-badge>
              </atomic-field-condition>
            </atomic-result-section-badges>
            <atomic-result-section-title
              ><atomic-result-link field='clickUri'><button class="btn-view">View</button></atomic-result-link
            ></atomic-result-section-title>
            <atomic-result-section-title-metadata>
              <atomic-field-condition class="field" if-defined="snrating">
                <atomic-result-rating
                  field="snrating"
                ></atomic-result-rating>
              </atomic-field-condition>
              <atomic-field-condition
                class="field"
                if-not-defined="snrating"
              >
                <atomic-result-printable-uri
                  max-number-of-parts="3"
                ></atomic-result-printable-uri>
              </atomic-field-condition>
            </atomic-result-section-title-metadata>
            <atomic-result-section-excerpt
              ><atomic-result-text field="excerpt"></atomic-result-text
            ></atomic-result-section-excerpt>
            <atomic-result-section-bottom-metadata>
              <atomic-result-fields-list>
                <atomic-field-condition class="field" if-defined="author">
                  <span class="field-label"
                    ><atomic-text value="author"></atomic-text>:</span
                  >
                  <atomic-result-text field="author"></atomic-result-text>
                </atomic-field-condition>

                <atomic-field-condition class="field" if-defined="source">
                  <span class="field-label"
                    ><atomic-text value="source"></atomic-text>:</span
                  >
                  <atomic-result-text field="source"></atomic-result-text>
                </atomic-field-condition>

                <atomic-field-condition
                  class="field"
                  if-defined="language"
                >
                  <span class="field-label"
                    ><atomic-text value="language"></atomic-text>:</span
                  >
                  <atomic-result-multi-value-text
                    field="language"
                  ></atomic-result-multi-value-text>
                </atomic-field-condition>

                <atomic-field-condition
                  class="field"
                  if-defined="filetype"
                >
                  <span class="field-label"
                    ><atomic-text value="fileType"></atomic-text>:</span
                  >
                  <atomic-result-text
                    field="filetype"
                  ></atomic-result-text>
                </atomic-field-condition>

                <atomic-field-condition class="field" if-defined="sncost">
                  <span class="field-label">Cost:</span>
                  <atomic-result-number field="sncost">
                    <atomic-format-currency
                      currency="CAD"
                    ></atomic-format-currency>
                  </atomic-result-number>
                </atomic-field-condition>

                <span class="field">
                  <span class="field-label">Date:</span>
                  <atomic-result-date
                    format="ddd MMM D YYYY"
                  ></atomic-result-date>
                </span>
              </atomic-result-fields-list>
            </atomic-result-section-bottom-metadata>
            <atomic-table-element label="Description">
              <atomic-result-section-title
                ><atomic-result-link></atomic-result-link
              ></atomic-result-section-title>
              <atomic-result-section-title-metadata>
                <atomic-field-condition
                  class="field"
                  if-defined="snrating"
                >
                  <atomic-result-rating
                    field="snrating"
                  ></atomic-result-rating>
                </atomic-field-condition>
                <atomic-field-condition
                  class="field"
                  if-not-defined="snrating"
                >
                  <atomic-result-printable-uri
                    max-number-of-parts="3"
                  ></atomic-result-printable-uri>
                </atomic-field-condition>
              </atomic-result-section-title-metadata>
              <atomic-result-section-excerpt>
                <atomic-result-text field="excerpt"></atomic-result-text>
              </atomic-result-section-excerpt>
            </atomic-table-element>
            <atomic-table-element label="author">
              <atomic-result-text field="author"></atomic-result-text>
            </atomic-table-element>
            <atomic-table-element label="source">
              <atomic-result-text field="source"></atomic-result-text>
            </atomic-table-element>
            <atomic-table-element label="language">
              <atomic-result-multi-value-text
                field="language"
              ></atomic-result-multi-value-text>
            </atomic-table-element>
            <atomic-table-element label="file-type">
              <atomic-result-text field="filetype"></atomic-result-text>
            </atomic-table-element>
          </template>
        </atomic-result-template>
      </atomic-result-list>
      <atomic-query-error></atomic-query-error>
      <atomic-no-results></atomic-no-results>
    </atomic-layout-section>
    <atomic-layout-section section="pagination">
      <!--<atomic-load-more-results></atomic-load-more-results>-->
        <atomic-pager></atomic-pager>
        <!--<atomic-results-per-page></atomic-results-per-page>-->
    </atomic-layout-section>
  </atomic-layout-section>
</atomic-search-layout>
</atomic-search-interface>
`;

export default async function decorate(block) {
  loadCSS('https://static.cloud.coveo.com/atomic/v2/themes/coveo.css');

  (async () => {
    await import('https://static.cloud.coveo.com/atomic/v2/atomic.esm.js');
    await customElements.whenDefined('atomic-search-interface');

    const searchInterface = document.querySelector(

      'atomic-search-interface',

    );

    // Initialization
    await searchInterface.initialize({
      accessToken: 'xx36c41356-a0e5-4071-bcae-d27539d778e2',
      organizationId: 'danahernonproduction1892f3fhz',
      organizationEndpoints: await searchInterface.getOrganizationEndpoints(
        'danahernonproduction1892f3fhz',
      ),
    });

    // Trigger a first search
    searchInterface.executeFirstSearch();
  })();

  block.innerHTML = searchBody;
}
