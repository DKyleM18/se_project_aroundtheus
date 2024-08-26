export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;

    // this._heartButton = this._cardElement.querySelector(".card__heart-button");
  }

  _handleLikeIcons() {
    this._cardElement
      .querySelector(".card__heart-button")
      .classList.toggle("card__heart-button-active");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__heart-button")
      .addEventListener("click", () => {
        this._handleLikeIcons();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
