import Popup from './Popup';
function ImagePopup({ card, isOpen, onClose }) {
    return (
        <Popup
            popupClassname={`pop-up pop-up_type_picture ${isOpen && 'pop-up_shown'}`}
            popupContainerClassname="pop-up__picture-container"
            closeBtnClassname="pop-up__close-btn pop-up__close-btn_type_picture pop-up-picture-close-btn"
            onClose={onClose}
        >
            <img
                className="pop-up__illustration"
                src={isOpen ? card.link : ''}
                alt={isOpen ? card.name : ''}
            />
            <p className="pop-up__caption">{isOpen ? card.name : ''}</p>
        </Popup>
    );
}

export default ImagePopup;
