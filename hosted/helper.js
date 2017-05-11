"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
};

var handleSuccess = function handleSuccess(message) {
  $("#successMessage").text(message);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
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
      { key: idol._id, className: "idol",
        style: { backgroundImage: 'url(' + idol.photo + ')',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'none' } },
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

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};