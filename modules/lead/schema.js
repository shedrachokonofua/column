const Schema = require('mongoose').Schema;
const joi = require('joi');
const crawlers = require('../../crawlers/crawlers');

module.exports = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  source: {
    type: String,
    enum: [Object.key(crawlers), 'Invalid source type.'],
    required: true
  },
  link: {
    type: String, 
    required: true,
    validate: {
      validator: link => !joi.validate(link, joi.string().uri()).error,
      message: props => `Invalid link: ${props.value}`
    }
  },
  posted: {
    type: Date,
    required: true
  },
  sourced: {
    type: Date,
    required: true
  }
});