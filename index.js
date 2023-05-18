
const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('keyup', function () {
    const searchTerm = searchInput.value;
    const results = [];

    fetch('./classes.json')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.courses.length; i++) {
                const obj = data.courses[i];
                for (let key in obj) {
                    if (obj[key].toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                        results.push(obj);
                        break;
                    }
                }
            }

            document.querySelector('.courses').innerHTML = '';
            for (let i = 0; i < results.length; i++) {
                const obj = results[i];
                createHtmlDom(obj)
            }
        })
        .catch(error => console.error(error));
});
fetch('./classes.json')
    .then(response => response.json())
    .then(data => {
        document.querySelector('.number-of-courses').innerText = data.courses.length;
        data.courses.map((x) => {
            createHtmlDom(x)

        })
        data.favourites.map((x) => {
            const div = document.createElement("div");
            const imageDiv = document.createElement("div");
            const pic = document.createElement("img");
            const details = document.createElement('div')
            const name = document.createElement("h1");
            const author = document.createElement("p");
            const stars = document.createElement('div');
            imageDiv.appendChild(pic)
            div.className += "favourite-card"
            stars.className += 'rating';
            details.className += 'details';
            imageDiv.className+='image-favourite-card'
            details.appendChild(name)
            details.appendChild(rating(x, stars))
            div.appendChild(imageDiv)
            div.appendChild(details)
            pic.src = `${x.imageUrl}`;
            name.className += 'text-overflow-hide';
            name.innerText = x.name;
            author.innerText = `Author : ${x.author}`;
            document.querySelector('.favourite-items').appendChild(div);
        })
        
    })
function createHtmlDom(values) {
    const div = document.createElement("div");
    const pic = document.createElement("img");
    const details = document.createElement('div')
    const topic = document.createElement("p");
    const name = document.createElement("h1");
    const author = document.createElement("p");
    const stars = document.createElement('div');
    div.className += "course-card"
    stars.className += 'rating';
    details.className += 'details-container';
    div.addEventListener('click', function () {
        const itemId = values.name;
        const detailsUrl = `./pages/details/details.html?id=${itemId}`;
        window.location.href = detailsUrl;
    });
    details.appendChild(topic)
    details.appendChild(name)
    details.appendChild(rating(values, stars))
    details.appendChild(author)
    topic.className += 'topic text-overflow-hide';
    name.className += 'text-overflow-wrap';
    author.className += 'author-name text-overflow-hide';
    div.appendChild(pic)
    div.appendChild(details)
    pic.src = values.imageUrl;
    topic.innerText = values.topic;
    name.innerText = values.name;
    author.innerText = `Author : ${values.author}`;
    pic.setAttribute('width', '400px');
    pic.setAttribute('height', '200px');
    document.querySelector('.courses').appendChild(div)
}