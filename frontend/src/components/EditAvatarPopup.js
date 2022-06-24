import PopupWithForm from './PopupWithForm';
import { useRef } from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }
    return (
        <PopupWithForm
            name="type_changeAvatar"
            title="Обновить аватар"
            btnTitle="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                className="pop-up__input pop-up__input_type_avatar"
                name="inputAvatarUrl"
                placeholder="Ссылка на картинку"
                required
                ref={avatarRef}
            />
            <span className="pop-up__error" id="inputAvatarUrl-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
