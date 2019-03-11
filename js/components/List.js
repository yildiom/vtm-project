// List ---> make "ul"
//      ---> new Loader() show()
//      ---> getData ---> axios
//      ---> loadchildren --- .forEach(new ListItem(__,__))
//      ---> hide() loader

// we send two parameters: nr of articles and holder
// in the beginning the pagination can be inside list.js
// click next ul erased, loader shown, data is loaded, li s are created

import axios from "axios";
import ListItem from "./ListItem";
import Loader from "./Loader";
import Pagination from "./Pagination";

export default class List {
  constructor(nrOfArticles, holder) {
    this._nrOfArticles = nrOfArticles;
    this._pageNr = 0;
    this._holder = holder;
    this.loader = new Loader(this._holder);
    this._htmlRef = this.generateHTML();
    this.getData();
    this.pagination = new Pagination(this._holder);
    //this.clickEvent();
  }

  generateHTML() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `<div class="articles"></div>`
    );
    return this._holder.querySelector(".articles");
  }

  getData() {
    this.loader.show();
    axios
      .get(
        `https://nieuws.vtm.be/feed/articles&type=video&count=${
          this._nrOfArticles
        }&from=${this._pageNr}`
      )
      .then(function(result) {
        //console.log(result);
        const articleRef = result.data.response.items;
        articleRef.forEach(function(article) {
          new ListItem(article, document.querySelector(".articles"));
        });
        //this.loader.hide();
        document.querySelector(".loader").style.display = "none";
        document.querySelector(".pageNumbers").innerHTML = `1 - ${
          result.data.response.items.length
        } / ${result.data.response.total}`;
      });
  }
  // clickEvent() {
  //   document
  //     .querySelector(".articleHolder")
  //     .addEventListener("click", function(e) {
  //       console.log(e.target);
  //     });
  // }
}
