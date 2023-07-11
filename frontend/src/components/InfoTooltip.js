function InfoTooltip({ message, onClose }) {

    function handleOverlayClick(event) {
      if (event.target === event.currentTarget) onClose(event);
    }
  
    return (
      <div className={`popup info-popup` + (message ? " popup_opened" : "")} onClick={handleOverlayClick}>
          <button type="button" className={`popup__cross-button info-popup__cross-button`} onClick={onClose}>
            <img className={`popup__cross info-popup__cross`} src={require('../images/cross.svg').default} alt="(закрыть)"/>
          </button>

        <div className="popup__container info-popup__container content__element">
          <p className={"popup__info-message" + (message ? message.isSuccess ? " popup__info-message_type_success" : " popup__info-message_type_fail": "")}>
            {message ? message.text : " "}
          </p>
        </div>
      </div>
    );
  }
  
  export default InfoTooltip;