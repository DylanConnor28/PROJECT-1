import { LitElement, html, css } from "lit";

export class NasaImage extends LitElement {
  static get properties() {
    return {
      source: { type: String },
      title: { type: String },
      alt: { type: String },
      secondary_creator: { type: String },
    };
  }

  constructor() {
    super();
    this.source = '';
    this.title = '';
    this.alt = '';
    this.secondary_creator = '';
  }

  static get styles() {
    return css`
      .card {
        width: 240px;
        height: auto;
        display: inline-block;
        padding: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        text-align: center;
      }

      .card:hover {
        background-color: #f0f0f0;
      }

      img {
        width: 100%;
        height: auto;
      }

      .info {
        font-size: 14px;
        font-weight: bold;
      }
    `;
  }

  render() {
    return html`
      <div
        class="card"
        tabindex="0"
        @click="${this._openImage}"
        @keydown="${this._handleKeydown}"
      >
        <img src="${this.source}" alt="${this.alt}" />
        <div class="info">${this.title}</div>
        <div class="info">${this.secondary_creator}</div>
      </div>
    `;
  }

  _openImage() {
    window.open(this.source, "_blank");
  }

  _handleKeydown(event) {
    if (event.key === "Enter") {
      this._openImage();
    }
  }

  static get tag() {
    return "nasa-image";
  }
}

customElements.define(Project.tag, ProjectImage);
