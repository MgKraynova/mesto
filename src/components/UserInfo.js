class UserInfo {
  constructor({userNameElement, userDescriptionElement}, userNameInputSelector, userDescriptionInputSelector) {
    this._userNameElement = userNameElement;
    this._userDescriptionElement = userDescriptionElement;
    this._dataWithUserInfo = {};
    this._userNameInput = document.querySelector(userNameInputSelector);
    this._userDescriptionInput = document.querySelector(userDescriptionInputSelector);
  }

  getUserInfo() {
    this._dataWithUserInfo.userName = this._userNameElement.textContent;
    this._dataWithUserInfo.userDescription = this._userDescriptionElement.textContent;
    return this._dataWithUserInfo;
  }

  setUserInfo() {
    this._userNameElement.textContent = this._userNameInput.value;
    this._userDescriptionElement.textContent = this._userDescriptionInput.value;
  }
}

export default UserInfo;
