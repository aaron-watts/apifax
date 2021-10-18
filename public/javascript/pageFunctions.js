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

                pageNumber.innerText = `${'.'.repeat(trailLength - pageName.length - 1)}${pageNumber.innerText.replaceAll('.', '')}`;

            }
        }
    },
    '101': {
        loadHeadlines: () => {
            for (let i = 0; i < pageVDOM['101'].headlines.length; i++) {
                pageVDOM['101'].headlines[i].innerText = apidata.news[i].title;

            }
        }
    },
    // '102': {
    //     loadStory: (i = 0) => {
    //         // const knowThyself = this
    //         pageVDOM['102-12'].headline.innerText = apidata.news[i].title;
    //         pageVDOM['102-12'].story.innerText = apidata.news[i].description;
    //     }
    // },
}

// for (let i = 3; i <= 12; i++) {
    // let index = i < 10 ? `0${i}` : i;

    // pageFunctions[`1${index}`] = Object.create(pageFunctions['102']);
    // pageFunctions[`1${index}`].loadStory = pageFunctions['102'].loadStory(i - 2);

    // pageFunctions[`1${index}`] = pageFunctions['102'];
    // delete pageFunctions[`1${index}`].loadStory;
    // pageFunctions[`1${index}`].loadStory = pageFunctions['102'].loadStory(i-2);
// console.log(delete pageFunctions[`1${index}`].loadStory);

    // pageFunctions[`1${index}`].loadStory = () => {
    //         pageVDOM['102-12'].headline.innerText = apidata.news[arrayIndex].title;
    //         pageVDOM['102-12'].story.innerText = apidata.news[arrayIndex].description;
    //     }
// }

console.log('Page Functions Loaded!');