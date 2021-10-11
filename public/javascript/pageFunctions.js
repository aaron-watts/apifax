const pageFunctions = {
    '100': {
        loadHeadline: () => {
            const reel = document.querySelector('.p100 .p100__updates--reel');

            reel.innerText = apidata.news[0].title.slice(0,30);
        }
    }
}