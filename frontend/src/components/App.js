import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import { useState, useEffect } from 'react';
import authApi from '../utils/AuthApi';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import { Switch, Route, useHistory } from 'react-router-dom';

function App() {
    const [selectedCard, setSelectedCard] = useState(null);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentEmail, setCurrentEmail] = useState(null);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const history = useHistory();
    useEffect(() => {
        authApi.verifyToken().then((res) => {
            setLoggedIn(true);
            setCurrentEmail(res.email);
            history.push('/');
        });
    }, []);
    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getProfile(), api.getInitialCards()])
                .then(([profileInfo, cards]) => {
                    setCurrentUser({
                        _id: profileInfo._id,
                        name: profileInfo.name,
                        about: profileInfo.about,
                        avatar: profileInfo.avatar,
                    });
                    setCards(cards.data);
                })
                .catch((err) => console.log('Ошибка', err));
        }
    }, [loggedIn]);

    const handleCardLike = (card) => {
        const isLiked = card.likes.some((i) => i === currentUser._id);
        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        });
    };
    const handleCardDelete = (card) => {
        api.deleteCard(card._id).then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        });
    };
    const handleAddPlaceSubmit = ({ name, link }) => {
        api.addCard(name, link).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        });
    };
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };
    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    };
    const handleUpdateUser = ({ name, about }) => {
        api.editProfile(name, about).then((res) => {
            setCurrentUser({
                ...currentUser,
                name: res.name,
                about: res.about,
            });
            closeAllPopups();
        });
    };
    const handleUpdateAvatar = ({ avatar }) => {
        api.changeAvatar(avatar).then((res) => {
            setCurrentUser({
                ...currentUser,
                avatar: res.avatar,
            });
            closeAllPopups();
        });
    };
    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setSelectedCard(null);
    };
    const handleLogin = (email, password) => {
        authApi
            .signIn(email, password)
            .then((res) => {
                if (res === undefined) {
                    setLoggedIn(true);
                    setCurrentEmail(email);
                    history.push('/');
                }
            })
            .catch((err) => console.log('Ошибка', err));
    };

    const handleRegister = () => {
        history.push('/sign-in');
    };
    const onSignOut = () => {
        setLoggedIn(false);
        setCurrentEmail(null);
        setMobileMenuActive(false);
        localStorage.removeItem('jwt');
        history.push('/sign-in');
    };
    const toggleMobileMenu = () => {
        setMobileMenuActive(!mobileMenuActive);
    };
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <Switch>
                    <ProtectedRoute exact path='/' loggedIn={loggedIn}>
                        <Header
                            headerClassname={mobileMenuActive ? 'header header-active' : 'header'}
                            headerLogoClassname={
                                mobileMenuActive
                                    ? 'header__logo header__logo-active'
                                    : 'header__logo'
                            }
                        >
                            <div
                                className={
                                    mobileMenuActive
                                        ? 'header-wrapper header-wrapper-active'
                                        : 'header-wrapper'
                                }
                            >
                                <span
                                    className={
                                        mobileMenuActive
                                            ? 'header__email header__email-active'
                                            : 'header__email'
                                    }
                                >
                                    {currentEmail}
                                </span>
                                <a className='header__btn' onClick={onSignOut}>
                                    Выйти
                                </a>
                            </div>
                            <a
                                className={
                                    mobileMenuActive
                                        ? 'header__menu header__menu-active'
                                        : 'header__menu'
                                }
                                href='#'
                                onClick={toggleMobileMenu}
                            ></a>
                        </Header>
                        <Main
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            profileEditBtnClassname={
                                mobileMenuActive
                                    ? 'profile__edit-button profile__edit-button-active'
                                    : 'profile__edit-button'
                            }
                        />
                        <Footer />

                        <EditProfilePopup
                            isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}
                            onUpdateUser={handleUpdateUser}
                        />

                        <AddPlacePopup
                            isOpen={isAddPlacePopupOpen}
                            onClose={closeAllPopups}
                            onAddPlace={handleAddPlaceSubmit}
                        />
                        <EditAvatarPopup
                            isOpen={isEditAvatarPopupOpen}
                            onClose={closeAllPopups}
                            onUpdateAvatar={handleUpdateAvatar}
                        />
                        <PopupWithForm name='type_confirm' title='Вы уверены?' btnTitle='Да' />

                        <ImagePopup
                            card={selectedCard}
                            isOpen={isImagePopupOpen}
                            onClose={closeAllPopups}
                        />
                    </ProtectedRoute>

                    <Route path='/sign-up'>
                        <Register handleRegister={handleRegister} />
                    </Route>

                    <Route path='/sign-in'>
                        <Login handleLogin={handleLogin} />
                    </Route>
                </Switch>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
