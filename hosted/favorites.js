'use strict';

var idolRenderer = void 0; //Idol Renderer component
var idolForm = void 0; //Idol Add Form Render Component
var IdolFormClass = void 0; //Idol Form React UI class
var IdolListClass = void 0; //Idol List React UI class

var setup = function setup(csrf) {
  var requestUrl = '/getFavorites';

  IdolListClass = React.createClass({
    displayName: 'IdolListClass',

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

$(document).ready(function () {
  getToken();
  aniUp();
});