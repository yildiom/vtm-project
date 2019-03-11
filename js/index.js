import "../css/style.scss";
import List from "./components/List";
import axios from "axios";
import * as basicLightbox from "basiclightbox";
import Video from "./components/Video";
import Slider from "./components/Slider";

new List(6, document.querySelector(".list"));
new Video(document.querySelector(".videoHolder"));
new Slider(5, document.querySelector(".sliderSection"));

document.querySelector(".articles").addEventListener("click", function(e) {
  const videoID = e.target.nextElementSibling.innerText;
  //console.log(videoID);
  axios
    .get(
      `https://nieuws.vtm.be/feed/articles?format=json&fields=video&ids=${videoID}`
    )
    .then(function(result) {
      //console.log(result);
      var relatedLink = result.data.response.items[0].video.url.default;
      var imageLink = result.data.response.items[0].image.medium;
      //console.log(relatedLink);
      const instance = basicLightbox.create(`
      <video controls>
        <source src="${relatedLink}" type="video/mp4">
    </video>
  `);
      instance.show();
    });
});

document.querySelector(".carousel").addEventListener("click", function(e) {
  const videoID = e.target.children[0].innerText;

  axios
    .get(
      `https://nieuws.vtm.be/feed/articles?format=json&fields=video&ids=${videoID}`
    )
    .then(function(result) {
      //console.log(result);
      // if (result.data.response.items[0].video === undefined) {
      //   window.alert("This article does not have a video link");
      // }
      var relatedLink = result.data.response.items[0].video.url.default;
      //var imageLink = result.data.response.items[0].image.medium;
      //console.log(relatedLink);
      const instance = basicLightbox.create(`
      <video controls>
        <source src="${relatedLink}" type="video/mp4">
    </video>
  `);
      instance.show();
    });
});
