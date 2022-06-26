class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        // this._headers = headers;
    }

    get _headers() {
        return {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
        };
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then((res) => this._getResponseData(res));
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        }).then((res) => this._getResponseData(res));
    }

    editProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about,
            }),
        }).then((res) => this._getResponseData(res));
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            }),
        }).then((res) => this._getResponseData(res));
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then((res) => this._getResponseData(res));
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this._headers,
            }).then((res) => this._getResponseData(res));
        } else {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this._headers,
            }).then((res) => this._getResponseData(res));
        }
    }

    changeAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar,
            }),
        }).then((res) => this._getResponseData(res));
    }
}

const api = new Api({
    baseUrl: 'https://api.kdolgonosov.mesto.nomoreparties.sbs',
});

export default api;
