document.addEventListener('DOMContentLoaded', function () {
    fetch('./json/portfolio.json')
        .then(response => response.json())
        .then(data => {
            gridData = data.work;
            // If url has hash then load those item details
            const pageName = window.location.hash.substr(1);
            if (pageName) {
                const pageIndex = data.work.findIndex(item => item.name === pageName);
                const pageItem = data.work[pageIndex];
                showDetails(pageItem, pageIndex);
                displayNavCheck(pageIndex);
            }
            buildGrid(data);
        })
        .catch(error => console.log(error));
});

const imageBasePath = 'assets/image/portfolio/'
let gridData;

// Builds portfolio grid
function buildGrid(data) {
    const grid = document.getElementsByClassName('grid')?.[0];
    if (!!grid) {
        data.work.forEach((item, index) => {
            const gridItemEl = document.createElement('a');
            gridItemEl.href = `#${item.name}`;
            gridItemEl.onclick = (_) => { showDetails(item, index); displayNavCheck(index); };
            const thumb = document.createElement('img');
            thumb.src = imageBasePath + item.thumb_src;
            thumb.alt = `${item.thumb_alt}`;
            gridItemEl.appendChild(thumb);
            grid.appendChild(gridItemEl);
        });
    }
}

// Presents the details for a given portfolio item
function showDetails(item, index) {
    const detailsSection = document.getElementsByTagName('section')?.[0];
    if (detailsSection) {
        detailsSection.classList.remove('hide');
    }
    const detailsEl = document.getElementsByClassName('portfolio-details')?.[0];
    const image = detailsEl.getElementsByClassName('image')?.[0];
    const title = detailsEl.getElementsByClassName('title')?.[0];
    const subtitle = detailsEl.getElementsByClassName('subtitle')?.[0];

    detailsEl.setAttribute('index', index);

    image.src = imageBasePath + item.full_src;
    image.alt = item.full_alt;
    title.innerHTML = item.title;
    subtitle.innerHTML = item.subtitle;

    if (item.orientation && item.orientation === 'landscape') {
        image.classList.add('landscape');
    } else {
        image.classList.remove('landscape');
    }

    const portfolioGridEl = document.getElementsByClassName('portfolio')?.[0];
    portfolioGridEl.classList.add('below')

    setTimeout(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, 100);
}

function onPrev() {
    const currIndex = Number(document.getElementsByClassName('portfolio-details')?.[0]?.getAttribute('index'));
    if (currIndex !== NaN && currIndex !== null && currIndex != undefined) {
        showDetails(gridData[currIndex - 1], currIndex - 1);
        window.location.hash = gridData[currIndex - 1].name;
    }
    displayNavCheck(currIndex - 1);
}

function onNext() {
    const currIndex = Number(document.getElementsByClassName('portfolio-details')?.[0]?.getAttribute('index'));
    if (currIndex !== NaN && currIndex !== null && currIndex != undefined) {
        showDetails(gridData[currIndex + 1], currIndex + 1);
        window.location.hash = gridData[currIndex + 1].name;
    }
    displayNavCheck(currIndex + 1);
}

function displayNavCheck(index) {
    prevButton = document.getElementsByClassName('portfolio-nav')[0].getElementsByClassName('prev')[0];
    nextButton = document.getElementsByClassName('portfolio-nav')[0].getElementsByClassName('next')[0];
    separator = document.getElementsByClassName('portfolio-nav')[0].getElementsByClassName('separator')[0];
    prevButton.classList.remove('hide');
    nextButton.classList.remove('hide');
    separator.classList.remove('hide');
    if (index === 0) {
        prevButton.classList.add('hide');
        separator.classList.add('hide');
    } else if (index === gridData.length - 1) {
        nextButton.classList.add('hide');
        separator.classList.add('hide');
    }
}

