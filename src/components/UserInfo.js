class UserInfo {
  constructor({userNameSelector, userDescriptionSelector}) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
    this._dataWithUserInfo = {};
  }

  getUserInfo() {
    this._dataWithUserInfo.userName = this._userNameElement.textContent;
    this._dataWithUserInfo.userDescription = this._userDescriptionElement.textContent;
    return this._dataWithUserInfo;
  }

  setUserInfo({userName, userDescription}) {
    this._userNameElement.textContent = userName;
    this._userDescriptionElement.textContent = userDescription;
  }
}

export default UserInfo;
