import PopupWithForm from './PopupWithForm';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);
    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);
    return (
        <PopupWithForm
            name="type_edit"
            title="Редактировать профиль"
            btnTitle="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                className="pop-up__input pop-up__input_type_name"
                name="inputName"
                placeholder="Имя"
                required
                minLength="2"
                maxLength="40"
                onChange={handleNameChange}
                value={name}
            />
            <span className="pop-up__error" id="inputName-error"></span>
            <input
                type="text"
                className="pop-up__input pop-up__input_type_profession"
                name="inputProfession"
                placeholder="О себе"
                required
                minLength="2"
                maxLength="200"
                onChange={handleDescriptionChange}
                value={description}
            />
            <span className="pop-up__error" id="inputProfession-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
