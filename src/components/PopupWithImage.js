import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ link, name }) {
    const imageEl = this.popupSelector.querySelector(".card__image");
    const titleEl = this.popupSelector.querySelector(".card__title");

    imageEl.src = link;
    imageEl.alt = name;
    titleEl.textContent = name;

    super.open();
  }
}
