class Api {

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-32/users/me ', {
      method: 'GET',
      headers: {
        authorization: '061fe8f7-e35d-435e-9a0b-36d23d83d517'
      }
    })
      .then(this._checkResult);
  }


  getInitialCards() {
    return fetch('https://nomoreparties.co/v1/cohort-32/cards', {
      method: 'GET',
      headers: {
        authorization: '061fe8f7-e35d-435e-9a0b-36d23d83d517'
      }
    })
      .then(this._checkResult);
  }

  updateUserInfoAtServer(newName, newDescription) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-32/users/me', {
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
      .then(this._checkResult);
  }

  sendCardInfoToServer(cardName, cardLink) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-32/cards', {
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
      .then(this._checkResult);
  }

  deleteCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-32/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: '061fe8f7-e35d-435e-9a0b-36d23d83d517'
      }
    })
      .then(this._checkResult);
  }

  addLikeToCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-32/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: '061fe8f7-e35d-435e-9a0b-36d23d83d517'
      }
    })
      .then(this._checkResult);
  }

  removeLikeFromCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-32/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '061fe8f7-e35d-435e-9a0b-36d23d83d517'
      }
    })
      .then(this._checkResult);
  }

  sendNewAvatarToServer(avatarLink) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-32/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: '061fe8f7-e35d-435e-9a0b-36d23d83d517',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink,
      })
    })
      .then(this._checkResult);
  }
}

export default Api;
