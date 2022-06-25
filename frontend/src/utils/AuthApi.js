class AuthApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    _checkRequestStatus(res) {
        if (!res.ok) {
            Promise.reject(`Ошибка: ${res.status}`);
            return false;
        } else {
            return res.json();
        }
    }

    signUp(email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password }),
        }).then((res) => this._checkRequestStatus(res));
    }

    signIn(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password }),
        })
            .then((res) => this._checkRequestStatus(res))
            .then((res) => {
                if (res.token) {
                    localStorage.setItem('jwt', res.token);
                } else {
                    return false;
                }
            });
    }

    verifyToken() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: { ...this._headers, Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        }).then((res) => this._getResponseData(res));
    }
}

const authApi = new AuthApi({
    baseUrl: 'https://api.kdolgonosov.mesto.nomoreparties.sbs',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default authApi;
