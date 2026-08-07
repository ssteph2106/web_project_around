//import { enableValidation, resetValidation } from "./validate.js";
import { defaultFormConfig } from "./utils/constants.js";
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { Api } from "./components/Api.js";
import type { UserFormData, CardFormData, AvatarFormData } from "./components/Types.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
//enableValidation();

const api = new Api ({
baseUrl: "https://around-api.es.tripleten-services.com/v1",
headers: {
  authorization: "505ac80d-2e69-4592-83aa-84629eb57336",
  "Content-Type": "application/json",
},
});

//const initialCards = [
//  {
//    name: "Valle de Yosemite",
//    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
//  },
//  {
//    name: "Lago Louise",
//    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
//  },
//  {
//    name: "Montañas Calvas",
//    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
 // },
 // {
   // name: "Latemar",
   // link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
//  },
  // {
  //  name: "Parque Nacional de la Vanoise",
  //  link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
//  },
 // {
//    name: "Lago di Braies",
//    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
//  },
//];

const profileEditButton = document.querySelector(".profile__edit-button") as HTMLButtonElement;
const popUpInputTypeName = document.querySelector(".popup__input_type_name") as HTMLInputElement;
const popUpInputTypeDescription = document.querySelector(".popup__input_type_description") as HTMLInputElement;
const profileAvatarEditButton = document.querySelector(".profile__avatar-edit-button") as HTMLButtonElement;
const editForm = document.querySelector("#edit-profile-form") as HTMLFormElement;
const newCardForm = document.querySelector("#new-card-form") as HTMLFormElement;
const avatarForm = document.querySelector("#avatar-form") as HTMLFormElement;

const editFormValidator = new FormValidator(
  defaultFormConfig,
  editForm,
);

editFormValidator.enableValidation();

const avatarFormValidator = new FormValidator (
  defaultFormConfig,
  avatarForm,
);

avatarFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(
  defaultFormConfig,
  newCardForm,
);

newCardFormValidator.enableValidation();

const imagePopup = new PopupWithImage ("#image-popup");

imagePopup.setEventListeners();

const deletePopup = new PopupWithConfirmation("#delete-popup");
deletePopup.setEventListeners();

const profilePopup = new PopupWithForm<UserFormData>(
  "#edit-popup",
  async (data) => {
    profilePopup.renderLoading(true);
  try {
    const updatedUser = await api.editUserInfo(data);

    userInfo.setUserInfo({
      _id: updatedUser._id,
      name: updatedUser.name,
      about: updatedUser.about,
      avatar: updatedUser.avatar,
    });

    profilePopup.close();

  } catch (err) {
    console.error(err);
  } finally {
    profilePopup.renderLoading(false);
  }
})

profilePopup.setEventListeners();

const newCardPopup = new PopupWithForm<CardFormData>(
  "#new-card-popup",
async (data) => {
  newCardPopup.renderLoading(true);
  
try {  
const newCard = await api.addCard(data);
const card = new Card(
  newCard,
  "#template",
  (name, link) => {
    imagePopup.open(name, link);
  },
  userInfo.getUserId(),
async (card: Card, isLiked: boolean) => {
  try {
let updatedCard;
    if (isLiked) {
    updatedCard = await api.deleteCardLike(card.getId());
    } else {
    updatedCard=await api.likeCard(card.getId());
    }
    card.updateLikes(updatedCard.isLiked);
  } catch (err) {
    console.error(err);
  }
},
  (card: Card) => {

   deletePopup.setSubmitAction(async () => {
await api.deleteCard(card.getId());

card.deleteCard();

deletePopup.close()
   });
   deletePopup.open();
  }
);

  const cardElement = card.getView();
  cardSection.addItem(cardElement);

  newCardFormValidator.resetValidation();
  newCardPopup.close();
        } catch (err: unknown) {
          console.error(err);
        } finally {
  newCardPopup.renderLoading(false);
        }
      })       

newCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm<AvatarFormData>(
"#avatar-popup",
async (data) => {
  avatarPopup.renderLoading(true);
  try {
    const updateUser = await api.updateAvatar(data);
    userInfo.setUserInfo(updateUser);

    avatarPopup.close();

  }catch (err) {
    console.error(err);
} finally {
    avatarPopup.renderLoading(false);
  }
}
);
avatarPopup.setEventListeners(); 

profileAvatarEditButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});

const userInfo = new UserInfo ({
  profileTitleSelector: ".profile__title", 
  profileDescriptionSelector: ".profile__description",
profileAvatarSelector: ".profile__image"});

function fillProfileForm() {
const userData = userInfo.getUserInfo();  
popUpInputTypeName.value = userData.name;
popUpInputTypeDescription.value = userData.about;
}

function handleOpenEditModal() {
  fillProfileForm();
    editFormValidator.resetValidation();
  profilePopup.open();
}

profileEditButton.addEventListener("click", handleOpenEditModal);

const cardSection = new Section(
{
    items: [],
    renderer: (item) => {
        const card = new Card(
            item,
            "#template",
            (name, link) => {
               imagePopup.open(name, link);
            },
            userInfo.getUserId(),
            async (card: Card, isLiked: boolean) => {
  try {
    let updatedCard;
    if (isLiked) {
    updatedCard = await api.deleteCardLike(card.getId());
    } else {
    updatedCard=await api.likeCard(card.getId());
    }
    card.updateLikes(updatedCard.isLiked);
  } catch (err) {
    console.error(err);
  }
  }, 
  (card: Card) => {

   deletePopup.setSubmitAction(async () => {
await api.deleteCard(card.getId());

card.deleteCard();

deletePopup.close()
   });
   deletePopup.open();
  }
);
      const cardElement = card.getView();  
      cardSection.addItem(cardElement);
    }
},
".cards__list"
);

const profileAddBtn = document.querySelector(".profile__add-button") as HTMLButtonElement;

profileAddBtn.addEventListener("click", () => {
  newCardFormValidator.resetValidation();
  newCardPopup.open();
});

async function loadPage(): Promise<void> {
  try {
const [userData, initialCards] = await Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
  ]);

  console.log(initialCards[0]);

  userInfo.setUserInfo({
    name: userData.name,
    about: userData.about,
    avatar: userData.avatar,
    _id: userData._id,
  });

  cardSection.setItems(initialCards);
  cardSection.renderItems()

  } catch (err: unknown) {
    console.log(err)
  }
};

loadPage();



