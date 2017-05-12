const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getIdols', mid.requiresSecure, controllers.Idol.getIdols);
  app.post('/favorite/:idolid/:idolfave', mid.requiresLogin, mid.requiresSecure, controllers.Idol.toggleFavorite);
  app.get('/view/:idolid', mid.requiresSecure, controllers.Idol.viewIdol);
  app.get('/getChosen/:idolid', mid.requiresSecure, controllers.Idol.getChosen);
  app.get('/applicants', mid.requiresSecure, mid.requiresLogin, controllers.Account.applicantsPage);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/apply', mid.requiresSecure, mid.requiresLogout, controllers.Applicant.applyPage);
  app.get('/getApplicants', mid.requiresSecure, controllers.Applicant.getApplicants);
  app.get('/favorites', mid.requiresSecure, mid.requiresLogin, controllers.Idol.favoritesPage);
  app.get('/getFavorites', mid.requiresSecure, mid.requiresLogin, controllers.Idol.getFavorites);
  app.post('/createApplicant', mid.requiresSecure, mid.requiresLogout, controllers.Applicant.makeApplicant);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/settingsPage', mid.requiresLogin, controllers.Account.settingsPage);
  app.get('/maker', mid.requiresLogin, controllers.Idol.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Idol.make);
  app.post('/edit/:idolid', mid.requiresSecure, mid.requiresLogin, controllers.Idol.editIdol);
  app.get('/viewBy/:status', mid.requiresSecure, controllers.Idol.viewBy);
  app.get('/getAll/:status', mid.requiresSecure, controllers.Idol.getStatusGroup);
  app.get('/accountInfo', mid.requiresSecure, mid.requiresLogin, controllers.Account.accountInfo);
  app.post('/updatePassword', mid.requiresSecure, mid.requiresLogin, controllers.Account.updatePassword);
  app.get('/pikaday', mid.requiresSecure, controllers.Filesystem.getPikaday);
  app.get('/pikaday.css', mid.requiresSecure, controllers.Filesystem.getPikadayCSS);
  app.get('/favorite.png', mid.requiresSecure, controllers.Filesystem.getFavoriteIcon);
  app.get('/unfavorite.png', mid.requiresSecure, controllers.Filesystem.getUnfavoriteIcon);
  app.get('/resume.png', mid.requiresSecure, controllers.Filesystem.getResume)
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('*', function (req, res){
    res.render('notFound', { error: 'The page you are looking for was not found' });
  });
};

module.exports = router;

