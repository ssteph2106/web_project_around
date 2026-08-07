export interface UserInfoSelectors {
profileTitleSelector: string,
profileDescriptionSelector: string;
profileAvatarSelector: string;
}

export interface UserData {
_id: string;    
name: string,
about: string;
avatar?: string;
}

export class UserInfo {
private profileTitle: HTMLElement;
private profileDescription: HTMLElement;
private profileAvatar: HTMLImageElement;
private profileId!: string;

    constructor(
        {profileTitleSelector,
        profileDescriptionSelector,
        profileAvatarSelector}: UserInfoSelectors)
        {
    this.profileTitle = document.querySelector(profileTitleSelector) as HTMLElement;
    this.profileDescription =  document.querySelector(profileDescriptionSelector) as HTMLElement;
    this.profileAvatar = document.querySelector(profileAvatarSelector) as HTMLImageElement; 
 }

getUserInfo(): UserData {
return {name: this.profileTitle.textContent??"",
about: this.profileDescription.textContent??"",
avatar: this.profileAvatar.src??"",
_id: this.profileId,
}
}

public getUserId(): string {
    return this.profileId;
}

setUserInfo(userData: UserData): void {
this.profileTitle.textContent = userData.name;
this.profileDescription.textContent = userData.about;
this.profileAvatar.src = userData.avatar ?? "";
this.profileId = userData._id;
}

}