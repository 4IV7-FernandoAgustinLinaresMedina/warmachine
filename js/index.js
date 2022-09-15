
const privatekey = '72509c73bc81aa8ac7889ef0a6fc3fc8e405e0dd',
      publickey = 'aee5eb7fb9b10f13c64c4283e7b7e401',
      content = document.getElementById('content');
      search =document.getElementById('search');
const getConnection = () => {
    const ts = Date.now(),
    hash = MD5(ts + privatekey + publickey),
      URLapi= `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publickey}&hash=${hash}`;
    fetch(URLapi)
        .then(response => response.json())
        .then(response => {
            response.data.results.forEach(e => {
                personajes(e);
            });
        });
};

const personajes = e => {
    const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`
    const hero = `
    <div class="hero ed-item l-1-3">
      <h3>${e.name}</h3>
      <div class="hero-img">
        <img class= "thumbnail" src="${image}">
        <p class="description">${e.description}</p>
      </div>
    </div>
     `;
    content.insertAdjacentHTML('beforeEnd',hero);
};

const searchPersonaje = name => {  
    const ts = Date.now(),
    hero = encodeURIComponent(name),
    hash = MD5(ts + privatekey + publickey),
    URLapi= `https://gateway.marvel.com:443/v1/public/characters?name=${hero}$ts=${ts}&apikey=${publickey}&hash=${hash}`;
    
    fetch(URLapi)
    .then(response => response.json())
    .then(response =>{
        response.data.results.forEach(e => {
            personajes(e);
        });
    })
    .catch(e => console.log(e));

};
search.addEventListener('keyup', e =>{
    if(e.key === "Enter"){
        content.innerHTML = '';
        searchPersonaje(e.target.value.trim());
    }
})


getConnection();
