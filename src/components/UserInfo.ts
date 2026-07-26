export interface UserInfoSelectors {
profileTitleSelector:string,
profileDescriptionSelector:string;
}

export interface UserData {
name: string,
about: string;
}

export class UserInfo {
private profileTitle: HTMLElement;
private profileDescription: HTMLElement;

    constructor(
        {profileTitleSelector,
        profileDescriptionSelector}: UserInfoSelectors)
        {
    this.profileTitle = document.querySelector(profileTitleSelector) as HTMLElement;
    this.profileDescription =  document.querySelector(profileDescriptionSelector) as HTMLElement;   
 }

getUserInfo(): UserData {
return {name: this.profileTitle.textContent??"",
about: this.profileDescription.textContent??""
}
}

setUserInfo(userData: UserData): void {
this.profileTitle.textContent = userData.name;
this.profileDescription.textContent = userData.about;
}

}