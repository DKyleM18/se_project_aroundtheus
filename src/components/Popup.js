export default class Popup {
  constructor(popupSelector) {
    this.modalElement = document.querySelector(popupSelector);
  }

  open() {
    // open popup
    this.modalElement.classList.add("modal_opened");
  }

  close() {
    // close popup
    this.modalElement.classList.remove("modal_opened");
  }

  _handleEscClose() {
    // listens for esc button
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // sets event listeners
  }
}
