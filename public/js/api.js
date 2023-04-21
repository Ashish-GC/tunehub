const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "28eea7748cmsh96a60bedcdbaf45p198c4fjsna278a88b80c2",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const main=document.getElementById("main") ;

submit.addEventListener('click',()=>{
  const text=document.getElementById("text").value ;

  var divs = document.getElementsByClassName('box');
  if (divs.length = 1) {
    var lastDiv = divs[divs.length - 1];
        main.removeChild(lastDiv);
  }
  
  searching(text);

})

const adjectives = ["Misty", "Gentle", "Lonely", "Melancholy", "Whimsical", "Enchanted", "Mysterious", "Ethereal", "Serene", "Dreamy"];
const nouns = ["Moon", "Stars", "Rain", "Ocean", "Forest", "Flowers", "River", "Wind", "Meadow", "Sunrise"];

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomsong = adj + " " + noun;


searching(randomsong);

function searching(text){
fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q="+text, options)
  .then((response) => response.json())
  .then((response) => {
    const list = response.data;

  var box = document.createElement("div");
  box.className="box";
  main.appendChild(box);

    list.map((item) => {
      const title = item.title;
      const album_cover = item.album.cover_xl;
      const song = item.preview;
      const artist = item.artist.name;
      const duration = item.duration;


      var container= document.createElement("div");
      container.className="co";
      box.appendChild(container);
      

      //  cover
      var cover = document.createElement("div");
      cover.className="album-poster";
      var img = `<img src ="${album_cover}">`;
      cover.innerHTML = img;
      

          //  container for title and artist
          var bothli =document.createElement("div");
          bothli.className="music_details";

      // Title
      var li1 = document.createElement("li");
      li1.innerHTML = title;
      li1.className="title";
      bothli.appendChild(li1);
      container.appendChild(bothli);

      // Artist
      var li2 = document.createElement("li");
      li2.className="artist";
      li2.innerHTML = artist;
      bothli.appendChild(li2);

      cover.appendChild(bothli);

      container.appendChild(cover);

      //  song
      const audio = document.createElement("audio");
      audio.src = song;
      audio.controls = true;
      container.appendChild(audio);

        
    });
  })
  .catch((err) => console.error(err));
}

