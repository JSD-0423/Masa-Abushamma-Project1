const toggleSwitch = document.querySelector('.dark-mood-button');
toggleSwitch.addEventListener('click', switchTheme, false);
 function rating(values, stars) {
    for (let i = 0; i < values.rate; i++) {
        const star = document.createElement('span');
        const icon = document.createElement('ion-icon');
        star.setAttribute('data-value', i)
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
    return stars;
}
function switchTheme(e) {
    if (document.documentElement.getAttribute('data-theme') == 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    else { document.documentElement.setAttribute('data-theme', 'dark'); }

}
function openSlide() {
    let element = document.querySelector(".favourite-container");
    if (getComputedStyle(element).display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

toggleSwitch.addEventListener('click', switchTheme, false);
fetch('./classes.json')
    .then(response => response.json())
    .then(data => {
        data.favourites.map((x) => {
            const div = document.createElement("div");
            const pic = document.createElement("img");
            const details = document.createElement('div')
            const name = document.createElement("h1");
            const author = document.createElement("p");
            const stars = document.createElement('div');
            div.className += "favourite-box"
            stars.className += 'rating';
            details.className += 'details';
            details.appendChild(name)
            details.appendChild(rating(x, stars))
            div.appendChild(pic)
            div.appendChild(details)
            pic.src = x.imageUrl;
            name.className += 'text-overflow';
            name.innerText = x.name;
            author.innerText = `Author : ${x.author}`;
            document.querySelector('.favourite-items').appendChild(div);
        })
    })