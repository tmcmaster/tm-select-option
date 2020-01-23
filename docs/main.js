import {html, render} from "./web_modules/lit-html.js";

let sites = {
    'src': 'https://github.com/tmcmaster/tm-select-option',
    'pika': 'https://www.pika.dev/npm/@wonkytech/tm-select-option',
    'npm': 'https://www.npmjs.com/package/@wonkytech/tm-select-option',
    'docs': 'https://github.com/tmcmaster/tm-select-option#readme'
};

render(html`
    <style>
        body {
          padding: 0;
          margin: 0;
        } 
    </style>
    <tm-examples heading="tm-select-option" .sites="${sites}">
        <section title="Example">
            <tm-select-option></tm-select-option>
        </section>
    </tm-examples>
`, document.querySelector('body'));