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
  if (!req.body.name || !req.body.birthday || !req.body.photo || !req.body.dream) {
    return res.status(400).json({ error: 'Name, birthday, photo, and dream are required' });
  }

  const applicantData = {
    name: req.body.name,
    birthday: req.body.birthday,
    photo: req.body.photo,
    dream: req.body.dream,
    height: req.body.height,
    audition: req.body.audition,
    status: 'applicant',
    //owner: req.session.account._id,
  };

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

const editApplicant = (req, res) => {
  return Applicant.ApplicantModel.findEditable(req.params.applicantid, (err, docs) => {
    if (err) {
      return res.status(400).json({ error: 'An error occured' });
    }

    //console.log(req.csrfToken())

    const updatedApplicant = docs;

    updatedApplicant.name = req.body.name;
    updatedApplicant.birthday = req.body.birthday;
    updatedApplicant.photo = req.body.photo;
    updatedApplicant.dream = req.body.dream;
    updatedApplicant.height = req.body.height;
    updatedApplicant.audition = req.body.audition;

    const savePromise = updatedApplicant.save();

    // send back the name as a success for now
    savePromise.then(() => res.json({
      name: updatedApplicant.name,
      birthday: updatedApplicant.birthday,
      photo: updatedApplicant.photo,
      dream: updatedApplicant.dream,
      height: updatedApplicant.height,
      audition: updatedApplicant.audition,
      status: 'applicant'
    }));

    savePromise.catch((saveErr) => res.json({ saveErr }));

    return res.json({ foundApplicant: docs });
  });
};

const getApplicants = (request, response) => {
  const req = request;
  const res = response;

  return Applicant.ApplicantModel.getAll('applicant', (err, docs) => {
    if (err) {
      console.log(err);
      console.log('i hate myself 2');
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ applicants: docs });
  });
}

// const viewApplicant = (req, res) => {
//   Idol.IdolModel.findById(req.params.idolid, (err, docs) => {
//     if (err) {
//       console.log(err);
//       return res.status(400).json({ error: 'An error occured' });
//     }

//     return res.render('detail', { csrfToken: req.csrfToken(), foundIdol: docs });
//   });
// };

module.exports.getApplicants = getApplicants;
module.exports.editApplicant = editApplicant;
module.exports.makeApplicant = makeApplicant;
module.exports.applyPage = applyPage;
