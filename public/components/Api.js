export class Api {
    baseUrl;
    headers;
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }
    async checkResponse(res) {
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
    async getUserInfo() {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        });
        return this.checkResponse(res);
    }
    async getInitialCards() {
        const res = await fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        });
        return this.checkResponse(res);
    }
    async editUserInfo(data) {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        });
        return this.checkResponse(res);
    }
    async addCard(data) {
        const res = await fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        });
        return this.checkResponse(res);
    }
    async updateAvatar(data) {
        const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar
            }),
        });
        return this.checkResponse(res);
    }
    async likeCard(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this.headers,
        });
        return this.checkResponse(res);
    }
    async deleteCardLike(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this.headers,
        });
        return this.checkResponse(res);
    }
    async deleteCard(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
        });
        await this.checkResponse(res);
    }
}
//# sourceMappingURL=Api.js.map