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