import { rating } from "../../global.js";
import { getFavoriteAndSave } from "../../global.js";
import { getcard } from "../../global.js";
import { fetchDataById } from "../../global.js";
import { getFavorites } from "../../global.js";

const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('id');
var loadingIcon = document.getElementById('loadingIcon');

loadingIcon.style.display = 'block';

function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}
function toggleFavorites() {
    const topicId = itemId;
    const favorites = getFavorites();
    if (favorites.includes(topicId)) {
        var index = favorites.indexOf(topicId);
        favorites.splice(index, 1);
        removeFavoriteAndSave(topicId)
        document.getElementById("side-card-button-text").innerText = "Add to Favorites";
    } else {
        favorites.push(topicId);
        appendFavoriteAndSave(topicId);
        document.getElementById("side-card-button-text").innerText = "Remove from Favorites";
    }
    saveFavorites(favorites);
}
window.onload = function () {
    const favorites = getFavorites();
    getDataAndSave();
    if (!getFavorites().includes(itemId)) {
        document.getElementById("side-card-button-text").innerText = "Add to Favorites";
    } else {
        document.getElementById("side-card-button-text").innerText = "Remove from Favorites";
    }
    getFavoriteAndSave(favorites);
    document.querySelector('#favorites-button').addEventListener('click', toggleFavorites, false);
}
async function getDataAndSave() {
    try {
        const data = await fetchDataById(itemId);
        loadingIcon.style.display = 'none';
        document.getElementById('sub-topic-name').innerText = data.topic
        document.querySelector('.category').textContent = data.category;
        document.querySelector('title').textContent = `Details about ${data.topic}`;
        document.querySelector('.name').textContent = data.topic;
        const stars = document.createElement('div');
        document.querySelector('.rating').appendChild(rating(data, stars));
        document.querySelector('.details').textContent = data.description;
        document.querySelector('.side-card-image').setAttribute('src', `../../images/${data.image}`)
        document.querySelector('.course-name').textContent = data.topic;
        document.querySelector('.author-name').textContent = data.name;
        data.subtopics.map((y) => {
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `<td class="d-flex px-4 gap-2 align-items-center py-3 overflow-hidden text-truncate"><ion-icon name="checkmark-circle-outline"></ion-icon><p class="m-0">${y}</p></td>`;
            document.getElementById('tBody').appendChild(tableRow)

        })

    } catch (error) {
        console.log('Error:', error);
    }
}
async function appendFavoriteAndSave(id) {
    try {
        const favoritesData = await fetchDataById(id);
        getcard(favoritesData, id);

    } catch (error) {
        console.log('Error:', error);
    }
}
function removeFavoriteAndSave(data) {
    document.querySelector('.favourite-items').removeChild(document.getElementById(`${data}`))

}

