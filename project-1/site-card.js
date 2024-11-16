import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class SiteCard extends DDDSuper(I18NMixin(LitElement)) {
  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.imageSrc = '';
    this.dateUpdated = '';
    this.pageLink = '';
    this.pageHtml = '';
    this.readTime = '';
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      imageSrc: { type: String },
      dateUpdated: { type: String },
      pageLink: { type: String },
      pageHtml: { type: String },
      readTime: { type: String },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
        }

        .card-container {
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-3, 20px);
          flex-wrap: wrap;
          min-height: 450px;
          padding: var(--ddd-spacing-5, 20px);
          border: var(--ddd-border-sm, black solid 3px);
          font-family: var(--ddd-font-primary, roboto);
          font-size: 16px;
          color: var(--ddd-theme-primary);
          background-color: var(--site-hex-code, --theme-accent);
        }

        .text-container {
          font-weight: 400;
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-3, 20px);
        }

        .title {
          font-size: 18px;
          font-weight: var(--ddd-font-weight-bold, bold);
          text-align: center;
        }

        .card-container img {
          display: block;
          width: 250px;
          max-height: 250px;
          object-fit: contain;
          margin: auto;
        }

        a div {
          color: var(--ddd-theme-primary);
        }

        a[target="_blank"].text::after {
          content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==);
          margin: 0 3px 0 5px;
        }

        .info-row {
          display: flex;
          flex-direction: column;
        }

        .label {
          width: 120px;
          font-weight: bold;
        }

        .title a {
          color: unset;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="card-container" style="--site-hex-code: ${this.hexCode};">
        <div class="title" ?hidden="${!this.title}">
          <a class="text" href="${this.pageLink}" target="_blank" rel="noopener noreferrer">
            ${this.title}
          </a>
        </div>

        <div class="image-container" ?hidden="${!this.imageSrc}">
          <a href="${this.imageSrc}" target="_blank" rel="noopener noreferrer">
            <img src="${this.imageSrc}" alt="${this.imageSrc}">
          </a>
        </div>

        <div class="text-container">
          <div ?hidden="${!this.description}">
            <div class="info-row">
              <span class="label"><strong>Description</strong></span>
              <span>${this.description}</span>
            </div>
          </div>

          <div ?hidden="${!this.dateUpdated}">
            <div class="info-row">
              <span class="label"><strong>Last updated</strong></span>
              <span>${this.dateUpdated}</span>
            </div>
          </div>

          <div ?hidden="${!this.readTime}">
            <div class="info-row">
              <span class="label"><strong>Read time</strong></span>
              <span>${this.readTime} minutes</span>
            </div>
          </div>

          <div ?hidden="${!this.pageHtml}">
            <div class="info-row">
              <a class="text" href="${this.pageHtml}" target="_blank" rel="noopener noreferrer"><strong>View page source</strong></a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static get tag() {
    return "site-card";
  }
}

customElements.define(SiteCard.tag, SiteCard);
