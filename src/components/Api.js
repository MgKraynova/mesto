class Api {
  constructor(setUserInfoFromServer, addInitialCardsFromServerToDom, createCardFunction, updateAvatarFunction, renderLoadingFunction) {
    this._setUserInfoFromServer = setUserInfoFromServer;
    this._addInitialCardsFromServerToDom = addInitialCardsFromServerToDom;
    this.userId = '';
    this._createCard = createCardFunction;
    this._updateAvatar = updateAvatarFunction;
    this._renderLoading = renderLoadingFunction;
  }

  getUserInfo() {
    fetch('https://nomoreparties.co/v1/cohort-32/users/me ', {
      method: 'GET',
      headers: {
        authorization: '061fe8f7-e35d-435e-9a0b-36d23d83d517'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then(result => {
        this._setUserInfoFromServer(result.name, result.about, result.avatar);
        this.userId = result._id;
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }


  getInitialCards() {
    fetch('https://nomoreparties.co/v1/cohort-32/cards', {
      method: 'GET',
      headers: {
        authorization: '061fe8f7-e35d-435e-9a0b-36d23d83d517'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then(result => {
        this._addInitialCardsFromServerToDom(result);
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  updateUserInfoAtServer(newName, newDescription) {
    const popup = document.querySelector('.popup_type_profile');

    this._renderLoading(true, popup);
    fetch('https://mesto.nomoreparties.co/v1/cohort-32/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '061fe8f7-e35d-435e-9a0b-36d23d83d517',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newName,
        about: newDescription
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      })
      .finally(() => {
        this._renderLoading(false, popup);
      })
  }

  sendCardInfoToServerAndCreateCard(cardName, cardLink) {
    const popup = document.querySelector('.popup_type_place');

    this._renderLoading(true, popup);
    fetch('https://mesto.nomoreparties.co/v1/cohort-32/cards', {
      method: 'POST',
      headers: {
        authorization: '061fe8f7-e35d-435e-9a0b-36d23d83d517',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then((result) => {
        this._createCard(result);
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      })
      .finally(() => {
        this._renderLoading(false, popup);
      });
  }

  deleteCard(cardId) {
    fetch(`https://mesto.nomoreparties.co/v1/cohort-32/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: '061fe8f7-e35d-435e-9a0b-36d23d83d517'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  addLikeToCard(cardId) {
    fetch(`https://mesto.nomoreparties.co/v1/cohort-32/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: '061fe8f7-e35d-435e-9a0b-36d23d83d517'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  removeLikeFromCard(cardId) {
    fetch(`https://mesto.nomoreparties.co/v1/cohort-32/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '061fe8f7-e35d-435e-9a0b-36d23d83d517'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  sendNewAvatarToServerAndChangeAvatar(avatarLink) {
    const popup = document.querySelector('.popup_type_change-avatar');

    this._renderLoading(true, popup);
    fetch(`https://mesto.nomoreparties.co/v1/cohort-32/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: '061fe8f7-e35d-435e-9a0b-36d23d83d517',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then(result => {
        this._updateAvatar(result.avatar);
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      })
      .finally(() => {
        this._renderLoading(false, popup);
      });
  }
}

export default Api;
