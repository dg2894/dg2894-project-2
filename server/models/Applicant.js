const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const _ = require('underscore');

let ApplicantModel = {};

//const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const ApplicantSchema = new mongoose.Schema({
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
    required: true,
  },

  height: {
    type: Number,
  },

  dream: {
    type: String,
    required: true,
  },

  audition: {
    type: String,
  },

  status: {
    type: String,
    default: 'applicant',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

ApplicantSchema.statics.getAll = (status, callback) => {
  const search = {
    status: status,
  };

  return ApplicantModel.find(search).select('name birthday photo height dream audition').exec(callback);
}

ApplicantModel = mongoose.model('Applicant', ApplicantSchema);

module.exports.ApplicantModel = ApplicantModel;
module.exports.ApplicantSchema = ApplicantSchema;
