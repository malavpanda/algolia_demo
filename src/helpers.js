export function hitTemplate(hit, { html, components }) {
  return html`
    <div class="hit">
      <div class="hit-image">
        <img src="${hit.Poster_Url}" />
      </div>
      <div class="hit-content">
        <div class="hit-name">
          ${components.Highlight({ attribute: "Title", hit })}
        </div>
        <div class="hit-description">
          ${components.Snippet({ attribute: "Overview", hit })}
        </div>
        <div class="hit-description">
          ${components.Snippet({ attribute: "Genre", hit })}
        </div>
        <div class="hit-description">
          ${components.Snippet({ attribute: "Release_Date", hit })}
        </div>
      </div>
    </div>
  `;
}
