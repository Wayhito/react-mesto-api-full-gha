import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import Footer from './Footer.js';
//import Header from './Header.js';
import Main from './Main.js';

import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import InfoTooltip from "./InfoTooltip.js";

import { api } from "../utils/Api.js";
import auth from "../utils/auth";


import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";

function App() {
  
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    "name":'',
    "about": '',
    "avatar": '',
    "_id": '',
    "cohort": ''
  });
  const [infoMessage, setInfoMessage] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  //Эффектс

  React.useEffect(() => {
    Promise.all([
      /*Данные Пользователя*/
      api.getUserInfo(),
      /*Список карточек*/
      api.getInitialCards()
    ])
    
    .then((values) => {
        setCurrentUser(values[0]);
        setCards([...values[1]]);  
      })
      
      .catch((err) => {
        console.log(err);
      });

  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth.checkToken(token)

        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          navigate("/");
        })

        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);
  
  //Edit-Profile

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  //Edit-Avatar

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  //Add-Card

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleAddPlace = (objNewCard) => {
    api.addNewCard(objNewCard)

    .then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })

    .catch((err) => {
      console.log(err);
    });
  }

  //Card-Delete

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)

    .then(res => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })

    .catch((err) => {
      console.log(err);
    });
  }
  
  // Image-Popup

  const handleCardClick  = (card) => {
    setSelectedCard(card);
  }

  //Update-User

  const handleUpdateUser = (objUserInfo) => {
    api.setUserInfo(objUserInfo)

    .then(updatedUser => {
      setCurrentUser(updatedUser);
      closeAllPopups();
    })

    .catch((err) => {
      console.log(err);
    });
  }

  //Update-Avatar

  const handleUpdateAvatar = (link) => {
    api.editAvatar(link)

    .then(updatedUser => {
      setCurrentUser(updatedUser);
      closeAllPopups();
    })

    .catch((err) => {
      console.log(err);
    });
  }

  //Close-Popups

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoMessage(null);
  }

  //Like-Card

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)

      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })

      .catch((err) => {
        console.log(err);
      });
  }


  //Авторизация

  const defaultValues = {
    email: "",
    password: "",
  };

  const [inputs, setInputs] = React.useState(defaultValues);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  function resetForm() {
    setInputs({ ...defaultValues });
  }

  function handleAuthorize(inputs) {
    auth.authorize(inputs)

      .then(res => {
        if (res.token) localStorage.setItem('token', res.token);
        resetForm();
        handleLogin();
        navigate("/");
      })

      .catch((err) => {
        const text = err.message || "Что-то пошло не так! Попробуйте еще раз.";
        
        handleShowInfoMessage({
          text: text,
          isSuccess: false,
        });

      });
  }

  function handleRegistration(inputs) {
    auth.register(inputs)

      .then((res) => {
        handleShowInfoMessage({
          text: "Вы успешно зарегистрировались!",
          isSuccess: true,
        });
        resetForm();
        navigate("/sign-in");
      })
      
      .catch((err) => {
        const text = err.message || "Что-то пошло не так! Попробуйте еще раз.";

        handleShowInfoMessage({
          text: text,
          isSuccess: false,
        });
        
      });
  }

  // Show-Info

  function handleShowInfoMessage(message) {
    setInfoMessage(message);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content">

        <Routes>
          <Route path="/" element={
              <ProtectedRoute LoggedIn={isLoggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onNewLocation={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  email={email}
                  onLogout={handleLogout}
                />
              </ProtectedRoute>
            }
          />

          <Route path="/sign-up" element={<Register handleRegistration={handleRegistration} />}/>

          <Route path="/sign-in" element={<Login handleAuthorize={handleAuthorize} />}/>

          <Route path="*" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in"/>}/>

        </Routes>
        <Footer/>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} /> 

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups} onAddPlace={handleAddPlace}/>

        <PopupWithForm title="Вы уверены?" name="confirm" children={<><button className="popup__submit confirm-popup__submit" type="submit">Да</button></>}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 

        <InfoTooltip message={infoMessage} onClose={closeAllPopups} />

      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
