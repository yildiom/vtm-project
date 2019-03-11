import axios from "axios";
import * as basicLightbox from "basiclightbox";

// we send two parameters: article and holder

// ListItem ---> "Li" html
//          ---> setUpEvents -- .click --> axios call --> alert(url)

export default class ListItem {
  constructor(article, holder) {
    this._article = article;
    this._holder = holder;
    this._HTMLRef = this.generateHtml();
    //this.clickEvent();
  }
  generateHtml() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `<div class="articleHolder">
        <div class="image-holder">
          <img src="${this._article.image.thumb}" width="112" height="82"/>
          <p class="videoID">${this._article.id}</p>
        </div>
        <div class="article">
          <h4>${this._article.title}</h4>
          <p class="videoID">${this._article.id}</p>
          <p>${this._article.created.formatted}</p>
          <p class="videoID">${this._article.id}</p>
        </div>
        <p class="videoID">${this._article.id}</p>
       </div>`
    );
  }
  // clickEvent() {
  //   document.querySelector(".articles").addEventListener("click", function(e) {
  //     console.log(e.target.nodeName);

  // if (e.target.nodeName === "LI") {
  //   console.log(e);
  // }
  //const videoID = e.target.lastElementChild.innerText;
  //console.log(e.target.lastElementChild.innerText);
  // axios
  //   .get(
  //     `https://nieuws.vtm.be/feed/articles?format=json&fields=video&ids=${videoID}`
  //   )
  //   .then(function(result) {
  //     console.log(result);
  //     var relatedLink = result.data.response.items[0].video.url;
  //     const instance = basicLightbox.create(`
  //     <iframe src="${relatedLink}" width="800" height="600" frameborder="0"></iframe>
  // `);

  //     instance.show();
  //     //   });
  //});
  //}
}
