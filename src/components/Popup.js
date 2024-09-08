export default class Popup {
  constructor({ popupSelector }) {
    this.modalElement = document.querySelector({ popupSelector });
  }

  open() {
    // open popup
    this.modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // close popup
    this.modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose() {
    // listens for esc button
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // sets event listeners
    this.modalElement
      .querySelector(".modal__close")
      .addEventListener("click", () => {
        this.close();
      });

    this.modalElement.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
