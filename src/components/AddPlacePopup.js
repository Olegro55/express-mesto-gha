import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from './useForm';

function AddPlacePopup({ isOpened, onClose, onAddPlace }) {

  const defaultInputs = {
    name: '',
    link: ''
  }
  const { values, handleChange, setValues } = useForm(defaultInputs);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace(values);
  }

  React.useEffect(() => {
    setValues(defaultInputs);
  }, [isOpened]);

  return (
    <PopupWithForm name="add-element" title="Новое место" buttonText="Создать" isOpened={isOpened} onClose={onClose} onSubmit={handleSubmit}>
      <fieldset className="popup__input">
        <input id="place-input" type="text" name="name" value={values.name} onChange={handleChange} className="popup__item popup__item_type_place" placeholder="Название" minLength="2" maxLength="30" required />
        <span className="place-input-error popup__input-error"></span>
        <input id="photo-input" type="url" name="link" value={values.link} onChange={handleChange} className="popup__item popup__item_type_photo" placeholder="Ссылка на картинку" required />
        <span className="photo-input-error popup__input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;