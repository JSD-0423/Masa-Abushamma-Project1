const toggleSwitch = document.querySelector('.dark-mood-button');
toggleSwitch.addEventListener('click', switchTheme, false);
document.querySelector('#open-slide').addEventListener('click', openSlide);

if (localStorage.getItem('darkBtnClicked') === 'true') {
    document.documentElement.setAttribute('data-theme', 'dark');
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    document.getElementById('screen-mode-text').textContent = 'Light mode';
}

document.getElementById('web-topic').addEventListener('click', function () {
    const detailsUrl = `/`;
    window.location.href = detailsUrl;
});

export function rating(values, stars) {
    for (let i = 0; i < values.rating; i++) {
        const star = document.createElement('span');
        const icon = document.createElement('ion-icon');
        star.setAttribute('data-value', i)
        icon.setAttribute('name', 'star-sharp')
        star.appendChild(icon);
        stars.append(star);
    }
    if (values.rating < 5) {
        for (let i = values.rating; i <= 4; i++) {
            const star = document.createElement('span');
            const icon = document.createElement('ion-icon');
            star.setAttribute('data-value', i)
            star.className += 'star';
            icon.setAttribute('name', 'star-outline')
            star.appendChild(icon);
            stars.append(star);
        }
    }
    return stars;
}
function switchTheme(e) {
    if (document.documentElement.getAttribute('data-theme') == 'dark') {
        localStorage.setItem('darkBtnClicked', false);
        document.getElementById('screen-mode-text').textContent = 'Light Mode';
        document.documentElement.setAttribute('data-theme', 'light');
    }
    else {
        localStorage.setItem('darkBtnClicked', true);
        document.getElementById('screen-mode-text').textContent = 'Dark Mode';
        document.documentElement.setAttribute('data-theme', 'dark');
    }

}
 function openSlide() {
    let element = document.querySelector(".favourite-container");
    if (getComputedStyle(element).display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

export function fetchDataById(itemId) {
    return fetch(`https://tap-web-1.herokuapp.com/topics/details/${itemId}`)
        .then(response => response.json())
        .catch(error => {
            console.log('Error:', error);
            return [];
        });
}
export function getFavorites() {
    var favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
}
export async function getFavoriteAndSave(data) {
    try {
        data.map(async (id) => {
            const favoritesData = await fetchDataById(id);
            getcard(favoritesData);
        })
    } catch (error) {
        console.log('Error:', error);
    }
}
export function getcard(favoritesData) {
    const div = document.createElement("div");
    const imageDiv = document.createElement("div");
    const pic = document.createElement("img");
    const details = document.createElement('div');
    const name = document.createElement("h1");
    const author = document.createElement("p");
    const stars = document.createElement('div');
    imageDiv.appendChild(pic)
    div.className += "favourite-card overflow-hidden m-1 rounded w-100"
    div.id += `${favoritesData.id}`
    div.addEventListener('click', function () {
        const detailsUrl = `/pages/details/details.html?id=${favoritesData.id}`;
        window.location.href = detailsUrl;
    });
    stars.className += 'rating d-flex';
    details.className += 'details py-2';
    imageDiv.className += 'image-favourite-card'
    details.appendChild(name)
    details.appendChild(rating(favoritesData, stars))
    div.appendChild(imageDiv)
    div.appendChild(details)
    pic.src = `../../images/${favoritesData.image}`;
    pic.className += 'object-fit-cover w-100';
    name.className += 'overflow-hidden text-nowrap text-truncate p-0 m-0';
    name.innerText = favoritesData.name;
    author.innerText = `Author : ${favoritesData.author}`;
    document.querySelector('.favourite-items').appendChild(div);

}

