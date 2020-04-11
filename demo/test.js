import {html, render} from "../docs/web_modules/lit-html";

import '../src/tm-select-option.js';

const VALUES = ['a','b','c'];
const TITLES = ['A','B','C'];
const OPTIONS = {'a': 'AAA','b':'BBB','c':'CCC'};

setTimeout(() => {
    const element = document.getElementById('test');
    element.titles = TITLES;
    console.log('Done');
}, 2000);
setTimeout(() => {
    const element = document.getElementById('test');
    element.options = OPTIONS;
    console.log('Done');
}, 10000);

render(html`
    <style>
        body {
          padding: 0;
          margin: 0;
        } 
    </style>
    
    <tm-select-option id="test" label="Testing" value="b" .values="${VALUES}"></tm-select-option>
`, document.querySelector('body'));