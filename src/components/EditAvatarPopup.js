import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpened, onClose, onUpdateAvatar }) {

    const inputRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }

    return (
        <PopupWithForm name="edit-profile-image" title="Обновить аватар" buttonText="Сохранить" isOpened={isOpened} onClose={onClose} onSubmit={handleSubmit}>
            <fieldset className="popup__input">
                <input id="image-input" type="url" name="avatar" ref={inputRef} className="popup__item popup__item_type_image" placeholder="Ссылка на картинку" required />
                <span className="image-input-error popup__input-error"></span>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;