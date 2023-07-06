import React from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

import api from '../utils/api';
import auth from '../utils/auth';
import success from '../images/success.png';
import error from '../images/error.png';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';

function App() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: '',
  });
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [registrationResult, setRegistrationResult] = React.useState({ icon: '', title: '' });

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    }
  }, []);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }, []);

  function handleEditProfileClick() { setEditProfilePopupOpen(true) }
  function handleEditAvatarClick() { setEditAvatarPopupOpen(true) }
  function handleAddPlaceClick() { setAddPlacePopupOpen(true) }
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({});
  }
  function handleCardClick(card) { setSelectedCard(card) }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }
  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(_ => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }
  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleUpdateUser(data) {
    function makeRequest() {
      return api.setUserInfo(data).then((userData) => { setCurrentUser(userData); });
    }
    handleSubmit(makeRequest);
  }
  function handleUpdateAvatar(data) {
    function makeRequest() {
      return api.setUserImage(data).then((userData) => { setCurrentUser(userData); });
    }
    handleSubmit(makeRequest);
  }
  function handleAddPlace(data) {
    function makeRequest() {
      return api.addCard(data).then((cardData) => { setCards([cardData, ...cards]); });
    }
    handleSubmit(makeRequest);
  }
  function handleRegistration(values) {
    auth
      .register(values)
      .then(_ => {
        setRegistrationResult({
          icon: success,
          title: 'Вы успешно зарегистрировались!'
        })
        setInfoTooltipOpen(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        setRegistrationResult({
          icon: error,
          title: 'Что-то пошло не так! Попробуйте ещё раз.'
        })
        setInfoTooltipOpen(true);
        console.error(`Ошибка: ${err}`);
      });
  }
  function handleLogin(inputs) {
    auth
      .authorize(inputs)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setEmail(inputs.email);
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }
  function handleLogout() {
    setEmail('')
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate('/');
  }

  return (
    <AppContext.Provider value={{ isLoading }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">

          <Header email={email} onLogout={handleLogout} />
          <Routes>
            <Route path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Main
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/sign-up"
              element={<Register onRegistration={handleRegistration} />}
            />

            <Route
              path="/sign-in"
              element={<Login onLogin={handleLogin} />}
            />

          </Routes>
          <Footer />

          <EditProfilePopup isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <PopupWithForm name="confirm-deletion" title="Вы уверены?" buttonText="Да" />

          <AddPlacePopup isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip isOpened={isInfoTooltipOpen} onClose={closeAllPopups} info={registrationResult} />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;