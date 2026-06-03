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

initialCards.forEach(function (card) {
  console.log(card.name);
});

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

function openModal(firstModal) {
  firstModal.classList.add("popup_is-opened");
}
function closeModal(secondModal) {
  secondModal.classList.remove("popup_is-opened");
}

closePopUp.addEventListener("click", function () {
  closeModal(popUp);
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
