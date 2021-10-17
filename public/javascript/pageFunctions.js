const pageFunctions = {
    '100': {
        loadHeadline: () => {
            // const reel = document.querySelector('.p100 .p100__updates--reel');
            const headline = apidata.news[0].title;

            // reel.innerText = apidata.news[0].title.slice(0,30);
            if (headline.length > 32) {
                pageVDOM['100'].reel.innerText = `${headline.slice(0, 32)}...P102`
            }
        },
        contentTrails: () => {
            const trailLength = window.innerWidth < 580 ? 29 : 15;

            for (let page of pageVDOM['100'].indices) {
                const pageName = page.children[0].innerText;
                const pageNumber = page.children[1];
                
                pageNumber.innerText = `${'.'.repeat(trailLength - pageName.length - 1)}${pageNumber.innerText.replaceAll('.','')}`;

            }
        }
    },
    '101': {
        loadHeadlines: () => {
            const lines = 2;
            for (let i = 0; i < pageVDOM['101'].headlines.length; i++) {
                // if (apidata.news[i].title.length > 32 * lines) {
                //     pageVDOM['101'].headlines[i].innerText = `${apidata.news[i].title.slice(0, (32 * lines) - 3)}...`;
                // } else {
                //     pageVDOM['101'].headlines[i].innerText = apidata.news[i].title;
                // }
                pageVDOM['101'].headlines[i].innerText = apidata.news[i].title;

            }
        }
    }
}

console.log('Page Functions Loaded!');