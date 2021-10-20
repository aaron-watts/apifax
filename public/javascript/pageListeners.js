const pageListeners = {
    '100': {
        contentTrails: [window, 'resize', pageFunctions['100'].contentTrails]
    },

    '400': {
        turnPage: [document, 'turnpage', pageFunctions['400'].loadSummary]
    }
}

// document.addEventListener('turnpage', () => {
//     console.log('ALARM!!');
// })

console.log('Page Listeners Loaded!');