"use strict";

var applicantRenderer = void 0; //Idol Renderer component
var applicantForm = void 0; //Idol Add Form Render Component
var ApplicantFormClass = void 0; //Idol Form React UI class
var ApplicantListClass = void 0; //Idol List React UI class

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
      { key: applicant._id, className: "applicant" },
      React.createElement(
        "div",
        { className: "applicantInfoContainer" },
        React.createElement("div", { className: "applicantPhoto",
          style: { backgroundImage: 'url(' + applicant.photo + ')',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'none' } }),
        React.createElement(
          "div",
          { className: "applicantInfo" },
          React.createElement(
            "h3",
            { className: "applicantName" },
            applicant.name
          ),
          React.createElement(
            "h3",
            { className: "applicantBirthday" },
            applicant.birthday
          ),
          React.createElement(
            "h3",
            { className: "applicantHeight" },
            applicant.height,
            " cm"
          ),
          React.createElement(
            "div",
            { className: "dream-audition" },
            React.createElement(
              "h3",
              { className: "applicantDream" },
              React.createElement(
                "div",
                { className: "a-label" },
                "Dream"
              ),
              " ",
              applicant.dream,
              " "
            ),
            React.createElement(
              "h3",
              { className: "applicantAudition" },
              React.createElement(
                "div",
                { className: "a-label" },
                "Audition"
              ),
              " ",
              React.createElement(
                "a",
                { target: "_blank", href: applicant.audition },
                "View"
              )
            )
          )
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

  applicantRenderer = ReactDOM.render(React.createElement(ApplicantListClass, null), document.querySelector("#applicants"));

  var picker = new Pikaday({ field: document.getElementById('applicantBirthday'), yearRange: [1985, 2017], maxDate: new Date() });
};

$(document).ready(function () {
  aniUp();
  getToken();
});