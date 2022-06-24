import FormWithTitle from './FormWithTitle';
import Popup from './Popup';
function PopupWithForm({ name, title, btnTitle, isOpen, onClose, children, onSubmit }) {
    return (
        <Popup
            popupClassname={`pop-up pop-up_${name} ${isOpen && 'pop-up_shown'}`}
            popupContainerClassname="pop-up__container"
            closeBtnClassname="pop-up__close-btn pop-up-edit-close-btn"
            onClose={onClose}
        >
            <FormWithTitle
                titleClassName="pop-up__title"
                title={title}
                formClassName="pop-up__form editForm"
                name={name}
                onSubmit={onSubmit}
                submitBtnClassName="pop-up__submit-btn"
                btnTitle={btnTitle}
            >
                {children}
            </FormWithTitle>
        </Popup>
    );
}

export default PopupWithForm;
