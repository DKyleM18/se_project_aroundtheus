import "../pages/index.css";

import { initialCards, validationSettings } from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";

import Card from "../components/Card.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";

import UserInfo from "../components/UserInfo.js";

import Section from "../components/Section.js";

// Profile

const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileModal = document.querySelector("#profile-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileTitleInput = profileModal.querySelector("#profile-title-input");
const profileForm = document.forms["edit-profile-form"];
const profileSubmitButton = profileModal.querySelector(".modal__button");

// Add Card

const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = profile.querySelector(".profile__add-button");
const addCardForm = document.forms["add-card-form"];
const addCardTitleInput = addCardModal.querySelector("#add-card-title-input");
const addCardUrlInput = addCardModal.querySelector("#add-card-url-input");
const addCardSubmitButton = addCardModal.querySelector(".modal__button");

// Preview Image

const previewImageModal = document.querySelector("#image-modal");
const previewImageModalImage = previewImageModal.querySelector(".modal__image");
const previewImageModalTitle = previewImageModal.querySelector(
  ".modal__image-title"
);

// Card

const cardListEl = document.querySelector(".cards__list");

// FUNCTIONS

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", handleEscape);
//   modal.removeEventListener("click", handleModalClickOut);
// }

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", handleEscape);
//   modal.addEventListener("click", handleModalClickOut);
// }

// function renderCard(cardData, cardListEl) {
//   cardListEl.prepend(createCard(cardData));
// }

// function createCard(cardData) {
//   const cardElement = new Card(cardData, "#card-template", handleImageClick);
//   return cardElement.getView();
// }

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// EVENT HANDLERS

function handleImageClick(name, link) {
  previewImageModalImage.setAttribute("src", link);
  previewImageModalImage.setAttribute("alt", name);
  previewImageModalTitle.textContent = name;
  openModal(previewImageModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileModal);
}

function handleAddCardFormSubmit(inputData) {
  const cardData = {
    name: inputData.name,
    link: inputData.link,
  };

  renderCard(cardData, cardListEl);
  cardModal.close();
  addCardForm.reset();
}

// function handleModalCloseButton() {
//   const closeButtons = document.querySelectorAll(".modal__close");
//   closeButtons.forEach((button) => {
//     const popup = button.closest(".modal");
//     button.addEventListener("click", () => closeModal(popup));
//   });
// }

// function handleModalClickOut(evt) {
//   if (evt.currentTarget === evt.target) {
//     closeModal(evt.target);
//   }
// }

// function handleEscape(evt) {
//   if (evt.key === "Escape") {
//     const openedModal = document.querySelector(".modal_opened");
//     closeModal(openedModal);
//   }
// }

// EVENT LISTENERS

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.title;
  profileDescriptionInput.value = userData.description;
  infoModal.open();
});

// profileForm.addEventListener("submit", handleProfileFormSubmit);

// addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// MISC

// const validationSettings = {
//   inputSelector: ".modal__form-input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__form-input-error",
//   errorClass: "modal__form-input-error_active",
// };

const addCardFormValidator = new FormValidator(validationSettings, addCardForm);
const profileFormValidator = new FormValidator(validationSettings, profileForm);

addCardFormValidator.enableValidation();
profileFormValidator.enableValidation();
// handleModalCloseButton();

// NEW

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      section.addItem(createCard(item));
    },
  },
  ".cards__list"
);
section.renderItems();

const imageModal = new PopupWithImage("#image-modal");
imageModal.setEventListeners();

const cardModal = new PopupWithForm("#add-card-modal", handleAddCardFormSubmit);
cardModal.setEventListeners();

const infoModal = new PopupWithForm("#profile-modal", handleProfileFormSubmit);
infoModal.setEventListeners();

const userInfo = new UserInfo(profileTitle, profileDescription);
