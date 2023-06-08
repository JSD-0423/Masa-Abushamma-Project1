import { createRating } from "./global.js";
import { getFavoriteAndSave } from "./global.js";
import { getFavorites } from "./global.js";
const cardsLoadingIcon = document.getElementById('cards-loading-icon');

const searchInput = document.querySelector('.search-input');
const sortBySelect = document.getElementById('sort-by-select');
const filterBySelect = document.getElementById('filter-by-select');

const categories = [];
let typingTimeout = null;
let sortByValue = '';
let filterByValue = '';
let searchInputValue = '';
cardsLoadingIcon.style.display = 'block';

window.onload = function () {
    getDataAndSave();
    getFavoriteAndSave(getFavorites());

}

async function searchWebTopics(searchInputValue, sortByValue, filterByValue) {
    document.querySelector('.courses').innerHTML = '';
    let fetchUrl = 'https://tap-web-1.herokuapp.com/topics/list';
    if (!searchInputValue == '') {
        fetchUrl = `https://tap-web-1.herokuapp.com/topics/list?phrase=${searchInputValue}`;
    }
    cardsLoadingIcon.style.display = 'block';
    try {
        await fetch(fetchUrl)
            .then(response => response.json())
            .then(data => {
                cardsLoadingIcon.style.display = 'none';
                if (sortByValue) {
                    data.sort((a, b) => {
                        if (a[`${sortByValue}`].toLowerCase() < b[`${sortByValue}`].toLowerCase()) {
                            return -1;
                        } else if (a[`${sortByValue}`].toLowerCase() > b[`${sortByValue}`].toLowerCase()) {
                            return 1;
                        } else {
                            return 0;
                        }
                    })
                }
                if (filterByValue) {
                    data = data.filter(item => item.category === filterByValue);
                }
                document.querySelector('.number-of-courses').innerText = data.length;
                data.map((x) => {
                    createHtmlDom(x)
                })
            })
    } catch (error) {

    }

}
function fetchData() {
    return fetch('https://tap-web-1.herokuapp.com/topics/list')
        .then(response => response.json())
        .catch(error => {
            return [];
        });
}
async function getDataAndSave() {
    try {
        const data = await fetchData();
        cardsLoadingIcon.style.display = 'none';
        document.querySelector('.number-of-courses').innerText = data.length;
        data.map((x) => {
            createHtmlDom(x)

        })
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

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
        const itemId = values.id;
        const detailsUrl = `./pages/details/details.html?id=${itemId}`;
        window.location.href = detailsUrl;
    });
    const option = document.createElement('option');

    topic.innerText = values.category;
    if (!categories.includes(values.category)) {
        option.value = values.category;
        option.textContent = values.category;
        filterBySelect.append(option)
        categories.push(values.category);
    }
    details.appendChild(topic)
    details.appendChild(name)
    details.appendChild(createRating(values, stars))
    details.appendChild(author)
    topic.className += 'topic overflow-hidden text-truncate m-0';
    name.className += 'm-0 h1 text-break fw-bold';
    author.className += 'author-name m-0 overflow-hidden text-truncate font-weight-light';
    div.appendChild(pic)
    div.appendChild(details)
    pic.src = `./images/${values.image}`;
    pic.className += 'card-img-top w-100 bg-white object-fit-cover';
    name.innerText = values.topic;
    author.innerText = `Author : ${values.name}`;
    pic.setAttribute('width', '400px');
    pic.setAttribute('height', '200px');
    courseCardContainer.appendChild(div)
    courseCardContainer.className += 'col';
    document.querySelector('.courses').appendChild(courseCardContainer)
}
const handleFilterBySorting = (event) => {
    if (!(event.target.value === 'Default')) {
        sortByValue = event.target.value;

    } else {
        sortByValue = ''
    }

    searchWebTopics(searchInputValue, sortByValue, filterByValue)
}
const handleFilterBySelection = (event) => {
    if (!(event.target.value === 'Default')) {
        filterByValue = event.target.value;

    } else {
        filterByValue = ''
    }
    searchWebTopics(searchInputValue, sortByValue, filterByValue)
}

const handleSearchInput = (event) => {
    clearTimeout(typingTimeout);
    searchInputValue = event.target.value;
    typingTimeout = setTimeout(() => {
        searchWebTopics(searchInputValue, sortByValue, filterByValue);
    }, 300);
}

filterBySelect.addEventListener('change', handleFilterBySelection);
sortBySelect.addEventListener('change', handleFilterBySorting);
searchInput.addEventListener('input', handleSearchInput);