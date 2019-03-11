// we send one parameter: holder

//     ---> <p>loader...</p>
//     ---> hide()
//     ---> show()

export default class Loader {
  constructor(holder) {
    this._holder = holder;
    this._htmlRef = this.generateHTML();
  }
  generateHTML() {
    this._holder.insertAdjacentHTML("beforeend", `<div class="loader"></div>`);
    return this._holder.querySelector(".loader");
  }
  show() {
    this._htmlRef.style.display = "block";
  }
  hide() {
    this._htmlRef.style.display = "none";
  }
}
