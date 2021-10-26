// dev
const loadPage = new Number(198).toString();

const header = document.querySelector('header');
const clockInterface = header.children[2];
const dateInterface = [...[...header.children[1].children].splice(1)];

const channel = header.children[0];
const scans = header.children[1];
const scannerInterface = scans.children[0];

const mute = document.querySelectorAll('svg.tv');

/*
A clock object to handle date/time in header and to provide a counter
for timed events such as slide changes
*/
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

        // create timer event
        if (clock.ticker % 15 === 0) {
            clock.event = new CustomEvent('turnpage', {
                bubbles: false,
                cancelable: false,
                detail: null
            });

            document.dispatchEvent(clock.event);
        }
    }
};

setInterval(clock.tick, 1000);

/*
The broadcasting object - to fill the role of the TV and receiver
*/
const programme = {
    currentPage: '100',
    display: {
        /*
        Remove page contents from display, scanner/header is preserved
        */
        clearScreen: () => {
            for (let listener in pageListeners[programme.currentPage]) {
                pageListeners[programme.currentPage][listener][0].removeEventListener(
                    pageListeners[programme.currentPage][listener][1],
                    pageListeners[programme.currentPage][listener][2]
                )
            }
            document.querySelectorAll('main, footer').forEach(i => { i.remove() });
            delete programme.currentSlide;
        },
        /*
        - Load relevant page template into document
        - reinitialise any relevant DOM that will have been lost in a clear screen
        - reinitialise page functions
        - reinitialise page's event listeners
        */
        loadScreen: (pageNumber) => {
            const pageInt = parseInt(pageNumber);

            // may use a switch case later when there are more sets of 'alike' pages
            let mainClass = pageInt >= 102 && pageInt <= 111 ? `102-11` : pageNumber;

            const body = document.querySelector('body');
            const main = document.createElement('main');
            main.innerHTML = pageTemplates[pageNumber];
            main.classList.add(`p${mainClass}`);
            body.appendChild(main);

            cacheDOM[pageNumber]();

            for (let fn in pageFunctions[pageNumber]) {
                pageFunctions[pageNumber][fn]();
            }

            /*
            PageListeners are constructed in arrays of:
            [ event host, event name, callback ]
            Host describes the location of the event, i.e. window, document, etc
            */
            for (let listener in pageListeners[pageNumber]) {
                pageListeners[pageNumber][listener][0].addEventListener(
                    pageListeners[pageNumber][listener][1],
                    pageListeners[pageNumber][listener][2]
                )
            }
        }
    },
    scanner: {
        /*
        The app pretends that it cannot jump straight into the page (teehee)
        to emulate behaviour of teletext scanning for a new channel
        Also serves as a way to annoy site visitors and reduce traffic, though
        this was never my intention
        */
        climb: (pageN, count = 0) => {
            if (count < 100) {
                const incrementer = Math.floor(Math.random() * 4) + 4;
                count += incrementer;

                scannerInterface.innerText =
                    `${pageN[0]}${(parseInt(scannerInterface.innerText) + incrementer).toString().slice(1)}`;
                    
                if (count > 100) scannerInterface.innerText = pageN;

                programme.scanner.timeout = setTimeout(() => {
                    programme.scanner.climb(pageN, count);
                }, 300)
            } else {
                scans.classList.remove('green');

                if (pageN in pageTemplates) {
                    scannerInterface.innerText = pageN;
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
        /*
        A quick class change in the header before the yummy recursion
        - set scanner number to pageNumber + 1
        - clear any existing scan timeout to prevent bugs
        - initiate scanner.climb method
        */
        scan: (pageNumber) => {
            scans.classList.add('green');
            scannerInterface.innerText = (parseInt(pageNumber) + 1).toString();
            if (programme.scanner.timeout) clearTimeout(programme.scanner.timeout);
            programme.scanner.climb(pageNumber);
        }
    },
    /*
    Manages the channel input event listener and sends signal to 
    scanner.scan when 3 digits entered
    */
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
    },
    mute: (show = true) => {
        if (show) {
            for (let svg of mute) {
                svg.classList.remove('hidden');
                programme.muteTimeout = setTimeout(() => {
                    programme.mute(false);
                }, 3000)
            }
        } else {
            for (let svg of mute) {
                svg.classList.add('hidden');
            }
        }
    }
};

window.addEventListener('keypress', (evt) => {
    if (!isNaN(evt.key)) {
        programme.channelInput(evt.key);
    }

    // toggle mute on audio
    if (audio && evt.key === 'm') {
        audio.muted = !audio.muted;
        programme.mute();
    }
});

let apidata;
let pageTemplates;

Promise.all([fetch('/pages'), fetch('/data')])
    .then(res => {
        return Promise.all([res[0].json(), res[1].json()])
    })
    .then(data => {
        pageTemplates = data[0];
        apidata = data[1];

        buildNewsPages(apidata.news); // pageFunctions.js

        programme.display.loadScreen(loadPage);
    })
    .catch(err => {
        console.log(err.message);
    })

const keypad = document.querySelector('div.keypad');
const keypadButtons = [...keypad.children];

keypadButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (audio && button.classList.contains('mute')) {
            audio.muted = !audio.muted;
            programme.mute();
        } else {
            programme.channelInput(button.innerText);
        }
    })
})

document.addEventListener('click', (evt) => {
    if (!keypadButtons.includes(evt.target) && 
    !keypadButtons.includes(evt.target.parentElement)) {
        keypad.classList.toggle('hide');
        const btnDisabled = keypad.classList.contains('hide');
        
        keypadButtons.forEach(button => {
            button.disabled = btnDisabled;
        });
    }
})