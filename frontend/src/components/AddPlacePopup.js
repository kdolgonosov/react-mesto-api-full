import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);
    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link,
        });
    }
    return (
        <PopupWithForm
            name="type_add"
            title="Новое место"
            btnTitle="Добавить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                className="pop-up__input pop-up__input_type_title"
                name="inputTitle"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
                onChange={handleNameChange}
                value={name}
            />
            <span className="pop-up__error" id="inputTitle-error"></span>
            <input
                type="url"
                className="pop-up__input pop-up__input_type_url"
                name="inputUrl"
                placeholder="Ссылка на картинку"
                required
                onChange={handleLinkChange}
                value={link}
            />
            <span className="pop-up__error" id="inputUrl-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
