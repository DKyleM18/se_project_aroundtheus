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

// Profile

const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileModal = document.querySelector("#profile-modal");
const profileModalCloseButton = profileModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileTitleInput = profileModal.querySelector("#profile-title-input");
const profileForm = profileModal.querySelector(".modal__form");

// Add Card

const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = profile.querySelector(".profile__add-button");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const addCardForm = addCardModal.querySelector(".modal__form");
const addCardTitleInput = addCardModal.querySelector("#add-card-title-input");
const addCardUrlInput = addCardModal.querySelector("#add-card-url-input");

// Preview Image

const previewImageModal = document.querySelector("#image-modal");
const previewImageModalImage = previewImageModal.querySelector(".modal__image");
const previewImageModalCloseButton =
  previewImageModal.querySelector(".modal__close");
const previewImageModalTitle = previewImageModal.querySelector(
  ".modal__image-title"
);

// Card

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardlistEl = document.querySelector(".cards__list");

// FUNCTIONS

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
  modal.removeEventListener("click", handleModalClickOut);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
  modal.addEventListener("click", handleModalClickOut);
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
    previewImageModalImage.setAttribute("src", cardData.link);
    previewImageModalImage.setAttribute("alt", cardData.name);
    previewImageModalTitle.textContent = cardData.name;
    openModal(previewImageModal);
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
  closeModal(profileModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;
  renderCard({ name, link }, cardlistEl);
  evt.target.reset();
  closeModal(addCardModal);
}

function handleModalCloseButton() {
  const closeButtons = document.querySelectorAll(".modal__close");
  closeButtons.forEach((button) => {
    const popup = button.closest(".modal");
    button.addEventListener("click", () => closeModal(popup));
  });
}

function handleModalClickOut(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal(evt.target);
  }
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

// EVENT LISTENERS

addCardButton.addEventListener("click", () => openModal(addCardModal));

profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileModal);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// MISC

initialCards.forEach((cardData) => renderCard(cardData, cardlistEl));

// Calls

handleModalCloseButton();
