import axios from "axios";
import ListItem from "./ListItem";
import Loader from "./Loader";

// pagination uses the list functions that execute to load the next
//list of articles and the previous list of articles

export default class Pagination {
  constructor(holder) {
    this._holder = holder;
    this._htmlRef = this.generateHTML();
    this.loader = new Loader(document.querySelector(".articles"));
    this.rightArrowEvent();
    this.leftArrowEvent();
  }
  generateHTML() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `<div class="pagination">
        <span class="icon-right-big"></span>
        <span class="pageNumbers"></span>
        <span class="icon-left-big"></span>
      </div>`
    );
  }
  rightArrowEvent() {
    document
      .querySelector(".icon-right-big")
      .addEventListener("click", function(e) {
        e.preventDefault();
        const firstNo =
          parseInt(e.target.parentNode.innerText.split(" ")[0]) + 6;
        const secondNo =
          parseInt(e.target.parentNode.innerText.split(" ")[2]) + 6;

        document.querySelector(".articles").innerHTML =
          "<div class='space'></div>";
        //this.loader.show();
        document.querySelector(".space").style.display = "block";
        document.querySelector(".loader").style.display = "block";

        axios
          .get(
            `https://nieuws.vtm.be/feed/articles&type=video&count=6&from=${firstNo}`
          )
          .then(function(result) {
            //console.log(result);
            document.querySelector(
              ".pageNumbers"
            ).innerHTML = `${firstNo} - ${secondNo} / ${
              result.data.response.total
            }`;
            const articleRef = result.data.response.items;
            articleRef.forEach(function(article) {
              new ListItem(article, document.querySelector(".articles"));
            });
            document.querySelector(".space").style.display = "none";
            document.querySelector(".loader").style.display = "none";
          });
      });
  }
  leftArrowEvent() {
    document
      .querySelector(".icon-left-big")
      .addEventListener("click", function(e) {
        e.preventDefault();
        const firstNo = e.target.parentNode.innerText.split(" ")[0] - 6;
        const secondNo = e.target.parentNode.innerText.split(" ")[2] - 6;
        if (firstNo < 1) firstNo = 1;
        if (secondNo < 4) secondNo = 4;

        document.querySelector(".articles").innerHTML =
          "<div class='space'></div>";
        //this.loader.show();
        document.querySelector(".space").style.display = "block";
        //this.loader.show()
        document.querySelector(".loader").style.display = "block";
        axios
          .get(
            `https://nieuws.vtm.be/feed/articles&type=video&count=6&from=${firstNo}`
          )
          .then(function(result) {
            document.querySelector(
              ".pageNumbers"
            ).innerHTML = `${firstNo} - ${secondNo} / ${
              result.data.response.total
            }`;
            const articleRef = result.data.response.items;
            articleRef.forEach(function(article) {
              new ListItem(article, document.querySelector(".articles"));
            });
            document.querySelector(".space").style.display = "none";
            document.querySelector(".loader").style.display = "none";
          });
      });
  }
}
