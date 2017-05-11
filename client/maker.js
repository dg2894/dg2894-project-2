let idolRenderer; //Idol Renderer component
let idolForm; //Idol Add Form Render Component
let IdolFormClass; //Idol Form React UI class
let IdolListClass; //Idol List React UI class

const handleIdol = (e) => {

  e.preventDefault();

  if($("#idolName").val() == '' || $("#idolBirthday").val() == '' || $("#idolStatus").val() == '' || $("#idolTalent").val() == '') {
    handleError("Name, birthday, status, and talent are required");
    return false;
  }

  sendAjax('POST', $("#idolForm").attr("action"), $("#idolForm").serialize(), function() {
    idolRenderer.loadIdolsFromServer();
  });

  return false;
};

const renderIdol = function() {
  return (
    <form id="idolForm"
      onSubmit={this.handleSubmit}
      name="idolForm"
      action="/maker"
      method="POST"
      className="idolForm"
    >
      <h3 className="sectionTitle">Create A New Profile</h3>
      <input id="idolName" type="text" name="name" placeholder="Name" required/>
      <input id="idolPhoto" type="text" name="photo" placeholder="Profile Photo"/>
      <input id="idolBirthday" type="text" name="birthday" placeholder="Birthday" required/>
      <input id="idolStatus" type="text" name="status" placeholder="Status" required/>
      <input id="idolTalent" type="text" name="talent" placeholder="Talent" required/>
      <input id="idolHeight" type="number" name="height" placeholder="Height (cm)"/>
      <textarea id="idolNotes" type="text" name="notes" placeholder="Additional Information"/>
      <input type="hidden" name="_csrf" value={this.props.csrf} />
      <input type="submit" className="makeIdolSubmit" value="Add profile" />
    </form>
  );
};

const setup = function(csrf) {
  IdolFormClass = React.createClass({
    handleSubmit: handleIdol,
    render: renderIdol,
  });

  IdolListClass = React.createClass({
    loadIdolsFromServer: function() {
      sendAjax('GET', '/getIdols', null, function(data) {
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

  idolForm = ReactDOM.render(
    <IdolFormClass csrf={csrf} />, document.querySelector("#makeIdol")
  );

  idolRenderer = ReactDOM.render(
    <IdolListClass />, document.querySelector("#idols")
  );

  const picker = new Pikaday({ field: document.getElementById('idolBirthday'), yearRange: [1985, 2017], maxDate: new Date() });
};

$(document).ready(function() {
  aniUp();
  getToken();
});
