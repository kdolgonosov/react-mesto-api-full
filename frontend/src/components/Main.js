import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    cards,
    onCardLike,
    onCardDelete,
    profileEditBtnClassname,
}) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-wrapper" onClick={onEditAvatar}>
                    {currentUser.avatar && (
                        <img
                            className="profile__avatar"
                            src={currentUser.avatar}
                            alt="Аватар профиля"
                        />
                    )}
                </div>
                <div className="profile__info">
                    <h1 className="profile__info-item-name">{currentUser.name}</h1>
                    <h2 className="profile__info-item-profession">{currentUser.about}</h2>
                </div>
                <button
                    className={profileEditBtnClassname}
                    type="button"
                    onClick={onEditProfile}
                ></button>
                <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                ))}
            </section>
        </main>
    );
}
export default Main;
