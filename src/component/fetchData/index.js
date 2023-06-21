export function fetchDataById(itemId) {
    return fetch(`https://tap-web-1.herokuapp.com/topics/details/${itemId}`)
        .then(response => response.json())
        .catch(error => {
            console.log('Error:', error);
            return [];
        });
}