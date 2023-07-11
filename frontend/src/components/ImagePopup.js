import React from "react";

function ImagePopup(props) {

    function handleOverlayClick(event) {
        if (event.target === event.currentTarget) props.onClose(event);
      }

    if (props.card != null) {
        return (
            <div className={`popup img-popup ${props.card ? "popup_opened" : ""}`} onClick={handleOverlayClick}>
                <div className="img-popup__container">
                    <button type="button" className="popup__cross-button img-popup__cross-button" onClick={props.onClose}>
                        <img className="popup__cross img-popup__cross" src={require("../images/cross.svg").default} alt="(закрыть)"/>
                    </button>

                    <img className="img-popup__image" src={props.card ? props.card.link : ''} alt={`Фотография ${props.card? props.card.name : ''}`}/>
                    <p className="img-popup__text">{props.card? props.card.name : ''}</p>
                </div>
            </div>
        );
    }
}

export default ImagePopup;