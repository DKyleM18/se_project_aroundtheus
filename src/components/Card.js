export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleIsLiked
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likeStatus = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleIsLiked = handleIsLiked;
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card");

    this._cardElement = cardTemplate.cloneNode(true);
    this._heartButton = this._cardElement.querySelector(".card__heart-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
  }

  getLikeStatus() {
    return this._heartButton.classList.contains("card__heart-button-active");
  }

  toggleLikeIcons() {
    this._heartButton.classList.toggle("card__heart-button-active");
  }

  _setEventListeners() {
    this._heartButton.addEventListener("click", this._handleIsLiked);

    this._deleteButton.addEventListener("click", this._handleDeleteCard);

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  getId() {
    return this._id;
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
