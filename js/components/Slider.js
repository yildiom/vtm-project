import axios from "axios";
import flickity from "flickity";
import SliderItem from "./SliderItem";

export default class Slider {
  constructor(sliderNumber, holder) {
    this._holder = holder;
    this._pageNr = 5;
    this._sliderNumber = sliderNumber;
    this._htmlRef = this.generateHTML();
    this.getData();
  }
  generateHTML() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `<div class="carousel"
      data-flickity='{ "wrapAround": true }'>
      <div class="carousel-cell-1"></div>
      <div class="carousel-cell-2"></div>
      <div class="carousel-cell-3"></div>
      <div class="carousel-cell-4"></div>
      <div class="carousel-cell-5"></div>
      </div>`
    );
  }
  getData() {
    axios
      .get(
        `https://nieuws.vtm.be/feed/articles&type=video&count=${
          this._sliderNumber
        }&from=${this._pageNr}`
      )
      .then(function(result) {
        console.log(result);
        //Carousel Refs
        const car1 = document.querySelector(".carousel-cell-1");
        const car2 = document.querySelector(".carousel-cell-2");
        const car3 = document.querySelector(".carousel-cell-3");
        const car4 = document.querySelector(".carousel-cell-4");
        const car5 = document.querySelector(".carousel-cell-5");
        car1.style.backgroundImage = `url(${
          result.data.response.items[0].image.full
        })`;
        car1.innerHTML = `<p class="videoID">${
          result.data.response.items[0].id
        }</p><h2>${
          result.data.response.items[0].title
        }</h2><div class="playButton"><p class="videoID">${
          result.data.response.items[0].id
        }</p><div/>`;
        car2.style.backgroundImage = `url(${
          result.data.response.items[1].image.full
        })`;
        car2.innerHTML = `<p class="videoID">${
          result.data.response.items[1].id
        }</p><h2>${
          result.data.response.items[1].title
        }</h2><div class="playButton"><p class="videoID">${
          result.data.response.items[1].id
        }</p><div/>`;

        car3.style.backgroundImage = `url(${
          result.data.response.items[2].image.full
        })`;
        car3.innerHTML = `<p class="videoID">${
          result.data.response.items[2].id
        }</p><h2>${
          result.data.response.items[2].title
        }</h2><div class="playButton"><p class="videoID">${
          result.data.response.items[2].id
        }</p><div/>`;

        car4.style.backgroundImage = `url(${
          result.data.response.items[3].image.full
        })`;
        car4.innerHTML = `<p class="videoID">${
          result.data.response.items[3].id
        }</p><h2>${
          result.data.response.items[3].title
        }</h2><div class="playButton"><p class="videoID">${
          result.data.response.items[3].id
        }</p><div/>`;

        car5.style.backgroundImage = `url(${
          result.data.response.items[4].image.full
        })`;
        car5.innerHTML = `<p class="videoID">${
          result.data.response.items[4].id
        }</p><h2>${
          result.data.response.items[4].title
        }</h2><div class="playButton"><p class="videoID">${
          result.data.response.items[4].id
        }</p><div/>`;
      });
  }
}
