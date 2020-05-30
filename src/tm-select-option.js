import {html} from 'lit-html';
import {LitElement, css} from 'lit-element';

window.customElements.define('tm-select-option', class extends LitElement {

    // noinspection JSUnusedGlobalSymbols
    static get properties() {
        return {
            options: {type: Object},
            values: {type: Array},
            labels: {type: Array},
            value: {type: String},
            label: {type: String}
        }
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
    }

    // connectedCallback() {
    //     super.connectedCallback();
    //     this.selected = this.shadowRoot.getElementById('select');
    // }

    updated(_changedProperties) {
        super.updated(_changedProperties);
        console.log('TM-SELECT-UPDATE - updated', _changedProperties);

        let requiresUpdate = false;

        if (_changedProperties.has('titles') && this.titles && !this.options) {
            if (!_changedProperties.has('values') || !this.values) {
                this.values = this.titles;
                requiresUpdate = true;
                console.log('TM-SELECT-OPTION - updated values with titles');
            }
        }

        if (_changedProperties.has('values') && this.values && !this.options && !this.titles) {
            if (!_changedProperties.has('titles') || !this.titles) {
                this.titles = this.values;
                requiresUpdate = true;
                console.log('TM-SELECT-OPTION - updated titles with values');
            }
        }

        if (_changedProperties.has('options') && this.options) {
            console.log('TM-SELECT-UPDATE - options updated', this.options, _changedProperties.get('options'));

            if (Array.isArray(this.options)) {
                this.values = Object.values(this.options);
                this.titles = Object.values(this.options);
                console.log('TM-SELECT-OPTION - updated titles and values with options array');
            } else {
                const values = [];
                const titles = [];
                Object.keys(this.options).map(key => {
                    return {
                        key: key,
                        value: this.options[key]
                    };
                }).sort((a, b) => a.key.localeCompare(b.value)).forEach(option => {
                    values.push(option.key);
                    titles.push(option.value);
                });
                this.values = values;
                this.titles = titles;

                console.log('TM-SELECT-OPTION - updated titles and values with options map', this.options);
            }
            requiresUpdate = true;
            console.log('TM-SELECT-OPTION - DEBUG', this.titles, this.values, this.options);
        }

        if (_changedProperties.has('value') && this.selected) {
            this.selected.value = (this.value ? this.value : '');
            console.log('TM-SELECT-OPTION - updated selected value');
            requiresUpdate = true;
        }

        if (_changedProperties.has('selected') && this.selected) {
            this.selected.value = (this.value ? this.value : '');
            console.log('TM-SELECT-OPTION - updated selected value');
            requiresUpdate = true;
        }

        if (requiresUpdate) {
            console.log('TM-SELECT-OPTION - Requesting UI updated.');
            this.requestUpdate();
        }
    }


    static get styles() {
        // language=CSS
        return css`
            :host {
                --background-color: var(--tm-select-option-background-color, inherit);

                display: inline-block;
                box-sizing: border-box;
                background-color: var(--background-color);
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
                background-color: inherit;
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
                background-color: inherit;
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
    }

    // noinspection JSUnusedGlobalSymbols
    render() {
        const {titles} = this;
        return html`
            <main>
                <label>${this.label}</label>
                <select id="select" @change="${e => this.selectedChanged()}" value="${this.value}">
                    <option selected disabled hidden></option>
                    ${(this.titles && this.values ? html`
                        ${this.values.map((v,i) => html`<option ?selected="${v === this.value}" value="${v}">${titles[i]}</option>`)}
                    ` : html``)}
                </select>            
            </main>
        `;
    }

    selectedChanged(e) {
        console.log('SELECTED: ', this.selected.value);
        this.value = this.selected.value;
        this.dispatchEvent(new CustomEvent('changed', {detail: this.value}));
    }

    getValue() {
        return this.selected.value;
    }

});
