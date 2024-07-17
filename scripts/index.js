const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const addCardButton = profile.querySelector(".profile__add-button");
const profileModal = document.querySelector("#profile-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");
const profileModalCloseButton = profileModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileTitleInput = profileModal.querySelector("#profile-title-input");
const profileForm = profileModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardlistEl = document.querySelector(".cards__list");
const addCardTitleInput = addCardModal.querySelector("#add-card-title-input");
const addCardUrlInput = addCardModal.querySelector("#add-card-url-input");

// FUNCTIONS

function toggleModal(modal) {
  modal.classList.toggle("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const heartButton = cardElement.querySelector(".card__heart-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // add event listener to delete button
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // add click listener to the cardImage element
  cardImageEl.addEventListener("click", () => {
    toggleModal(previewImageModal);
  });
  // toggleModal with "previewImageModal"

  heartButton.addEventListener("click", () => {
    heartButton.classList.toggle("card__heart-button-active");
  });

  cardImageEl.setAttribute("alt", cardData.name);
  cardImageEl.setAttribute("src", cardData.link);
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

function renderCard(cardData, cardlistEl) {
  const cardElement = getCardElement(cardData);
  cardlistEl.prepend(cardElement);
}

// EVENT HANDLERS

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  toggleModal(profileModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;
  renderCard({ name, link }, cardlistEl);
  toggleModal(addCardModal);
}

// EVENT LISTENERS

profileModalCloseButton.addEventListener("click", () =>
  toggleModal(profileModal)
);

addCardModalCloseButton.addEventListener("click", () =>
  toggleModal(addCardModal)
);

addCardButton.addEventListener("click", () => toggleModal(addCardModal));

profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  toggleModal(profileModal);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// MISC

initialCards.forEach((cardData) => renderCard(cardData, cardlistEl));

const likeButtons = document.querySelectorAll(".card__heart-button");

// likeButtons.forEach(likeButton) => {};
