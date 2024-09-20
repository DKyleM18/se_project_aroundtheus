// TOKEN : "71ef8ca1-b8c8-47e5-8d73-d71542ab18e9"

import "../pages/index.css";

import { initialCards, validationSettings } from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";

import Card from "../components/Card.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";

import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

import UserInfo from "../components/UserInfo.js";

import Section from "../components/Section.js";

import Api from "../components/Api.js";

// Containers

const cardListEl = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#profile-modal");
const editProfileForm = document.forms["edit-profile-form"];
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.forms["add-card-form"];
const avatarForm = document.forms["avatar-form"];
const editAvatarModal = document.querySelector("#avatar-modal");

// Buttons

const addCardButton = document.querySelector(".profile__add-button");
const addCardSaveButton = addCardModal.querySelector(".modal__button");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileSaveButton = editProfileModal.querySelector(".modal__button");
const avatarSaveButton = avatarForm.querySelector(".modal__button");
const editAvatarButton = document.querySelector(".profile__avatar");

// Misc

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");

// Inputs

const nameInput = editProfileModal.querySelector("#profile-title-input");
const descriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

// Api

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "71ef8ca1-b8c8-47e5-8d73-d71542ab18e9",
    "Content-Type": "application/json",
  },
});

// Cards

let section;

api
  .getInitialCards()
  .then((cardDataArray) => {
    section = new Section(
      {
        items: cardDataArray,
        renderer: createCard,
      },
      ".cards__list"
    );

    section.renderItems();
  })
  .catch((err) => {
    console.error("Error fetching initial cards:", err);
  });

// Event Handlers

function createCard(data) {
  const cardElement = getCardElement(data);
  section.addItem(cardElement);
}

let card;

function getCardElement(cardData) {
  card = new Card(cardData, "#card-template", handleImageClick, (card) => {
    deleteModal.open();
  });
  return card.getView();
}

function handleImageClick(cardData) {
  imageModal.open(cardData);
}

function handleAddCardFormSubmit(inputData) {
  const cardData = {
    name: inputData.title,
    link: inputData["Image URL"],
  };

  newCardModal.setSaving(true);
  api.addNewCard(cardData).then((cardData) => {
    createCard(cardData);
    newCardModal.close();
    addCardForm.reset();
    addCardFormValidator.disableSubmitButton();
    newCardModal.setSaving(false);
  });
}

function handleProfileFormSubmit(userData) {
  profileModal.setSaving(true);
  const title = userData.title;
  const description = userData.description;
  api.editUserInfo(title, description).then(() => {
    getProfileData();
    profileModal.close();
    profileModal.setSaving(false);
  });
}

function handleAvatarFormSubmit(avatarData) {
  if (!avatarSaveButton.disabled) {
    avatarModal.setSaving(true);
    const avatar = avatarData["avatar URL"];
    api.editUserAvatar(avatar).then(() => {
      getProfileData();
      avatarModal.close();
      avatarModal.setSaving(false);
      avatarForm.reset();
      avatarFormValidator.disableSubmitButton();
    });
  }
}

function handleDeleteCardSubmit() {
  api
    .deleteCard(card.getId())
    .then(() => {
      card.removeCard();
      deleteModal.close();
    })
    .catch((err) => {
      console.error("Error deleting card:", err);
    });
}

function handleLikeCardClick() {
  api
    .likeCard(card.getId())
    .then((cardData) => {
      card.setLike();
      card.updateLikeCounter(cardData.likes.length);
    })
    .catch((err) => {
      console.error("Error liking card:", err);
    });
}

function getProfileData() {
  return api.getUserInfo().then((profileData) => {
    userInfo.setUserInfo(
      profileData["name"],
      profileData["about"],
      profileData["avatar"]
    );
  });
}

getProfileData();

const userInfo = new UserInfo(profileTitle, profileDescription, profileAvatar);

// Event Listeners

editAvatarButton.addEventListener("click", () => {
  avatarModal.open();
});

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.title;
  descriptionInput.value = userData.description;
  profileFormValidator.resetValidation();
  profileModal.open();
});

addCardButton.addEventListener("click", () => {
  newCardModal.open();
});

// Validation

const addCardFormValidator = new FormValidator(validationSettings, addCardForm);
const profileFormValidator = new FormValidator(
  validationSettings,
  editProfileForm
);
const avatarFormValidator = new FormValidator(validationSettings, avatarForm);

addCardFormValidator.enableValidation();
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();

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

// Delete Card Modal

const deleteModal = new PopupWithConfirmation(
  "#delete-card-modal",
  handleDeleteCardSubmit
);

deleteModal.setEventListeners();

// Avatar Modal

const avatarModal = new PopupWithForm("#avatar-modal", handleAvatarFormSubmit);

avatarModal.setEventListeners();
