function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup-image popup ${Object.keys(card).length !== 0 ? 'popup_opened' : ''}`}>
      <div className="popup-image__container">
        <img className="popup-image__foto" alt={card.name} src={card.link} />
        <p className="popup-image__text">{card.name}</p>
        <button type="button" aria-label="Закрыть" className="popup__close-icon" onClick={onClose} />
      </div>
    </section>
  );
}

export default ImagePopup;