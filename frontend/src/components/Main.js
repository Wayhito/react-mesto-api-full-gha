import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from "./Card.js";
import Header from "./Header.js";

function Main({cards, onEditProfile, onEditAvatar, onNewLocation, onCardClick, onCardLike, onCardDelete, email, onLogout,}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <Header>
        <p className="header__menu-item">{email}</p>
        <button href="#" className="header__menu-item" onClick={onLogout}>Выйти</button>
      </Header>

      <section className="profile">
        <div className="profile__image-container">
          <img className="profile__image" src={currentUser.avatar} alt="Картинка профиля"/>
          <button className="profile__image-button" onClick={onEditAvatar}
          ></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" onClick={onEditProfile}>
            <img className="profile__pen" src={require("../images/editbuttonpen.svg").default} alt="редактировать"/>
          </button>
          <p className="profile__job">{currentUser.about}</p>
        </div>

        <button className="profile__add-button" onClick={onNewLocation}>
          <img className="profile__plus" src={require("../images/addbutton.svg").default} alt="добавить"/>
        </button>
      </section>

      <section className="elements">

          {
            cards.map((card) =>
              <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
            )
          }

      </section>
    </main>
  );
}

export default Main;

//123