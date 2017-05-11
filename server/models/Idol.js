const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const _ = require('underscore');

let IdolModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const IdolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  birthday: {
    type: String,
    required: true,
  },

  photo: {
    type: String,
  },

  status: {
    type: String,
    required: true,
  },

  talent: {
    type: String,
    required: true,
  },

  height: {
    type: Number,
  },

  notes: {
    type: String,
  },

  favorite: {
    type: Boolean,
    default: false,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

IdolSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return IdolModel.find(search).select('name photo birthday status talent').exec(callback);
};

IdolSchema.statics.findFavorites = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
    favorite: true,
  };

  return IdolModel.find(search).select('name photo birthday status talent').exec(callback);
};


IdolSchema.statics.findById = (idolId, callback) => {
  const search = {
    _id: idolId,
  };

   return IdolModel.find(search).select('_id name photo birthday status talent height notes favorite').exec(callback);
};

IdolSchema.statics.findEditable = (idolId, callback) => {
  const search = {
    _id: idolId,
  };

   return IdolModel.findOne(search, callback);
};

IdolSchema.statics.findBy = (attr, callback) => {
  const search = {
    status: attr,
  };

   return IdolModel.findOne(search, callback);
};

IdolSchema.statics.findSome = (ownerId, status, callback) => {
  const search = {
    owner: convertId(ownerId),
    status: status,
  };

   return IdolModel.find(search).select('_id photo name age status talent').exec(callback);
};

IdolModel = mongoose.model('Idol', IdolSchema);

module.exports.IdolModel = IdolModel;
module.exports.IdolSchema = IdolSchema;
