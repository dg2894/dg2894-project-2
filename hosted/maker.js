"use strict";

var idolRenderer = void 0; //Idol Renderer component
var idolForm = void 0; //Idol Add Form Render Component
var IdolFormClass = void 0; //Idol Form React UI class
var IdolListClass = void 0; //Idol List React UI class

var handleIdol = function handleIdol(e) {

  e.preventDefault();

  if ($("#idolName").val() == '' || $("#idolBirthday").val() == '' || $("#idolStatus").val() == '' || $("#idolTalent").val() == '') {
    handleError("Name, birthday, status, and talent are required");
    return false;
  }

  sendAjax('POST', $("#idolForm").attr("action"), $("#idolForm").serialize(), function () {
    idolRenderer.loadIdolsFromServer();
  });

  return false;
};

var renderIdol = function renderIdol() {
  return React.createElement(
    "form",
    { id: "idolForm",
      onSubmit: this.handleSubmit,
      name: "idolForm",
      action: "/maker",
      method: "POST",
      className: "idolForm"
    },
    React.createElement(
      "h3",
      { className: "sectionTitle" },
      "Create A New Profile"
    ),
    React.createElement("input", { id: "idolName", type: "text", name: "name", placeholder: "Name", required: true }),
    React.createElement("input", { id: "idolBirthday", type: "text", name: "birthday", placeholder: "Birthday", required: true }),
    React.createElement("input", { id: "idolStatus", type: "text", name: "status", placeholder: "Status", required: true }),
    React.createElement("input", { id: "idolTalent", type: "text", name: "talent", placeholder: "Talent", required: true }),
    React.createElement("input", { id: "idolHeight", type: "number", name: "height", placeholder: "Height (cm)" }),
    React.createElement("textarea", { id: "idolNotes", type: "text", name: "notes", placeholder: "Additional Information" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
    React.createElement("input", { type: "submit", className: "makeIdolSubmit", value: "Add profile" })
  );
};

var renderIdolList = function renderIdolList() {
  if (this.state.data.length === 0) {
    return React.createElement(
      "div",
      { className: "idolList" },
      React.createElement(
        "h3",
        { className: "emptyIdol" },
        "No profiles yet"
      )
    );
  }

  var idolNodes = this.state.data.map(function (idol) {
    return React.createElement(
      "div",
      { key: idol._id, className: "idol" },
      React.createElement(
        "div",
        { className: "idolInfo" },
        React.createElement(
          "h3",
          { className: "idolName" },
          idol.name
        ),
        React.createElement(
          "h3",
          { className: "idolStatus" },
          React.createElement(
            "a",
            { href: '/viewBy/' + idol.status },
            idol.status
          )
        ),
        React.createElement(
          "a",
          { href: '/view/' + idol._id },
          "View Profile"
        )
      )
    );
  });

  return React.createElement(
    "div",
    { className: "idolList" },
    idolNodes
  );
};

var setup = function setup(csrf) {
  IdolFormClass = React.createClass({
    displayName: "IdolFormClass",

    handleSubmit: handleIdol,
    render: renderIdol
  });

  IdolListClass = React.createClass({
    displayName: "IdolListClass",

    loadIdolsFromServer: function loadIdolsFromServer() {
      sendAjax('GET', '/getIdols', null, function (data) {
        this.setState({ data: data.idols });
      }.bind(this));
    },
    getInitialState: function getInitialState() {
      return { data: [] };
    },
    componentDidMount: function componentDidMount() {
      this.loadIdolsFromServer();
    },
    render: renderIdolList
  });

  idolForm = ReactDOM.render(React.createElement(IdolFormClass, { csrf: csrf }), document.querySelector("#makeIdol"));

  idolRenderer = ReactDOM.render(React.createElement(IdolListClass, null), document.querySelector("#idols"));

  var picker = new Pikaday({ field: document.getElementById('idolBirthday'), yearRange: [1985, 2017], maxDate: new Date() });
};

var aniUp = function aniUp() {
  var previousScroll = 0;

  $(window).scroll(function () {
    var currentScroll = $(this).scrollTop();

    if (currentScroll > previousScroll) {
      $('#top-nav').addClass('hideNav');
      $('.navlink').removeClass('navlink-trans');
    } else {
      $('#top-nav').removeClass('hideNav');
      $('.navlink').addClass('navlink-trans');
    }
    previousScroll = currentScroll;
  });
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  aniUp();
  getToken();
});