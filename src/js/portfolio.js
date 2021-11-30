document.addEventListener('DOMContentLoaded', function () {
    fetch('./json/portfolio.json')
        .then(response => response.json())
        .then(data => {
            // If url has hash then load those item details
            const pageName = window.location.hash.substr(1);
            if (pageName) {
                const pageItem = data.work.find(item => item.name === pageName);
                showDetails(pageItem);
            }

            buildGrid(data);
        })
        .catch(error => console.log(error));
});

const imageBasePath = 'assets/image/portfolio/'

// Builds portfolio grid
function buildGrid(data) {
    const grid = document.getElementsByClassName('grid')?.[0];
    if (!!grid) {
        data.work.forEach(item => {
            const gridItemEl = document.createElement('a');
            gridItemEl.href = `#${item.name}`;
            gridItemEl.onclick = (_) => { showDetails(item) };
            const thumb = document.createElement('img');
            thumb.src = imageBasePath + item.thumb_src;
            thumb.alt = `${item.alt_src}`;
            gridItemEl.appendChild(thumb);
            grid.appendChild(gridItemEl);
        });
    }
}

// Presents the details for a given portfolio item
function showDetails(item) {
    const detailsSection = document.getElementsByTagName('section')?.[0];
    if (detailsSection) {
        detailsSection.classList.remove('hide');
    }
    const detailsEl = document.getElementsByClassName('portfolio-details')?.[0];
    const image = detailsEl.getElementsByClassName('image')?.[0];
    const title = detailsEl.getElementsByClassName('title')?.[0];
    const subtitle = detailsEl.getElementsByClassName('subtitle')?.[0];

    image.src = imageBasePath + item.full_src;
    title.innerHTML = item.title;
    subtitle.innerHTML = item.subtitle;

    if (item.orientation && item.orientation === 'landscape') {
        image.classList.add('landscape');
    } else {
        image.classList.remove('landscape');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
}

