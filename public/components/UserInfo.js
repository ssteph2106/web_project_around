export class UserInfo {
    profileTitle;
    profileDescription;
    constructor({ profileTitleSelector, profileDescriptionSelector }) {
        this.profileTitle = document.querySelector(profileTitleSelector);
        this.profileDescription = document.querySelector(profileDescriptionSelector);
    }
    getUserInfo() {
        return { name: this.profileTitle.textContent ?? "",
            about: this.profileDescription.textContent ?? ""
        };
    }
    setUserInfo(userData) {
        this.profileTitle.textContent = userData.name;
        this.profileDescription.textContent = userData.about;
    }
}
//# sourceMappingURL=UserInfo.js.map