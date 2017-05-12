const models = require('../models');

const Idol = models.Idol;

const makerPage = (req, res) => {
  Idol.IdolModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), idols: docs });
  });
};

const makeIdol = (req, res) => {
  if (!req.body.name || !req.body.birthday || !req.body.status || !req.body.talent) {
    return res.status(400).json({ error: 'Name, birthday, status, and talent are required' });
  }

  const idolData = {
    name: req.body.name,
    photo: req.body.photo,
    birthday: req.body.birthday,
    status: req.body.status,
    talent: req.body.talent,
    height: req.body.height,
    owner: req.session.account._id,
  };

  if (req.body.notes) {
    idolData.notes = req.body.notes;
  }

  const newIdol = new Idol.IdolModel(idolData);

  const idolPromise = newIdol.save();

  idolPromise.then(() => res.json({ redirect: '/maker' }));

  idolPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Profile already exists' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return idolPromise;
};

const editIdol = (req, res) => {
  return Idol.IdolModel.findEditable(req.params.idolid, (err, docs) => {
    if (err) {
      return res.status(400).json({ error: 'An error occured' });
    }

    console.log(req.csrfToken())

    const updatedIdol = docs;

    updatedIdol.name = req.body.name;
    updatedIdol.photo = req.body.photo;
    updatedIdol.birthday = req.body.birthday;
    updatedIdol.status = req.body.status;
    updatedIdol.talent = req.body.talent;
    updatedIdol.height = req.body.height;
    updatedIdol.notes = req.body.notes;

    const savePromise = updatedIdol.save();

    // send back the name as a success for now
    savePromise.then(() => res.json({
      name: updatedIdol.name,
      photo: updatedIdol.photo,
      birthday: updatedIdol.birthday,
      status: updatedIdol.status,
      talent: updatedIdol.talent,
      height: updatedIdol.height,
      notes: updatedIdol.notes
    }));

    savePromise.catch((saveErr) => res.json({ saveErr }));

    return res.json({ foundIdol: docs });
  });
};

const toggleFavorite = (req, res) => {
  return Idol.IdolModel.findEditable(req.params.idolid, (err, docs) => {
    if (err) {
      return res.status(400).json({ error: 'An error occured' });
    }

    const updatedIdol = docs;

    updatedIdol.favorite = req.params.idolfave;

    const savePromise = updatedIdol.save();

    // send back the name as a success for now
    savePromise.then(() => res.json({
      favorite: updatedIdol.favorite,
    }));

    savePromise.catch((saveErr) => res.json({ saveErr }));

    return res.json({ foundIdol: docs });
  });
};

const favoritesPage = (req, res) => {
  return res.render('favorites', { csrfToken: req.csrfToken()});
};


const getFavorites = (req, res) => {
  Idol.IdolModel.findFavorites(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ idols: docs});
  });
}

const getIdols = (request, response) => {
  const req = request;
  const res = response;

  return Idol.IdolModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ idols: docs });
  });
}

const getChosen = (req, res) => {
  Idol.IdolModel.findById(req.params.idolid, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

      return res.json({ foundIdol: docs });
  });
}

const viewIdol = (req, res) => {
  Idol.IdolModel.findById(req.params.idolid, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('detail', { csrfToken: req.csrfToken(), foundIdol: docs });
  });
};

const viewBy = (req, res) => {
  Idol.IdolModel.findBy(req.params.status, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('viewBy', {csrfToken: req.csrfToken(), foundIdols: docs });
  });
}

const getStatusGroup = (req, res) => {
  Idol.IdolModel.findSome(req.session.account._id, req.params.status, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ idols: docs});
  });
}

module.exports.makerPage = makerPage;
module.exports.getIdols = getIdols;
module.exports.make = makeIdol;
module.exports.viewIdol = viewIdol;
module.exports.editIdol = editIdol;
module.exports.getChosen = getChosen;
module.exports.toggleFavorite = toggleFavorite;
module.exports.getFavorites = getFavorites;
module.exports.favoritesPage = favoritesPage;
module.exports.viewBy = viewBy;
module.exports.getStatusGroup = getStatusGroup;
