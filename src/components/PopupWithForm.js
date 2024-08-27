import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this.modalForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    //
  }

  setEventListeners() {
    // add a submit event listener to the form
    super.setEventListeners();
  }

  close() {
    this.modalForm.reset();
    super.close();
  }
}
