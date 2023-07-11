class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._token = data.token;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  addCardLike(data) {
    return fetch(`${this._baseUrl}cards/${data}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    })
    .then((res) => this._checkResponse(res));
  }

  deleteCardLike(data) {
    return fetch(`${this._baseUrl}cards/${data}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    })
    .then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked){
    if (isLiked) {
      return this.addCardLike(cardId);

    } else {
      return this.deleteCardLike(cardId);
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: this._token,
      },
    })

    .then((res) => this._checkResponse(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: this._token,
      },
    })
    
    .then((res) => this._checkResponse(res));
  }

  setUserInfo(objUserInfo) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objUserInfo)
    })

    .then((res) => this._checkResponse(res));
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data,
      }),
    })
    .then((res) => this._checkResponse(res));
  }

  addNewCard({name, link}) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
    .then((res) => this._checkResponse(res));
  }

  deleteCard(data) {
    return fetch(`${this._baseUrl}cards/${data}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    })
    .then((res) => this._checkResponse(res));
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63/',
  token: `db38260c-9e73-4623-b5f7-e8a2dd315408`,
});