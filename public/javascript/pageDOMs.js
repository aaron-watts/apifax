const cacheDOM = {
    '100': () => {
        console.log('CACHING DOM');

        pageVDOM['100'].reel = document.querySelector('.p100 .p100__updates--reel');
        pageVDOM['100'].indices = document.querySelectorAll('.p100 .p100__contents ul li');

        console.log('CACHING COMPLETE');
    },
    '101': () => {
        pageVDOM['101'].headlines = document.querySelectorAll('.p101 .p101__headlines li span:nth-of-type(1)');
    }
}

const pageVDOM = {
    '100': {},
    '101': {}
}

console.log('Page DOMS Loaded!');