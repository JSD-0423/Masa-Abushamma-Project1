const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('id');
fetch('../../classes.json')
    .then(response => response.json())
    .then(data => {
        for (variable of data.courses) {
            if(variable.name===itemId){
                document.querySelector('.topic').textContent=variable.topic;
                document.querySelector('title').textContent=`Details about ${variable.name}`;
                document.querySelector('.name').textContent=variable.name;
                const stars = document.createElement('div');
                document.querySelector('.rating').appendChild(rating(variable,stars));
                document.querySelector('.details').textContent=variable.details;
                document.querySelector('.side-card-image').setAttribute('src',`../../${variable.imageUrl}`)
                document.querySelector('.course-name').textContent=variable.name;
                document.querySelector('.author-name').textContent=variable.author;

             }
          }
    })
    .catch(error => console.error(error));
    fetch('../../classes.json')
    .then(response => response.json())
    .then(data => {
        data.favourites.map((x) => {
            console.log(x)
            const div = document.createElement("div");
            const pic = document.createElement("img");
            const details = document.createElement('div')
            const name = document.createElement("h1");
            const author = document.createElement("p");
            const stars = document.createElement('div');
            div.className += "favourite-card"
            stars.className += 'rating';
            details.className += 'details';
            details.appendChild(name)
            details.appendChild(rating(x, stars))
            div.appendChild(pic)
            div.appendChild(details)
            pic.src = `../../${x.imageUrl}`;
            name.className += 'text-overflow-hide';
            name.innerText = x.name;
            author.innerText = `Author : ${x.author}`;
            document.querySelector('.favourite-items').appendChild(div);
        })
    })