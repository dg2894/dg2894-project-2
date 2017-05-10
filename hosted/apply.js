"use strict";

var applicantRenderer = void 0; //Idol Renderer component
var applicantForm = void 0; //Idol Add Form Render Component
var ApplicantFormClass = void 0; //Idol Form React UI class
var ApplicantListClass = void 0; //Idol List React UI class

var handleApplicant = function handleApplicant(e) {

  e.preventDefault();

  if ($("#applicantName").val() == '' || $("#applicantBirthday").val() == '' || $("#applicantStatus").val() == '' || $("#idolTalent").val() == '') {
    handleError("Name, birthday, photo, and dream are required");
    return false;
  }

  sendAjax('POST', $("#applicantForm").attr("action"), $("#applicantForm").serialize(), function () {
    applicantRenderer.loadApplicantsFromServer();
  });

  return false;
};

var renderApplicant = function renderApplicant() {
  return React.createElement(
    "form",
    { id: "applicantForm",
      onSubmit: this.handleSubmit,
      name: "applicantForm",
      action: "/createApplicant",
      method: "POST",
      className: "idolForm"
    },
    React.createElement(
      "h3",
      { className: "sectionTitle" },
      "Apply Here"
    ),
    React.createElement("input", { id: "applicantName", type: "text", name: "name", placeholder: "Name", required: true }),
    React.createElement("input", { id: "applicantBirthday", type: "text", name: "birthday", placeholder: "Birthday", required: true }),
    React.createElement("input", { id: "applicantPhoto", type: "text", name: "photo", placeholder: "Profile Photo", required: true }),
    React.createElement("input", { id: "applicantHeight", type: "number", name: "height", placeholder: "Height (cm)", required: true }),
    React.createElement("input", { id: "applicantDream", type: "text", name: "dream", placeholder: "What do you want to become?", required: true }),
    React.createElement("input", { id: "applicantAudition", type: "text", name: "audition", placeholder: "Audition Video URL", required: true }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
    React.createElement("input", { type: "submit", className: "makeApplicantSubmit", value: "Apply" })
  );
};

var renderApplicantList = function renderApplicantList() {
  if (this.state.data.length === 0) {
    return React.createElement(
      "div",
      { className: "applicantList" },
      React.createElement(
        "h3",
        { className: "emptyApplicant" },
        "No applicants"
      )
    );
  }

  var applicantNodes = this.state.data.map(function (applicant) {
    return React.createElement(
      "div",
      { key: applicant._id, className: "applicant",
        style: { backgroundImage: 'url(' + applicant.photo + ')',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'none' } },
      React.createElement(
        "div",
        { className: "applicantInfo" },
        React.createElement(
          "h3",
          { className: "applicantName" },
          applicant.name
        ),
        React.createElement(
          "a",
          { href: '/view/' + applicant._id },
          "View Applicant"
        )
      )
    );
  });

  return React.createElement(
    "div",
    { className: "applicantList" },
    applicantNodes
  );
};

var setup = function setup(csrf) {
  ApplicantFormClass = React.createClass({
    displayName: "ApplicantFormClass",

    handleSubmit: handleApplicant,
    render: renderApplicant
  });

  ApplicantListClass = React.createClass({
    displayName: "ApplicantListClass",

    loadApplicantsFromServer: function loadApplicantsFromServer() {
      sendAjax('GET', '/getApplicants', null, function (data) {
        this.setState({ data: data.applicants });
      }.bind(this));
    },
    getInitialState: function getInitialState() {
      return { data: [] };
    },
    componentDidMount: function componentDidMount() {
      this.loadApplicantsFromServer();
    },
    render: renderApplicantList
  });

  applicantForm = ReactDOM.render(React.createElement(ApplicantFormClass, { csrf: csrf }), document.querySelector("#makeApplicant"));

  applicantRenderer = ReactDOM.render(React.createElement(ApplicantListClass, null), document.querySelector("#applicants"));

  var picker = new Pikaday({ field: document.getElementById('applicantBirthday'), yearRange: [1985, 2017], maxDate: new Date() });
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