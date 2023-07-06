import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const likesCount = card.likes.length;
  const cardLikeButtonClassName = (
    `element__heart ${isLiked && 'element__heart_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="element">
      <img className="element__foto" alt={card.name} src={card.link} onClick={handleClick} />
      <div className="element__bottom">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__like">
          <button type="button" aria-label="Лайк" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
          <p className="element__like-counter">{likesCount !== 0 && likesCount}</p>
        </div>
      </div>
      {isOwn && <button type="button" aria-label="Удаление" className="element__delete" onClick={handleDeleteClick}/>}
    </div>
  );
}

export default Card;