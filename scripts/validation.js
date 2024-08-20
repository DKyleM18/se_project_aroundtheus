// const showInputError = (formEl, inputEl, { inputErrorClass, errorClass }) => {
//   const errorMessageEl = formEl.querySelector(`.${inputEl.id}-error`);
//   errorMessageEl.textContent = inputEl.validationMessage;
//   errorMessageEl.classList.add(errorClass);
// };

// const hideInputError = (formEl, inputEl, { inputErrorClass, errorClass }) => {
//   const errorMessageEl = formEl.querySelector(`.${inputEl.id}-error`);
//   errorMessageEl.textContent = "";
//   errorMessageEl.classList.remove(errorClass);
// };

// const checkInputValidity = (formEl, inputEl, options) => {
//   if (!inputEl.validity.valid) {
//     return showInputError(formEl, inputEl, options);
//   }
//   hideInputError(formEl, inputEl, options);
// };

// const hasInvalidInput = (inputList) => {
//   return !inputList.every((inputEl) => inputEl.validity.valid);
// };

// const disableButton = (submitButton, { inactiveButtonClass }) => {
//   submitButton.classList.add(inactiveButtonClass);
//   submitButton.disabled = true;
// };

// const enableButton = (submitButton, { inactiveButtonClass }) => {
//   submitButton.classList.remove(inactiveButtonClass);
//   submitButton.disabled = false;
// };

// const toggleButtonState = (inputEls, submitButton, { inactiveButtonClass }) => {
//   if (hasInvalidInput(inputEls)) {
//     disableButton(submitButton, { inactiveButtonClass });
//     return;
//   }
//   enableButton(submitButton, { inactiveButtonClass });
// };

// const setEventListeners = (formEl, options) => {
//   const { inputSelector } = options;
//   const { submitButtonSelector } = options;
//   const inputEls = [...formEl.querySelectorAll(inputSelector)];
//   const submitButton = formEl.querySelector(submitButtonSelector);
//   inputEls.forEach((inputEl) => {
//     inputEl.addEventListener("input", (evt) => {
//       checkInputValidity(formEl, inputEl, options);
//       toggleButtonState(inputEls, submitButton, options);
//     });
//   });
// };

// const enableValidation = (options) => {
//   const formEls = [...document.querySelectorAll(options.formSelector)];
//   formEls.forEach((formEl) => {
//     formEl.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//     });

//     setEventListeners(formEl, options);
//   });
// };

// const settings = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__form-input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__form-input-error",
//   errorClass: "modal__form-input-error_active",
// };

// enableValidation(settings);
