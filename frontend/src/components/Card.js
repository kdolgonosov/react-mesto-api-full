import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id || card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = `${isOwn ? 'elements__delete-btn' : ''}`;

    function handleLikeClick() {
        onCardLike(card);
    }
    function handleClick() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    const isLiked = card.likes.some((i) => i === currentUser._id);
    const cardLikeButtonClassName = `${
        isLiked ? 'elements__footer-like elements__footer-like-active' : 'elements__footer-like'
    }`;
    return (
        <div className='elements__item'>
            {isOwn && (
                <button
                    className={cardDeleteButtonClassName}
                    type='button'
                    onClick={handleDeleteClick}
                ></button>
            )}
            <img
                className='elements__picture'
                src={card.link}
                onClick={handleClick}
                alt={card.name}
            />
            <div className='elements__footer'>
                <h4 className='elements__footer-caption'>{card.name}</h4>
                <div className='elements__footer-like-wrapper'>
                    <button
                        className={cardLikeButtonClassName}
                        type='button'
                        onClick={handleLikeClick}
                    ></button>
                    <span className='elements__footer-like-counter'>{card.likes.length}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;
