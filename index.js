
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
            div.className += "favourite-card overflow-hidden m-1 rounded"
            stars.className += 'rating d-flex';
            details.className += 'details py-2';
            imageDiv.className+='image-favourite-card'
            details.appendChild(name)
            details.appendChild(rating(x, stars))
            div.appendChild(imageDiv)
            div.appendChild(details)
            pic.src = `${x.imageUrl}`;
            pic.className+='object-fit-cover w-100';
            name.className += 'overflow-hidden text-nowrap text-truncate m-0';
            name.innerText = x.name;
            author.innerText = `Author : ${x.author}`;
            document.querySelector('.favourite-items').appendChild(div);
        })
        
    })
function createHtmlDom(values) {
    const courseCardContainer = document.createElement("div");
    const div = document.createElement("div");
    const pic = document.createElement("img");
    const details = document.createElement('div')
    const topic = document.createElement("p");
    const name = document.createElement("h1");
    const author = document.createElement("p");
    const stars = document.createElement('div');
    div.className += "course-card card rounded overflow-hidden shadow-sm"
    stars.className += 'rating d-flex';
    details.className += 'details-container card-body';
    div.addEventListener('click', function () {
        const itemId = values.name;
        const detailsUrl = `./pages/details/details.html?id=${itemId}`;
        window.location.href = detailsUrl;
    });
    details.appendChild(topic)
    details.appendChild(name)
    details.appendChild(rating(values, stars))
    details.appendChild(author)
    topic.className += 'topic overflow-hidden text-truncate m-0';
    name.className += 'm-0 h1 text-break';
    author.className += 'author-name m-0 overflow-hidden text-truncate font-weight-light';
    div.appendChild(pic)
    div.appendChild(details)
    pic.src = values.imageUrl;
    pic.className+='card-img-top w-100 bg-white object-fit-cover';
    topic.innerText = values.topic;
    name.innerText = values.name;
    author.innerText = `Author : ${values.author}`;
    pic.setAttribute('width', '400px');
    pic.setAttribute('height', '200px');
    courseCardContainer.appendChild(div)
    courseCardContainer.className+='col';
    document.querySelector('.courses').appendChild(courseCardContainer)
}