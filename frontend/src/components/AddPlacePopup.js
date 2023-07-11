import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [name, setName] =  React.useState('');
  const [link, setLink] = React.useState('');

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  }

  const handleLinkChange = (evt) => {
    setLink(evt.target.value);
  }

  const handleAddPlaceSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({name, link});
  }

  React.useEffect(() => {
    if (!isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen])

  return (
    <PopupWithForm
        title="Новое место" 
        name="add" 
        isOpen = {isOpen} 
        onClose = {onClose} 
        onSubmit = {handleAddPlaceSubmit}
        buttonText = "Создать">

          <input className="popup__input add-popup__input add-popup__input_type_name" id="title-input" minLength="2" maxLength="30" 
          type="text" name="name" placeholder="Пример: название" value={name} required onChange={handleNameChange} />
          <span className="popup__input-error title-input-error"></span>

          <input className="popup__input add-popup__input add-popup__input_type_link" id="link-input" 
          type="url" name="link" placeholder="Пример: ссылка" value={link} required onChange={handleLinkChange} />
          <span className="popup__input-error link-input-error"></span>

        </PopupWithForm>
  );
}

export default AddPlacePopup;