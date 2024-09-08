import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._popupSelector = popupSelector;
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputData = {};
    this._inputList = this._modalForm.querySelectorAll(".modal__form-input");
    this._inputList.forEach((input) => {
      this._inputData[input.name] = input.value;
    });
    return this._inputData;
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
