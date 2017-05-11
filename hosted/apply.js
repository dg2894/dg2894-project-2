"use strict";

var applicantRenderer = void 0; //Idol Renderer component
var applicantForm = void 0; //Idol Add Form Render Component
var ApplicantFormClass = void 0; //Idol Form React UI class
var ApplicantListClass = void 0; //Idol List React UI class

var handleApplicant = function handleApplicant(e) {

  e.preventDefault();

  if ($("#applicantName").val() == '' || $("#applicantBirthday").val() == '' || $("#applicantDream").val() == '' || $("#applicantAudition").val() == '') {
    handleError("Name, birthday, dream, and aufition fields are required");
    return false;
  }

  sendAjax('POST', $("#applicantForm").attr("action"), $("#applicantForm").serialize(), function () {
    return true;
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
    React.createElement("input", { id: "applicantPhoto", type: "text", name: "photo", placeholder: "Profile Photo" }),
    React.createElement("input", { id: "applicantHeight", type: "number", name: "height", placeholder: "Height (cm)" }),
    React.createElement("input", { id: "applicantDream", type: "text", name: "dream", placeholder: "What do you want to become?", required: true }),
    React.createElement("input", { id: "applicantAudition", type: "text", name: "audition", placeholder: "Audition Video URL", required: true }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
    React.createElement("input", { type: "submit", className: "makeApplicantSubmit", value: "Apply" })
  );
};

var setup = function setup(csrf) {
  ApplicantFormClass = React.createClass({
    displayName: "ApplicantFormClass",

    handleSubmit: handleApplicant,
    render: renderApplicant
  });

  applicantForm = ReactDOM.render(React.createElement(ApplicantFormClass, { csrf: csrf }), document.querySelector("#makeApplicant"));

  var picker = new Pikaday({ field: document.getElementById('applicantBirthday'), yearRange: [1985, 2017], maxDate: new Date() });
};

$(document).ready(function () {
  aniUp();
  getToken();
});