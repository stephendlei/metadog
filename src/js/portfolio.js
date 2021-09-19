document.addEventListener('DOMContentLoaded', function () {
    fetch('./json/portfolio.json')
        .then(response => response.json())
        .then(data => {
            // TODO: If url has hash then load those item details

            buildGrid(data);
        })
        .catch(error => console.log(error));
});

// Builds portfolio grid
function buildGrid(data) {
    const grid = document.getElementsByClassName('grid')?.[0];
    if (!!grid) {
        data.work.forEach(el => {
            const item = document.createElement('a');
            item.href = `#${el.name}`;
            item.onclick = (_) => { showDetails(el) };
            const thumb = document.createElement('img');
            thumb.src = `assets/image/portfolio/${el.thumbnail}`;
            thumb.alt = `${el.alt}`;
            item.appendChild(thumb);
            grid.appendChild(item);
        });
    }
}

// Presents the details for a given portfolio item
function showDetails(item) {
    console.log(item);
    const details = document.getElementsByClassName('portfolio-details')?.[0];
}

