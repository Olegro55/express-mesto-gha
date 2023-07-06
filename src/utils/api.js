import { apiConfig } from "./constants";

class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }
  
  _checkResponse(res) {
    if (!res.ok)
      return Promise.reject(`Ошибка: ${res.status}`);
    return res.json();
  }

  _request(endpoint, options) {
    return fetch(`${this._url}/${endpoint}`, options).then(this._checkResponse);
  }
  
  getUserInfo() {
    return this._request('users/me', { headers: this._headers });
  }
  
  setUserInfo(data) {
    return this._request('users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    });
  }
  
  setUserImage(data) {
    return this._request('users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    });
  }

  getInitialCards() {
    return this._request('cards', {
      headers: this._headers
    });
  }

  addCard(data) {
    return this._request('cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    });
  }

  deleteCard(card) {
    return this._request(`cards/${card._id}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  likeCard(cardId, isLiked) {
    return this._request(`cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers
    });
  }
}

const api = new Api(apiConfig);
export default api;