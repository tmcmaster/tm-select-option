import {html, render} from "./web_modules/lit-html.js";
import './web_modules/@wonkytech/tm-examples.js';

let sites = {
    'src': 'https://github.com/tmcmaster/tm-select-option',
    'pika': 'https://www.pika.dev/npm/@wonkytech/tm-select-option',
    'npm': 'https://www.npmjs.com/package/@wonkytech/tm-select-option',
    'docs': 'https://github.com/tmcmaster/tm-select-option#readme'
};

const OPTIONS = ['a','b','c'];

render(html`
    <style>
        body {
          padding: 0;
          margin: 0;
        } 
    </style>
    <tm-examples heading="tm-select-option" .sites="${sites}">
        <section title="Not Selected">
            <script>
                const OPTIONS = ['a','b','c'];
            </script>
            <tm-select-option label="Testing" .options="${OPTIONS}"></tm-select-option>
        </section>
        <section title="Selected">
            <script>
                const OPTIONS = ['a','b','c'];
            </script>
            <tm-select-option label="Testing" value="b" .options="${OPTIONS}"></tm-select-option>
        </section>
    </tm-examples>
`, document.querySelector('body'));