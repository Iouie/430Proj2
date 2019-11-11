const controllers = require('./controllers');

const router = (app) => {
  app.get('/', controllers.home.HomePage);
  app.get('/home', controllers.home.HomePage);
  app.get('/login', controllers.Account.loginPage);
  app.post('/login', controllers.Account.login);
  app.get('/signup', controllers.Account.signupPage);
  app.post('/signup', controllers.Account.signup);
  app.get('/myPage', controllers.Account.myPage);
};

module.exports = router;

