class Api {
  constructor(setUserInfoFromServer, addInitialCardsFromServerToDom) {
    this._setUserInfoFromServer = setUserInfoFromServer;
    this._addInitialCardsFromServerToDom = addInitialCardsFromServerToDom;
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
          console.log(result);
          this._addInitialCardsFromServerToDom(result);
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        });
    }

    updateUserInfoAtServer(newName, newDescription) {
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
        });
    }

    sendCardInfoToServer(cardName, cardLink) {
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
        .then(result => {
          console.log(result)
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        });
    }
}
export default Api;
