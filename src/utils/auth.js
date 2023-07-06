
import { authConfig } from "./constants";

class Auth {
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

    register(data) {
        return this._request('signup', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        });
    }

    authorize(data) {
        return this._request('signin', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        });
    }

    checkToken(token) {
        return this._request('users/me', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
    }
}

const auth = new Auth(authConfig);
export default auth;