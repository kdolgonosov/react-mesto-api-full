import successPicture from '../styles/images/infotooltip-success.svg';
import failPicture from '../styles/images/infotooltip-fail.svg';
import Popup from './Popup';
function InfoTooltip({ isOpen, onClose, resIsOk }) {
    const pictureStyle = {
        width: '120px',
        height: '120px',
        marginTop: '30px',
    };
    const captionStyle = {
        width: '358px',
        fontSize: '24px',
        fontWeight: '900',
        lineHeight: '29.05px',
        textAlign: 'center',
    };
    return (
        <Popup
            popupClassname={`pop-up ${isOpen && 'pop-up_shown'}`}
            popupContainerClassname="pop-up__container"
            closeBtnClassname="pop-up__close-btn"
            onClose={onClose}
        >
            <img
                style={pictureStyle}
                src={resIsOk ? successPicture : failPicture}
                alt={resIsOk ? 'Success Picture' : 'Fail Picture'}
            />
            <p style={captionStyle}>
                {resIsOk
                    ? 'Вы успешно зарегистрировались!'
                    : 'Что-то пошло не так! Попробуйте ещё раз.'}
            </p>
        </Popup>
    );
}

export default InfoTooltip;
