export default class UserInfo {
  constructor(titleSelector, descriptionSelector) {
    //
    this._titleElement = titleSelector;
    this._descriptionElement = descriptionSelector;
  }

  getUserInfo() {
    return {
      title: this._titleElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo(title, description) {
    this._titleElement.textContent = title;
    this._descriptionElement.textContent = description;
  }
}
