import { enableValidation } from "./validate.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
enableValidation();
const initialCards = [
    {
        name: "Valle de Yosemite",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    },
    {
        name: "Lago Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    },
    {
        name: "Montañas Calvas",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
    },
    {
        name: "Parque Nacional de la Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
    },
];
const profileEditButton = document.querySelector(".profile__edit-button");
const popUpInputTypeName = document.querySelector(".popup__input_type_name");
const popUpInputTypeDescription = document.querySelector(".popup__input_type_description");
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
const profilePopup = new PopupWithForm("#edit-popup", (data) => {
    userInfo.setUserInfo({
        name: data.name,
        about: data.about,
    });
});
profilePopup.setEventListeners();
const newCardPopup = new PopupWithForm("#new-card-popup", (data) => {
    const card = new Card({
        name: data.name,
        link: data.link
    }, "#template", (name, link) => {
        imagePopup.open(name, link);
    });
    const cardElement = card.getView();
    cardSection.addItem(cardElement);
});
newCardPopup.setEventListeners();
const userInfo = new UserInfo({
    profileTitleSelector: ".profile__title",
    profileDescriptionSelector: ".profile__description"
});
function fillProfileForm() {
    const userData = userInfo.getUserInfo();
    popUpInputTypeName.value = userData.name;
    popUpInputTypeDescription.value = userData.about;
}
function handleOpenEditModal() {
    fillProfileForm();
    profilePopup.open();
}
profileEditButton.addEventListener("click", handleOpenEditModal);
const cardSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, "#template", (name, link) => {
            imagePopup.open(name, link);
        });
        const cardElement = card.getView();
        cardSection.addItem(cardElement);
    }
}, ".cards__list");
cardSection.renderItems();
const profileAddBtn = document.querySelector(".profile__add-button");
profileAddBtn.addEventListener("click", () => {
    newCardPopup.open();
});
//# sourceMappingURL=index.js.map