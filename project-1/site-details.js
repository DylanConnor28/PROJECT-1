import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class SiteDetails extends DDDSuper(I18NMixin(LitElement)) {
  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.logo = '';
    this.dateCreated = '';
    this.dateUpdated = '';
    this.hexCode = '';
    this.theme = '';
    this.icon = '';
    this.url = '';
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      logo: { type: String },
      dateCreated: { type: String },
      dateUpdated: { type: String },
      hexCode: { type: String },
      theme: { type: String },
      icon: { type: String },
      url: { type: String },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
        }

        .container {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: var(--ddd-spacing-3, 12px);
          flex-wrap: wrap;
          width: fit-content;
          padding: var(--ddd-spacing-5, 20px);
          font-family: var(--ddd-font-primary, roboto);
          font-size: 16px;
          color: var(--ddd-theme-primary);
          background-color: var(--site-hex-code, --ddd-theme-accent);
        }

        .text-container {
          font-weight: 400;
        }

        .title {
          font-size: 24px;
          font-weight: var(--ddd-font-weight-bold, bold);
          text-align: center;
          margin-bottom: var(--ddd-spacing-4);
        }

        .container img {
          display: block;
          height: 150px;
        }

        .title a {
          color: unset;
        }

        .label {
          width: 120px;
          font-weight: bold;
        }

        a[target="_blank"]::after {
          content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==);
          vertical-align: text-top;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="container" style="--site-hex-code: ${this.hexCode};">
        <div class="image-container">
          <div class="logo" ?hidden="${this.logo === ''}">
            <img src="${this.logo}" alt="${this.logo}" />
          </div>
        </div>

        <div class="text-container">
          <div class="title" ?hidden="${this.title === ''}">
            <a href="${this.url}" target="_blank" rel="noopener noreferrer">
              <span class="icon" ?hidden="${this.icon === ''}">
                <simple-icon icon="${this.icon}"></simple-icon>
              </span>
              ${this.title}
            </a>
          </div>

          <div ?hidden="${this.description === ''}">
            <div class="info-row">
              <span class="label"><strong>Description</strong></span>
              <span>: ${this.description}</span>
            </div>
          </div>

          <div ?hidden="${this.dateCreated === ''}">
            <div class="info-row">
              <span class="label"><strong>Date created</strong></span>
              <span>: ${this.dateCreated}</span>
            </div>
          </div>

          <div ?hidden="${this.dateUpdated === ''}">
            <div class="info-row">
              <span class="label"><strong>Last updated</strong></span>
              <span>: ${this.dateUpdated}</span>
            </div>
          </div>

          <div ?hidden="${this.theme === ''}">
            <div class="info-row">
              <span class="label"><strong>Theme</strong></span>
              <span>: ${this.theme}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static get tag() {
    return "site-details";
  }
}

customElements.define(SiteDetails.tag, SiteDetails);
