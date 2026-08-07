export class UserInfo {
    profileTitle;
    profileDescription;
    profileAvatar;
    profileId;
    constructor({ profileTitleSelector, profileDescriptionSelector, profileAvatarSelector }) {
        this.profileTitle = document.querySelector(profileTitleSelector);
        this.profileDescription = document.querySelector(profileDescriptionSelector);
        this.profileAvatar = document.querySelector(profileAvatarSelector);
    }
    getUserInfo() {
        return { name: this.profileTitle.textContent ?? "",
            about: this.profileDescription.textContent ?? "",
            avatar: this.profileAvatar.src ?? "",
            _id: this.profileId,
        };
    }
    getUserId() {
        return this.profileId;
    }
    setUserInfo(userData) {
        this.profileTitle.textContent = userData.name;
        this.profileDescription.textContent = userData.about;
        this.profileAvatar.src = userData.avatar ?? "";
        this.profileId = userData._id;
    }
}
//# sourceMappingURL=UserInfo.js.map