import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from './useForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpened, onClose, onUpdateUser }) {
  
  const defaultInputs = {
    name: '',
    about: ''
  };
  const { values, handleChange, setValues } = useForm(defaultInputs);

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about
    });
  }, [currentUser, isOpened]);

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateUser(values);
  } 

  return (
    <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить" isOpened={isOpened} onClose={onClose} onSubmit={handleSubmit}>
      <fieldset className="popup__input">
        <input id="name-input" type="text" name="name" value={values.name} onChange={handleChange} className="popup__item popup__item_type_name" placeholder="Ваше имя" minLength="2" maxLength="40" required />
        <span className="name-input-error popup__input-error"></span>
        <input id="about-input" type="text" name="about" value={values.about} onChange={handleChange} className="popup__item popup__item_type_about" placeholder="О себе" minLength="2" maxLength="200" required />
        <span className="about-input-error popup__input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;