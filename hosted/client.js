'use strict';

var loginDiv = document.querySelector('.login');
var signupDiv = document.querySelector('.signup');

var handleLogin = function handleLogin(e) {
  e.preventDefault();

  if ($("#user").val() == '' || $("#pass").val() == '') {
    handleError("Username or password is empty");
    return false;
  }

  console.log($("input[name=_csrf]").val());

  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

  return false;
};

var handleSignup = function handleSignup(e) {
  e.preventDefault();

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match");
    return false;
  }

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

  return false;
};

var renderLogin = function renderLogin() {
  return React.createElement(
    'form',
    { id: 'loginForm', name: 'loginForm',
      onSubmit: this.handleSubmit,
      action: '/login',
      method: 'POST',
      className: 'mainForm'
    },
    React.createElement('input', { id: 'user', type: 'text', name: 'username', placeholder: 'Username', required: true }),
    React.createElement('input', { id: 'pass', type: 'password', name: 'pass', placeholder: 'Password', required: true }),
    React.createElement('input', { type: 'hidden', name: '_csrf', value: this.props.csrf }),
    React.createElement('input', { id: 'loginButton', className: 'formSubmit', type: 'submit', value: 'Sign in' })
  );
};

var renderSignup = function renderSignup() {
  return React.createElement(
    'form',
    { id: 'signupForm',
      name: 'signupForm',
      onSubmit: this.handleSubmit,
      action: '/signup',
      method: 'POST',
      className: 'mainForm'
    },
    React.createElement('input', { id: 'user', type: 'text', name: 'username', placeholder: 'Username', required: true }),
    React.createElement('input', { id: 'pass', type: 'password', name: 'pass', placeholder: 'Password', required: true }),
    React.createElement('input', { id: 'pass2', type: 'password', name: 'pass2', placeholder: 'Retype Password', required: true }),
    React.createElement('input', { type: 'hidden', name: '_csrf', value: this.props.csrf }),
    React.createElement('input', { id: 'loginButton', className: 'formSubmit', type: 'submit', value: 'Sign up' })
  );
};

var createLoginWindow = function createLoginWindow(csrf) {
  var LoginWindow = React.createClass({
    displayName: 'LoginWindow',

    handleSubmit: handleLogin,
    render: renderLogin
  });

  loginDiv.className = "login hide";
  signupDiv.className = "signup";

  ReactDOM.render(React.createElement(LoginWindow, { csrf: csrf }), document.querySelector("#dynamiContent"));
};

var createSignupWindow = function createSignupWindow(csrf) {
  var SignupWindow = React.createClass({
    displayName: 'SignupWindow',

    handleSubmit: handleSignup,
    render: renderSignup
  });

  loginDiv.className = "login";
  signupDiv.className = "signup hide";

  ReactDOM.render(React.createElement(SignupWindow, { csrf: csrf }), document.querySelector("#dynamiContent"));
};

var setup = function setup(csrf) {
  var loginButton = document.querySelector("#loginButton");
  var signupButton = document.querySelector("#signupButton");

  signupButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });

  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });

  createLoginWindow(csrf); //default view
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});