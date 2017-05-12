"use strict";

var ChosenIdolClass = void 0;
var idolRenderer = void 0;
var idolId = void 0;

var editButton = document.querySelector(".editButton");

var handleEdit = function handleEdit(e) {
  e.preventDefault();

  if ($("#idolName").val() == '' || $("#idolBirthday").val() == '' || $("#idolStatus").val() == '' || $("#idolTalent").val() == '') {
    handleError("Name, birthday, status, and talent are required.");
    return false;
  }

  var requestUrl = '/edit/' + idolId;

  sendAjax('POST', requestUrl, $("#chosenIdolForm").serialize(), function () {
    window.location.reload();
  });

  return false;
};

var handleFavorite = function handleFavorite(e) {
  e.preventDefault();

  var idolFave = document.querySelector('.idolFavorite').value;

  var requestUrl = '/favorite/' + idolId + idolFave;

  sendAjax('POST', requestUrl, $("#chosenIdolFavorite").serialize(), function (idol) {
    window.location.reload();
  });

  return false;
};

var renderChosenIdol = function renderChosenIdol() {
  var idolNode = this.state.data.map(function (idol) {

    return React.createElement(
      "div",
      { key: idol._id, className: "idolInfoDetail" },
      React.createElement("div", { className: "idolPhoto",
        style: { backgroundImage: 'url(' + idol.photo + ')',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'none' } }),
      React.createElement(
        "h3",
        { className: "idolNameDetail" },
        idol.name
      ),
      React.createElement(
        "h3",
        { className: "idolBirthday" },
        React.createElement(
          "span",
          null,
          "Born On"
        ),
        " ",
        idol.birthday,
        " "
      ),
      React.createElement(
        "h3",
        { className: "idolHeight" },
        idol.height,
        " cm "
      ),
      React.createElement(
        "div",
        { className: "status-talent" },
        React.createElement(
          "h3",
          { className: "idolStatus" },
          React.createElement(
            "div",
            { className: "idol-label" },
            "Status"
          ),
          " ",
          React.createElement(
            "a",
            { href: '/viewBy/' + idol.status },
            idol.status
          )
        ),
        React.createElement(
          "h3",
          { className: "idolTalent" },
          React.createElement(
            "div",
            { className: "idol-label" },
            "Talent"
          ),
          " ",
          idol.talent,
          " "
        )
      ),
      React.createElement(
        "h3",
        { className: "idolNotes" },
        idol.notes
      )
    );
  });

  var favoriteNode = this.state.data.map(function (idol) {
    if (idol.favorite) {
      return React.createElement(
        "button",
        { key: idol._id, type: "submit", className: "idolFavorite", name: "favorite", value: "false" },
        React.createElement("img", { className: "fave", src: "/favorite.png", title: "Unfavorite" })
      );
    } else {
      return React.createElement(
        "button",
        { key: idol._id, type: "submit", className: "idolFavorite", name: "favorite", value: "true" },
        React.createElement("img", { className: "fave", src: "/unfavorite.png", title: "Favorite" })
      );
    }
  });

  return React.createElement(
    "div",
    { id: "favoriteForm" },
    React.createElement(
      "form",
      { id: "chosenIdolFavorite",
        onSubmit: this.handleFavorite,
        name: "chosenIdolFavorite",
        method: "POST"
      },
      React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
      favoriteNode
    ),
    idolNode
  );
};

var renderEditForm = function renderEditForm() {
  var renderFormData = this.state.data.map(function (idol) {
    return React.createElement(
      "div",
      { key: idol._id, className: "chosenIdol" },
      React.createElement(
        "h3",
        { className: "sectionTitle" },
        "Edit ",
        idol.name,
        "'s Profile"
      ),
      React.createElement("input", { id: "idolName", type: "text", name: "name", defaultValue: idol.name, placeholder: "Name", required: true }),
      React.createElement("input", { id: "idolPhoto", type: "text", name: "photo", defaultValue: idol.photo, placeholder: "Profile Photo" }),
      React.createElement("input", { id: "idolBirthday", type: "text", name: "birthday", defaultValue: idol.birthday, placeholder: "Birthday", required: true }),
      React.createElement("input", { id: "idolStatus", type: "text", name: "status", defaultValue: idol.status, placeholder: "Status", required: true }),
      React.createElement("input", { id: "idolTalent", type: "text", name: "talent", defaultValue: idol.talent, placeholder: "Talent", required: true }),
      React.createElement("input", { id: "idolHeight", type: "number", name: "height", defaultValue: idol.height, placeholder: "Height (cm)" }),
      React.createElement("textarea", { id: "idolNotes", type: "text", name: "notes", defaultValue: idol.notes, placeholder: "Additional Information" }),
      React.createElement("input", { type: "submit", className: "editIdolSubmit", value: "Save" })
    );
  });

  return React.createElement(
    "form",
    { id: "chosenIdolForm",
      onSubmit: this.handleSubmit,
      name: "chosenIdolForm",
      method: "POST"
    },
    React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
    renderFormData
  );
};

var createPage = function createPage(csrf, renderElement) {
  var requestUrl = '/getChosen/' + idolId;

  if (renderElement == renderEditForm) {
    editButton.className = "editButton hide";
  } else {
    editButton.className = "editButton";
  }

  ChosenIdolClass = React.createClass({
    displayName: "ChosenIdolClass",

    handleSubmit: handleEdit,
    handleFavorite: handleFavorite,
    loadChosenFromServer: function loadChosenFromServer() {
      sendAjax('GET', requestUrl, null, function (data) {
        this.setState({ data: data.foundIdol });
      }.bind(this));
    },
    getInitialState: function getInitialState() {
      return { data: [] };
    },
    componentDidMount: function componentDidMount() {
      this.loadChosenFromServer();
    },
    componentDidUpdate: function componentDidUpdate() {
      var picker = new Pikaday({ field: document.querySelector('#idolBirthday'), yearRange: [1985, 2017], maxDate: new Date() });
    },
    render: renderElement
  });

  if (renderElement == renderEditForm) {
    idolRenderer = ReactDOM.render(React.createElement(ChosenIdolClass, { csrf: csrf }), document.querySelector("#makeIdol"));
  } else {
    idolRenderer = ReactDOM.render(React.createElement(ChosenIdolClass, { csrf: csrf }), document.querySelector("#makeIdol"));
  }
};

var setup = function setup(csrf) {
  idolId = document.querySelector('#chosenId').value;

  editButton.addEventListener("click", function (e) {
    e.preventDefault();
    createPage(csrf, renderEditForm);
    return false;
  });

  createPage(csrf, renderChosenIdol);
};

$(document).ready(function () {
  getToken();
  aniUp();
});