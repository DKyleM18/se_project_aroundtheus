import "../pages/index.css";

import { initialCards, validationSettings } from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";

import Card from "../components/Card.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";

import UserInfo from "../components/UserInfo.js";

import Section from "../components/Section.js";

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

// Cards

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", handleImageClick);
  return cardElement.getView();
}

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

// Image Modal

const imageModal = new PopupWithImage("#image-modal");
imageModal.setEventListeners();

function handleImageClick(cardData) {
  imageModal.open(cardData);
}

// Add Card Modal

const addCardForm = document.forms["add-card-form"];

function handleAddCardFormSubmit(data) {
  section.addItem(createCard(data));
  addCardModal.close();
  addCardForm.reset();
}

const addCardModal = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardModal.setEventListeners();

// Profile Modal

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  profileModal.close();
}

const profileModal = new PopupWithForm(
  "#profile-modal",
  handleProfileFormSubmit
);
profileModal.setEventListeners();

const userInfo = new UserInfo(profileTitle, profileDescription);
