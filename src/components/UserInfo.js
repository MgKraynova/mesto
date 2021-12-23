class UserInfo {
  constructor({userNameSelector, userDescriptionSelector, userAvatarSelector}) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
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

  setUserInfoWithDataFromServer({userName, userDescription, userAvatarLink}) {
    this.setUserInfo({userName, userDescription});
    this._userAvatarElement.src = userAvatarLink;
    this._userAvatarElement.alt = userName;
  }

  updateAvatar(userAvatarLink) {
    this._userAvatarElement.src = userAvatarLink;
  }
}

export default UserInfo;
