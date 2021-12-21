class Api {
  constructor(setUserInfoFromServer, addInitialCardsFromServerToDom) {
    // тело конструктора
    this._setUserInfoFromServer = setUserInfoFromServer;
    this._addInitialCardsFromServerToDom = addInitialCardsFromServerToDom;
    // this.cardList = cardList;
    //this._addCardsToDom = addCardsToDom;
    // this._addInitialCards = addInitialCards;
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
          // console.log(result);
          // this._addInitialCards(result);
          // this.getUserInfoFromServer(result.name, result.about, result.avatar);
        })
    }

    // другие методы работы с API


// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
//   headers: {
//     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
//     'Content-Type': 'application/json'
//   }
// });

}
export default Api;
