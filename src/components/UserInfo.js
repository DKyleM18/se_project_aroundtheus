export default class UserInfo {
  constructor(titleElement, descriptionElement, avatarElement) {
    //
    this._titleElement = titleElement;
    this._descriptionElement = descriptionElement;
    this._avatarElement = avatarElement;
  }

  getUserInfo() {
    return {
      title: this._titleElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo(title, description, avatar) {
    this._avatarElement.src = avatar;
    this._titleElement.textContent = title;
    this._descriptionElement.textContent = description;
  }
}
