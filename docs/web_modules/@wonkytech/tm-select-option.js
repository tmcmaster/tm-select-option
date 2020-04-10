import { L as LitElement, c as css, h as html } from '../common/lit-element-54503d46.js';

window.customElements.define('tm-select-option', class extends LitElement {
  // noinspection JSUnusedGlobalSymbols
  static get properties() {
    return {
      options: {
        type: Object
      },
      values: {
        type: Array
      },
      labels: {
        type: Array
      },
      value: {
        type: String
      },
      label: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.options = undefined;
    this.values = undefined;
    this.titles = undefined;
    this.value = undefined;
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.selected = this.shadowRoot.getElementById('select');

    if (this.value !== undefined) {
      this.selected.value = this.value;
    }

    if (this.options) {
      this.values = [];
      this.titles = [];

      if (Array.isArray(this.options)) {
        this.values = Object.values(this.options);
        this.titles = Object.values(this.options);
      } else {
        Object.keys(this.options).map(key => {
          return {
            key: key,
            value: this.options[key]
          };
        }).sort((a, b) => a.key.localeCompare(b.value)).forEach(option => {
          this.values.push(option.key);
          this.titles.push(option.value);
        });
        this.requestUpdate();
      }
    } else {
      if (!this.titles) {
        this.titles = this.values;
        this.requestUpdate();
      }
    }
  }

  static get styles() {
    // language=CSS
    return css`
            :host {
                display: inline-block;
                box-sizing: border-box;
                background-color: rgb(244,244,244);
                padding-bottom: 5px;
            }
            main {
                display: inline-block;
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                border-bottom: lightgrey;
                padding-left: 15px;
                padding-right: 10px;
            }
            label {
                display: inline-block;
                box-sizing: border-box;
                font-size: 12px;
                color: gray;
                width: 100%;
                height: 30%;
            }
            select {
                display: inline-block;
                box-sizing: border-box;
                font-size: 16px;
                font-family: sans-serif;
                color: black;
                line-height: 1;
                //padding: .6em 1.4em .5em .8em;
                width: 100%;
                height: 50%;
                max-width: 100%;
                box-sizing: border-box;
                margin: 0;
                border: none;
                border-bottom: 1px solid #aaa;
                border-radius: 0;
                -moz-appearance: none;
                -webkit-appearance: none;
                appearance: none;
                background-color: #fff;
                linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
                background-color: rgb(244,244,244);
            }
            select::-ms-expand {
                display: none;
            }
            select:hover {
                border-color: #888;
            }
            select:focus {
                color: #222;
                outline: none;
            }
            option {
                font-weight:normal;
                color: red;
                width:100px;
                overflow:hidden;
            }
        `;
  } // noinspection JSUnusedGlobalSymbols


  render() {
    const {
      titles
    } = this;
    return html`
            <main>
                <label>${this.label}</label>
                <select id="select" @change="${e => this.selectedChanged()}" value="${this.value}">
                    <option selected disabled hidden></option>
                    ${this.titles && this.values ? html`
                        ${this.values.map((v, i) => html`<option ?selected="${v === this.value}" value="${v}">${titles[i]}</option>`)}
                    ` : html``}
                </select>            
            </main>
        `;
  }

  selectedChanged(e) {
    console.log('SELECTED: ', this.selected.value);
    this.value = this.selected.value;
    this.dispatchEvent(new CustomEvent('changed', {
      detail: this.value
    }));
  }

  getValue() {
    return this.selected.value;
  }

});
