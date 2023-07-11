const express = require('express');
const { celebrate, Joi } = require('celebrate');

const { validateObjectId } = require('../utils/validateObjectId');

const {
  receiveCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const paramsValidationConfig = {
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(validateObjectId),
  }),
};

const cards = express.Router();

cards.get('/', receiveCards);

cards.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .regex(/https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
    }),
  }),
  createCard,
);

cards.delete('/:cardId', celebrate(paramsValidationConfig), deleteCard);

cards.put('/:cardId/likes', celebrate(paramsValidationConfig), likeCard);

cards.delete('/:cardId/likes', celebrate(paramsValidationConfig), dislikeCard);

module.exports = { cards };
