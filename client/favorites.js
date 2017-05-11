let idolRenderer; //Idol Renderer component
let idolForm; //Idol Add Form Render Component
let IdolFormClass; //Idol Form React UI class
let IdolListClass; //Idol List React UI class

const setup = function(csrf) {
  const requestUrl = '/getFavorites';

  IdolListClass = React.createClass({
    loadIdolsFromServer: function() {
      sendAjax('GET', requestUrl, null, function(data) {
        this.setState({data:data.idols});
      }.bind(this));
    },
    getInitialState: function () {
      return {data: []};
    },
    componentDidMount: function () {
      this.loadIdolsFromServer();
    },
    render: renderIdolList
  });

  idolRenderer = ReactDOM.render(
    <IdolListClass csrf={csrf}/>, document.querySelector("#idols")
  );
};

$(document).ready(function() {
  getToken();
  aniUp();
});
