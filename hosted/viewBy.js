"use strict";

var idolRenderer = void 0; //Idol Renderer component
var idolForm = void 0; //Idol Add Form Render Component
var IdolFormClass = void 0; //Idol Form React UI class
var IdolListClass = void 0; //Idol List React UI class

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
  var idolStatus = document.querySelector('#chosenStatus').value;
  var requestUrl = '/getAll/' + idolStatus;

  IdolListClass = React.createClass({
    displayName: "IdolListClass",

    loadIdolsFromServer: function loadIdolsFromServer() {
      sendAjax('GET', requestUrl, null, function (data) {
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

  idolRenderer = ReactDOM.render(React.createElement(IdolListClass, { csrf: csrf }), document.querySelector("#idols"));
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
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

$(document).ready(function () {
  getToken();
  aniUp();
});