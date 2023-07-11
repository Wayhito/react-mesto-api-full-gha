import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const handleClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  return (   
    <div className="element">
      <div className="element__image-field">
          <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
          {isOwn && <button className="element__remove" onClick={handleDeleteClick}></button>}
      </div>
      <div className="element__panel">
          <h2 className="element__name">{card.name}</h2>
          <div className="element__like-container">
            <button className="element__like-button" onClick={handleLikeClick}>
                <img className={isLiked ? "element__like element__like_active":"element__like"} src={require('../images/like.svg').default} alt="лайк"/>
            </button>
            <span className="element__like-counter">{card.likes.length}</span>
          </div>
      </div> 
    </div>
  );
}

export default Card;