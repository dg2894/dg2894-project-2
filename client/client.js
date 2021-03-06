const loginDiv = document.querySelector('.login');
const signupDiv = document.querySelector('.signup');

const handleLogin = (e) => {
  e.preventDefault();

  if($("#user").val() == '' || $("#pass").val() == '') {
    handleError("Username or password is empty");
    return false;
  }

  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

  return false;
};

const handleSignup = (e) => {
  e.preventDefault();

  if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("All fields are required");
    return false;
  }

  if($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match");
    return false;
  }

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

  return false;
};

const renderLogin = function() {
  return (
    <form id="loginForm" name="loginForm"
      onSubmit={this.handleSubmit}
      action="/login"
      method="POST"
      className="mainForm"
    >
      <input id="user" type="text" name="username" placeholder="Username" required/>
      <input id="pass" type="password" name="pass" placeholder="Password" required/>
      <input type="hidden" name="_csrf" value={this.props.csrf}/>
      <input id="loginButton" className="formSubmit" type="submit" value="Sign in" />
    </form>
  );
};

const renderSignup = function() {
  return (
    <form id="signupForm"
      name="signupForm"
      onSubmit={this.handleSubmit}
      action="/signup"
      method="POST"
      className="mainForm"
    >
      <input id="user" type="text" name="username" placeholder="Username" required/>
      <input id="pass" type="password" name="pass" placeholder="Password" required/>
      <input id="pass2" type="password" name="pass2" placeholder="Retype Password" required/>
      <h3 className="fake-payment">Payment Information</h3>
      <input id="fake-name" type="String" name="credit-card-name" value="Cody Van De Mark" disabled/>
      <input id="fake-credit-card" type="number" name="credit-card" value="1234567889012345" disabled/>
      <input id="fake-cvc" type="number" name="credit-card-cvc" value="001" disabled/>
      <input id="fake-address" type="string" name="credit-card-address" value="Golisano Hall (GOL)-2570" disabled/>
      <input type="hidden" name="_csrf" value={this.props.csrf} />
      <input id="loginButton" className="formSubmit" type="submit" value="Sign up" />
    </form>
  );
};

const createLoginWindow = function (csrf) {
    const LoginWindow = React.createClass({
      handleSubmit: handleLogin,
      render: renderLogin
    });

    loginDiv.className = "login hide";
    signupDiv.className = "signup";

  ReactDOM.render(
    <LoginWindow csrf={csrf} />,
    document.querySelector("#dynamiContent")
  );
};

const createSignupWindow = function (csrf) {
  const SignupWindow = React.createClass({
    handleSubmit: handleSignup,
    render: renderSignup
  });

    loginDiv.className = "login";
    signupDiv.className = "signup hide";

  ReactDOM.render(
    <SignupWindow csrf={csrf} />,
    document.querySelector("#dynamiContent")
  );
};

const setup = function(csrf) {
  const loginButton = document.querySelector("#loginButton");
  const signupButton = document.querySelector("#signupButton");

  signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });

  createLoginWindow(csrf); //default view
}

$(document).ready(function() {
  getToken();
});
