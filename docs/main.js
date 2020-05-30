import {html, render} from "./web_modules/lit-html.js";
import './web_modules/@wonkytech/tm-examples.js';

let sites = {
    'src': 'https://github.com/tmcmaster/tm-select-option',
    'pika': 'https://www.pika.dev/npm/@wonkytech/tm-select-option',
    'npm': 'https://www.npmjs.com/package/@wonkytech/tm-select-option',
    'docs': 'https://github.com/tmcmaster/tm-select-option#readme'
};

const VALUES = ['a','b','c'];
const TITLES = ['A','B','C'];
const OPTIONS = {'a': 'AAA','b':'BBB','c':'CCC'};

render(html`
    <style>
        body {
          padding: 0;
          margin: 0;
        } 
        
        tm-select-option {
            //--tm-select-option-background-color: lightblue;
        }
    </style>
    <tm-examples heading="tm-select-option" .sites="${sites}">
        <section title="Not Selected">
            <tm-select-option id="aaa" label="Testing" .values="${VALUES}"></tm-select-option>
        </section>
        <section title="Values">
            <tm-select-option label="Testing" value="b" .values="${VALUES}"></tm-select-option>
        </section>
        <section title="Values and Titles">
            <tm-select-option label="Testing" value="b" .values="${VALUES}" .titles="${TITLES}"></tm-select-option>
        </section>
         <section title="Option Map">
            <tm-select-option label="Testing" value="b" .options="${OPTIONS}" @changed="${e => console.log('New Value: ' + e.detail)}"></tm-select-option>
        </section>
        <section title="Array of Options">
            <tm-select-option label="Testing" value="b" .options="${VALUES}"></tm-select-option>
        </section>
    </tm-examples>
`, document.querySelector('body'));