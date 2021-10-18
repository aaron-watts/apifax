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
        pageVDOM['102-12'].headline = document.querySelector('.p102-12 .p102-12__headline');
        pageVDOM['102-12'].story = document.querySelector('.p102-12 .p102-12__story');
    },
}

for (let i = 3; i <= 12; i++) {
    let index = i < 10 ? `0${i}` : i;
    cacheDOM[`1${index}`] = cacheDOM['102']
}

const pageVDOM = {
    '100': {},
    '101': {},
    '102-12': {},
}

console.log('Page DOMS Loaded!');