function Popup({ children, popupClassname, popupContainerClassname, closeBtnClassname, onClose }) {
    return (
        <div className={popupClassname}>
            <div className={popupContainerClassname}>
                <button className={closeBtnClassname} type="button" onClick={onClose}></button>
                {children}
            </div>
        </div>
    );
}

export default Popup;
