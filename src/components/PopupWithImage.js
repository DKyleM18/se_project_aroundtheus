import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    // set the image's src and alt
    this.popupSelector.querySelector(".card__image").src = data.link;
    this.popupSelector.querySelector(".card__image").alt = data.name;
    // set the caption's textContent
    this.popupSelector.querySelector(".card__title").textContent = data.name;
    super.open();
  }
}
