/*
As the DOM will get stripped on each clear screen event, cacheDOM contains
a function for each page, that will cache or recache each pages DOM, and 
store it in the VDOM object. 
*/

const cacheDOM = {
    '100': () => {
        console.log('CACHING DOM');

        pageVDOM['100'].reel = document.querySelector('.p100 .p100__updates--reel');
        pageVDOM['100'].indices = document.querySelectorAll('.p100 .p100__contents ul li');

        console.log('CACHING COMPLETE');
    },
    '101': () => {
        pageVDOM['101'].headlines = document.querySelectorAll('.p101 .p101__headlines li span:nth-of-type(1)');
    },
    '102': () => {
        pageVDOM['102-11'].headline = document.querySelector('.p102-11 .p102-11__headline');
        pageVDOM['102-11'].story = document.querySelector('.p102-11 .p102-11__story');
    },
    /*
    103-111 are generated in buildnews pages function in pagefunctions.js
    */
}

/*
VDOM stores each pages DOM cache as object properties, which allows for
convenient reassignment after a clearscreen event.
All values are initially empty and are generated on loadscreen event
in the programme object in app.js.
Some properties manage dom for several pages that share layouts such as
the news sory pages (102 - 111)
*/
const pageVDOM = {
    '100': {},
    '101': {},
    '102-11': {},
}

console.log('Page DOMS Loaded!');