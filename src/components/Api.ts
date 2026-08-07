import { UserData } from "./UserInfo";
import type { UserFormData, CardFormData, AvatarFormData  } from "./Types.js";
import type { CardData } from "./Card.js";

export interface ApiOptions {
baseUrl: string;    
headers: HeadersInit;
}

export class Api {
private baseUrl: string;
private headers: HeadersInit;

constructor(options: ApiOptions) {
this.baseUrl = options.baseUrl;
this.headers = options.headers;
}

private async checkResponse(res: Response) {
    if(res.ok) {
        return await res.json();
    }
    throw new Error (`Error: ${res.status}`);
    
}

async getUserInfo() {
const res: Response = await fetch(`${this.baseUrl}/users/me`, {
headers: this.headers
});
return this.checkResponse(res);
}

async getInitialCards() {
    const res: Response = await fetch(`${this.baseUrl}/cards`, {
       headers: this.headers
    });
return this.checkResponse(res);
}

async editUserInfo(data: UserFormData): Promise<UserData> {
    const res: Response = await fetch (`${this.baseUrl}/users/me`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
            name: data.name,
            about: data.about,
        }),
    });
    return this.checkResponse(res);
}

async addCard(data: CardFormData): Promise<CardData> {
const res: Response = await fetch (`${this.baseUrl}/cards`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
            name: data.name,
            link: data.link,
        }),
    });
    return this.checkResponse(res);    
}

async updateAvatar(data: AvatarFormData): Promise<UserData> {
    const res: Response = await fetch (`${this.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
           avatar: data.avatar
        }),
    });
    return this.checkResponse(res);
}

async likeCard(cardId: string): Promise<CardData> {
    const res: Response = await fetch (`${this.baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this.headers,
        }
    );
    return this.checkResponse(res);
}

async deleteCardLike(cardId: string): Promise<CardData> {
    const res: Response = await fetch (`${this.baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this.headers,
        }
    );
    return this.checkResponse(res);
}

async deleteCard(cardId: string): Promise<void> {
    const res: Response = await fetch (`${this.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this.headers,
        }
    );
    await this.checkResponse(res)
}
}