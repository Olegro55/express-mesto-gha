import React from 'react';
import { AppContext } from '../contexts/AppContext';

function PopupWithForm({isOpened, name, title, buttonText, loadindText='Сохранение...', children, onClose, onSubmit }) {

  const app = React.useContext(AppContext);

  return (
    <section className={`popup popup_${name} ${isOpened ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" aria-label="Закрыть" className="popup__close-icon" onClick={onClose}/>
        <h2 className="popup__title"> {title} </h2>
        <form className="popup__form" name={`${name}_form`} onSubmit={onSubmit}>
          {children}
          <button type="submit" aria-label={buttonText} className="popup__button">{app.isLoading ? loadindText : buttonText}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;