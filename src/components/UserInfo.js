export default class UserInfo {
    constructor({ profileNameSelector, profileDescriptionSelector, avatarSelector }) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileDescription = document.querySelector(profileDescriptionSelector);
        this._profileAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            profileName: this._profileName.textContent,
            profileDescription: this._profileDescription.textContent,
            profileAvatar: this._profileAvatar.src
        }
    }

    setUserInfo(userData) {
        this._profileName.textContent = userData.name;
        this._profileDescription.textContent = userData.about;
        this._profileAvatar.src = userData.avatar;
        this._myId = userData._id;  
    }
}