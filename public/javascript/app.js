const header = document.querySelector('header');
const clockInterface = header.children[2];
const dateInterface = [...[...header.children[1].children].splice(1)];

const channel = header.children[0];
const scans = header.children[1];
const scannerInterface = scans.children[0];

// clock object to handle date/time in header and to provide a counter
// for scroll events where multiple pages exist
const clock = {
    ticker: 0,
    tick: () => {
        const now = new Date();
        const nowString = now.toDateString();
        dateInterface[0].innerText = nowString.substring(0, 3);
        dateInterface[1].innerText = nowString.substring(8, 10);
        dateInterface[2].innerText = nowString.substring(4, 7);

        clockInterface.children[0].innerText = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
        clockInterface.children[1].innerText = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
        clockInterface.children[2].innerText = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();

        clock.ticker++;
        if (clock.ticker > 60) clock.ticker = 1;
    }
};

setInterval(clock.tick, 1000);

const programme = {
    currentPage: '100',
    display: {
        clearScreen: () => {
            for (let listener in pageListeners[programme.currentPage]) {
                window.removeEventListener(
                    pageListeners[programme.currentPage][listener][0],
                    pageListeners[programme.currentPage][listener][1]
                )
            }
            document.querySelectorAll('main, footer').forEach(i => { i.remove() });
        },
        loadScreen: (pageNumber) => {
            const body = document.querySelector('body');
            const main = document.createElement('main');
            main.innerHTML = pageTemplates[pageNumber];
            main.classList.add(`p${pageNumber}`);
            body.appendChild(main);

            // cache dom for function reference
            cacheDOM[pageNumber]();
            // execute functions and define for event listeners
            for (let fn in pageFunctions[pageNumber]) {
                pageFunctions[pageNumber][fn]();
            }
            // add eventlisteners
            for (let listener in pageListeners[pageNumber]) {
                window.addEventListener(
                    pageListeners[pageNumber][listener][0],
                    pageListeners[pageNumber][listener][1]
                )
            }
        }
    },
    scanner: {
        climb: (pageN) => {
            if (scannerInterface.innerText !== pageN) {
                if (!(parseInt(scannerInterface.innerText) % parseInt(`${pageN[0]}99`))) {
                    scannerInterface.innerText = (parseInt(scannerInterface.innerText) - 99).toString();
                } else {
                    scannerInterface.innerText = (parseInt(scannerInterface.innerText) + 1).toString();
                }

                setTimeout(() => {
                    programme.scanner.climb(pageN);
                }, 300)
            } else {
                scans.classList.remove('green');

                console.log('SCAN FINISHED!');
                // loadPage(pageNumber);
                if (pageN in pageTemplates) {
                    console.log('PAGEN IN PAGES');
                    programme.currentPage = pageN;
                    programme.display.clearScreen();
                    programme.display.loadScreen(pageN);
                } else {
                    scannerInterface.innerText = programme.currentPage;
                    channel.innerText = programme.currentPage;
                }
            }
            return;
        },
        scan: (pageNumber) => {
            scans.classList.add('green');

            // make the numbers match the hundred digit
            scannerInterface.innerText = (parseInt(pageNumber) + 1).toString();

            // starting one above the hundred digit go up until loops to this number
            programme.scanner.climb(pageNumber);
        }
    },
    channelInput: (n) => {
        if (channel.innerText.indexOf('-') >= 0) {
            let pageString = channel.innerText.replace('-', n);
            channel.innerText = pageString;
        } else {
            channel.innerText = '---';
            programme.channelInput(n);
        }

        if (channel.innerText.indexOf('-') === -1) {
            programme.scanner.scan(channel.innerText);
        }
    }
};

window.addEventListener('keypress', (evt) => {
    if (!isNaN(evt.key)) {
        programme.channelInput(evt.key);
    }
});

let apidata;
let pageTemplates;
fetch('/pages')
    .then(res => res.json())
    .then(data => {
        pageTemplates = data;
        // programme.display.loadScreen('100');
        fetch('/data')
            .then(res => res.json())
            .then(data => {
                apidata = data;
                programme.display.loadScreen('101');
            })
    })
