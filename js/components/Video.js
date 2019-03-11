import axios from "axios";
import * as basicLightbox from "basiclightbox";

export default class Video {
  constructor(holder) {
    this._holder = holder;
    this._htmlRef = this.generateHTML();
    this.getData();
  }
  generateHTML() {
    this._holder.insertAdjacentHTML("beforeend", `<div class="video"><div>`);
  }
  getData() {
    axios
      .get(`https://nieuws.vtm.be/feed/articles?format=json&fields=video`)
      .then(function(result) {
        //console.log(result);
        document.querySelector(".video").innerHTML = `<img src="${
          result.data.response.items[1].image.full
        }" /><h2>${
          result.data.response.items[1].title
        }</h2><div class="playButton"><div/>`;
        document
          .querySelector(".videoHolder")
          .addEventListener("click", function(e) {
            if (result.data.response.items[1].video === undefined) {
              window.alert("This article does not have a video link");
            }
            var videoLink = result.data.response.items[1].video.url.default;

            const instance = basicLightbox.create(`
      <video controls>
        <source src="${videoLink}" type="video/mp4">
    </video>
  `);
            instance.show();
          });
      });
  }
}
