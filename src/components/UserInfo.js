export default class UserInfo {
  constructor({ titleSelector, descriptionSelector }) {
    //
    this.titleElement = titleSelector;
    this.descriptionElement = descriptionSelector;
  }

  getUserInfo() {
    return {
      title: this.titleElement.textContent,
      description: this.descriptionElement.textContent,
    };
  }

  setUserInfo() {
    this.titleElement.textContent = this.getUserInfo().title;
    this.descriptionElement.textContent = this.getUserInfo().description;
  }
}
