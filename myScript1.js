
const toggleSwitch = document.querySelector('#dark-mood-button');
const searchInput = document.querySelector('#search-input');

function switchTheme(e) {
    if (document.documentElement.getAttribute('data-theme') == 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    else { document.documentElement.setAttribute('data-theme', 'dark'); }

}
function openSlide() {
    let element = document.getElementById("Favourite");
    if (getComputedStyle(element).display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

function createHtmlDom(values) {
    const div = document.createElement("div");
    const pic = document.createElement("img");
    const topic = document.createElement("h1");
    const name = document.createElement("h1");
    const author = document.createElement("p");
    const stars = document.createElement('div');
    const divTextContainer =document.createElement('div');
    stars.className += 'rating';
    for (let i = 0; i < values.rate; i++) {
        const star = document.createElement('span');
        const icon = document.createElement('ion-icon');
        star.setAttribute('data-value', i)
        star.className += 'star';
        icon.setAttribute('name', 'star-sharp')
        star.appendChild(icon);
        stars.append(star);
    }
    if (values.rate < 5) {
        for (let i = values.rate; i <= 4; i++) {
            const star = document.createElement('span');
            const icon = document.createElement('ion-icon');
            star.setAttribute('data-value', i)
            star.className += 'star';
            icon.setAttribute('name', 'star-outline')
            star.appendChild(icon);
            stars.append(star);
        }
    }
    pic.src = values.imageUrl;
    topic.innerText = values.topic;
    name.innerText = values.name;
    author.innerText = `Author : ${values.Author}`;

    div.className += "course-card"
    pic.setAttribute('width', '400px');
    pic.setAttribute('height', '200px');
    div.appendChild(pic)
    divTextContainer.appendChild(topic)
    divTextContainer.appendChild(name)
    divTextContainer.appendChild(stars)
    divTextContainer.appendChild(author)
    divTextContainer.className+='details-container';
    div.appendChild(divTextContainer)
    document.getElementById('courses').appendChild(div)
}

toggleSwitch.addEventListener('click', switchTheme, false);
const node = document.createElement("span");
fetch('./classes.json')
    .then(response => response.json())
    .then(data => {
        node.innerText = data.courses.length;
        data.courses.map((x) => {
            createHtmlDom(x)

        })
        const Favourite=document.getElementById('FavouriteItems')
        data.favourites.map((x)=>{
            const div=document.createElement('div');
            div.className+='favourite-box'
            const img=document.createElement('img');
            const h1=document.createElement('h1');
            img.setAttribute('src',x.imageUrl);
            img.setAttribute('width','110px');
            img.setAttribute('height','50px');
            h1.innerText=x.name;
            div.appendChild(img);
            div.appendChild(h1);
            Favourite.appendChild(div);
        })
    })
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

            document.getElementById('courses').innerHTML = '';
            for (let i = 0; i < results.length; i++) {
                const obj = results[i];
                console.log(obj)
                createHtmlDom(obj)
            }
        })
        .catch(error => console.error(error));
});
document.getElementById('number-of-courses').appendChild(node);