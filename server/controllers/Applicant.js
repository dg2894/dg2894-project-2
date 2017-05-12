const models = require('../models');

const Applicant = models.Applicant;

const applyPage = (request, response) => {
  const req = request;
  const res = response;

  Applicant.ApplicantModel.getAll('applicant', (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('apply', { csrfToken: req.csrfToken(), applicants: docs });
  });
}

const makeApplicant = (req, res) => {
  if (!req.body.name || !req.body.birthday || !req.body.dream || !req.body.audition) {
    return res.status(400).json({ error: 'Name, birthday, dream, and audition are required' });
  }

  const applicantData = {
    name: req.body.name,
    birthday: req.body.birthday,
    dream: req.body.dream,
    height: req.body.height,
    audition: req.body.audition,
    status: 'applicant',
  };

  if (req.body.photo) {
    applicantData.photo = req.body.photo;
  }

  const newApplicant = new Applicant.ApplicantModel(applicantData);

  const applicantPromise = newApplicant.save();

  applicantPromise.then(() => res.json({ redirect: '/maker' }));

  applicantPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Profile already exists' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return applicantPromise;
};

const getApplicants = (request, response) => {
  const req = request;
  const res = response;

  return Applicant.ApplicantModel.getAll('applicant', (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ applicants: docs });
  });
}

module.exports.getApplicants = getApplicants;
module.exports.makeApplicant = makeApplicant;
module.exports.applyPage = applyPage;
