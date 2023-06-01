const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('id');
fetch('../../classes.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
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
        console.log(data)
        data.favourites.map((x) => {
            const div = document.createElement("div");
            const imageDiv = document.createElement("div");
            const pic = document.createElement("img");
            const details = document.createElement('div');
            const name = document.createElement("h1");
            const author = document.createElement("p");
            const stars = document.createElement('div');
            imageDiv.appendChild(pic)
            div.className += "favourite-card favourite-card overflow-hidden m-1 shadow-sm rounded"
            stars.className += 'rating d-flex';
            details.className += 'details py-2';
            imageDiv.className+='image-favourite-card'
            details.appendChild(name)
            details.appendChild(rating(x, stars))
            div.appendChild(imageDiv)
            div.appendChild(details)
            pic.src = `../../${x.imageUrl}`;
            name.className += 'overflow-hidden text-nowrap text-truncate';
            name.innerText = x.name;
            author.innerText = `Author : ${x.author}`;
            document.querySelector('.favourite-items').appendChild(div);
        })
    })