import React from 'react';

function InfoTooltip({ isOpened, onClose, info: { icon, title } }) {
    return (
        <section className={`popup popup_info-tooltip ${isOpened ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" aria-label="Закрыть" className="popup__close-icon" onClick={onClose} />
                <img className="popup__icon" src={icon} alt='' />
                <h2 className="popup__title popup__title_bottom"> {title} </h2>
            </div>
        </section>
    );
}

export default InfoTooltip;