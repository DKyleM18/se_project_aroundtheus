import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._modalForm.querySelectorAll(".modal__form-input");
    this._button = this._modalForm.querySelector(".modal__button");
    this._buttonText = this._button.textContent;
  }

  _getInputValues() {
    this._inputData = {};
    this._inputList.forEach((input) => {
      this._inputData[input.name] = input.value;
    });
    return this._inputData;
  }

  setSaving(isSaving) {
    if (isSaving) {
      this._button.textContent = "Saving...";
    } else {
      this._button.textContent = this._buttonText;
    }
  }

  setEventListeners() {
    // add a submit event listener to the form
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}
