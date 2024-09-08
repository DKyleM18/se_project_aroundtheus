import "../pages/index.css";

import { initialCards, validationSettings } from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";

import Card from "../components/Card.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";

import UserInfo from "../components/UserInfo.js";

import Section from "../components/Section.js";

// Containers

const cardListEl = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#profile-modal");
const editProfileForm = document.forms["edit-profile-form"];
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.forms["add-card-form"];

// Buttons

const addCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

// Misc

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Inputs

const nameInput = editProfileModal.querySelector("#profile-title-input");
const descriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

// Cards

const section = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards__list"
);

section.renderItems();

// Event Handlers

function createCard(data) {
  const cardElement = getCardElement(data);
  section.addItem(cardElement);
}

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function handleImageClick(cardData) {
  imageModal.open(cardData);
}

function handleAddCardFormSubmit(inputData) {
  // console.log("inputData:", inputData);
  const cardData = {
    name: inputData.title,
    link: inputData["Image URL"],
  };
  // console.log(cardData);

  createCard(cardData);
  newCardModal.close();
  addCardForm.reset();
}

function handleProfileFormSubmit(userData) {
  const title = userData.title;
  const description = userData.description;
  userInfo.setUserInfo(title, description);
  profileModal.close();
}

const userInfo = new UserInfo(profileTitle, profileDescription);

// Event Listeners

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.title;
  descriptionInput.value = userData.description;
  profileModal.open();
});

addCardButton.addEventListener("click", () => {
  newCardModal.open();
});

// Validation

const addCardFormValidator = new FormValidator(
  validationSettings,
  document.forms["add-card-form"]
);
const profileFormValidator = new FormValidator(
  validationSettings,
  document.forms["edit-profile-form"]
);

addCardFormValidator.enableValidation();
profileFormValidator.enableValidation();

// Image Modal

const imageModal = new PopupWithImage("#image-modal");

imageModal.setEventListeners();

// Add Card Modal

const newCardModal = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

newCardModal.setEventListeners();

// Profile Modal

const profileModal = new PopupWithForm(
  "#profile-modal",
  handleProfileFormSubmit
);

profileModal.setEventListeners();
