import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarLink = React.useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar(avatarLink.current.value);
  }

  return (
    <PopupWithForm
        title="Обновить аватар" 
        name="avatar" 
        isOpen = {isOpen} 
        onClose = {onClose}
        onSubmit = {handleSubmit}
        buttonText = "Сохранить">
        
            <input ref={avatarLink} className="popup__input avatar-popup__input avatar-popup__input_type_link" id="avatar-input" minLength="2" maxLength="200" type="url" name="link" placeholder="Пример: ссылка" required/>
            <span className="popup__input-error avatar-input-error"></span>

    </PopupWithForm>
  );
}

export default EditAvatarPopup;