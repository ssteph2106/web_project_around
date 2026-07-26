import { enableValidation, resetValidation } from "./validate.js";

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
const popUp = document.querySelector("#edit-popup");
const closePopUp = popUp.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popUpInputTypeName = document.querySelector(".popup__input_type_name");
const popUpInputTypeDescription = document.querySelector(
  ".popup__input_type_description",
);
const popUpForm = document.querySelector(".popup__form");
const formElement = document.querySelector("#edit-profile-form");
const imagePopUpId = document.querySelector("#image-popup");
const popUpImage = document.querySelector(".popup__image");
const popUpCaption = document.querySelector(".popup__caption");
const popUpCloseBtn = imagePopUpId.querySelector(".popup__close");

function openModal(firstModal) {
  firstModal.classList.add("popup_is-opened");
}
function closeModal(secondModal) {
  secondModal.classList.remove("popup_is-opened");
  const formElement = secondModal.querySelector(".popup__form");
  if (formElement !== null) {
    resetValidation(formElement);
  }
}


closePopUp.addEventListener("click", function () {
  closeModal(popUp);
});

popUpCloseBtn.addEventListener("click", () => {
  closeModal(imagePopUpId);
});

function fillProfileForm() {
  popUpInputTypeName.value = profileTitle.textContent;
  popUpInputTypeDescription.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(popUp);
}

profileEditButton.addEventListener("click", handleOpenEditModal);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popUpInputTypeName.value;
  profileDescription.textContent = popUpInputTypeDescription.value;
  closeModal(popUp);
}

formElement.addEventListener("submit", handleProfileFormSubmit);

const cardTemplate = document
  .querySelector("#template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardName = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeletebtn = cardElement.querySelector(".card__delete-button");

  cardLikeBtn.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-button_is-active");
  });

  cardDeletebtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", (evt) => {
    popUpImage.alt = name;
    popUpCaption.textContent = name;
    popUpImage.src = link;
    openModal(imagePopUpId);
  });

  cardName.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  return cardElement;
}

function renderCard(cardsList, name, link) {
  cardsList.prepend(getCardElement(name, link));
}

initialCards.forEach(function (card) {
  renderCard(cardsList, card.name, card.link);
});

const profileAddBtn = document.querySelector(".profile__add-button");
const newCardPopUp = document.querySelector("#new-card-popup");
const newPopUpForm = document.querySelector("#new-card-form");
const savePopUpBtn = document.querySelector("#new-card-popup .popup__button");
const closePopUpBtn = document.querySelector("#new-card-popup .popup__close");
const popUpInputTypeCardName = document.querySelector(
  ".popup__input_type_card-name",
);
const popUpInputTypeUrl = document.querySelector(".popup__input_type_url");

profileAddBtn.addEventListener("click", function () {
  openModal(newCardPopUp);
});
closePopUpBtn.addEventListener("click", function () {
  closeModal(newCardPopUp);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(cardsList, popUpInputTypeCardName.value, popUpInputTypeUrl.value);
  closeModal(newCardPopUp);
}

newPopUpForm.addEventListener("submit", handleCardFormSubmit);

const popUpOverlay = () => {
  const popUpList = Array.from(document.querySelectorAll(".popup"));
  popUpList.forEach((popUpElement) => {
    popUpElement.addEventListener("click", function (evt) {
      if (evt.target === evt.currentTarget) {
        closeModal(popUpElement);
      }
    });
  });
};
popUpOverlay();

const popUpKeyDown = () => {
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      const popUpOpened = document.querySelector(".popup_is-opened");
      if (popUpOpened) {
        closeModal(popUpOpened);
      }
    }
  });
};
popUpKeyDown();
