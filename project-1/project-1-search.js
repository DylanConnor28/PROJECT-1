import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@lrnwebcomponents/simple-icon/simple-icon.js";

export class Project1 extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "project-1";
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      siteUrl: { type: String }, // to input URL
      siteData: { type: Object }, // holds fetched site.json data
      errorMessage: { type: String }, // to handle errors
    };
  }

  constructor() {
    super();
    this.siteUrl = "";
    this.siteData = null;
    this.errorMessage = "";
    this.title = "Search and Visualization Engine";
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--ddd-font-navigation);
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
        }
        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }
        .overview {
          border: var(--ddd-border-md);
          padding: var(--ddd-spacing-2);
          background-color: var(--ddd-accent-2);
        }
        .card-container {
          display: flex;
          flex-wrap: wrap;
          gap: var(--ddd-spacing-2);
        }
        .card {
          flex: 1 1 calc(25% - var(--ddd-spacing-2));
          padding: var(--ddd-spacing-2);
          background-color: white;
          border: var(--ddd-border-md);
          border-radius: var(--ddd-radius-md);
          box-shadow: var(--ddd-boxShadow-sm);
        }
        .card h4 {
          font-size: var(--ddd-font-size-s);
        }
        .card:hover {
          box-shadow: var(--ddd-boxShadow-md);
        }
        .input-section {
          display: flex;
          gap: var(--ddd-spacing-1);
          margin-bottom: var(--ddd-spacing-4);
        }
        .error-message {
          color: red;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="wrapper">
        <h3>${this.title}</h3>
        <div class="input-section">
          <input
            type="url"
            placeholder="Enter site URL"
            @input="${this.updateUrl}"
            .value="${this.siteUrl}"
          />
          <button @click="${this.fetchSiteData}">Analyze</button>
        </div>
        ${this.errorMessage
          ? html`<div class="error-message">${this.errorMessage}</div>`
          : ""}
        ${this.siteData
          ? html`
              <div class="overview">
                <h4>Overview</h4>
                <p><strong>Name:</strong> ${this.siteData.name}</p>
                <p><strong>Description:</strong> ${this.siteData.description}</p>
                <p><strong>Theme:</strong> ${this.siteData.theme}</p>
                <p><strong>Created:</strong> ${this.siteData.created}</p>
                <p><strong>Last Updated:</strong> ${this.siteData.lastUpdated}</p>
                ${this.siteData.logo
                  ? html`<img src="${this.siteData.logo}" alt="Site logo" />`
                  : ""}
              </div>
              <div class="card-container">
                ${this.siteData.items.map(
                  (item) => html`
                    <div class="card">
                      <h4>${item.title}</h4>
                      <p>${item.description}</p>
                      <p><small>Last updated: ${item.lastUpdated}</small></p>
                      ${item.icon
                        ? html`<simple-icon icon="${item.icon}"></simple-icon>`
                        : ""}
                      <a href="${item.page}" target="_blank">Open Page</a>
                      <a href="${item.source}" target="_blank">Open Source</a>
                    </div>
                  `
                )}
              </div>
            `
          : ""}
      </div>
    `;
  }

  updateUrl(event) {
    this.siteUrl = event.target.value;
  }

  async fetchSiteData() {
    if (!this.siteUrl) {
      this.errorMessage = "Please enter a valid URL";
      return;
    }
    this.errorMessage = ""; // Clear any previous errors

    // Append '/site.json' if the URL does not end with it
    const url = this.siteUrl.endsWith("site.json")
      ? this.siteUrl
      : `${this.siteUrl}/site.json`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`Failed to fetch site.json from ${url}`);
      const data = await response.json();

      if (!this.validateData(data)) {
        throw new Error("Invalid site.json data format");
      }
      this.siteData = data;
    } catch (error) {
      this.errorMessage = error.message;
      this.siteData = null;
    }
  }

  validateData(data) {
    return (
      data &&
      data.name &&
      data.items &&
      Array.isArray(data.items) &&
      data.items.length > 0
    );
  }
}

customElements.define(Project1.tag, Project1);
