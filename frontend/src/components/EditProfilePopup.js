import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup( {isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  }

  const handleDescriptionChange = (evt)=>{
    setDescription(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return(
    <PopupWithForm
        title="Редактировать профиль" 
        name="profile" 
        isOpen = {isOpen} 
        onClose = {onClose} 
        onSubmit = {handleSubmit}
        buttonText = "Сохранить">

            <input className="popup__input profile-popup__input profile-popup__input_type_name" 
            id="name-input" minLength="2" maxLength="40" type="text" name="name" placeholder="Пример: имя" value={name} required onChange={handleNameChange} />
            <span className="popup__input-error name-input-error"></span>

            <input className="popup__input profile-popup__input profile-popup__input_type_job" 
            id="job-input" minLength="2" maxLength="200" type="text" name="job" placeholder="Пример: работа" value={description} required onChange={handleDescriptionChange}/>
            <span className="popup__input-error job-input-error"></span>

    </PopupWithForm>
  );
}

export default EditProfilePopup;