let ChosenIdolClass;
let idolRenderer;
let idolId;

const editButton = document.querySelector(".editButton");

const handleEdit = function (e) {
  e.preventDefault();

  if($("#idolName").val() == '' || $("#idolBirthday").val() == '' || $("#idolStatus").val() == '' || $("#idolTalent").val() == '') {
    handleError("Name, birthday, status, and talent are required.");
    return false;
  }

  const requestUrl = '/edit/' + idolId;

  sendAjax('POST', requestUrl, $("#chosenIdolForm").serialize(), function() {
    window.location.reload();
  });

  return false;
};

const renderChosenIdol = function() {
  const idolNode = this.state.data.map(function(idol) {
    return (
      <div key={idol._id} className="idolInfo">
        <h3 className="idolName"><span className="idol-label">Name</span>: {idol.name} </h3>
        <h3 className="idolBirthday"><span className="idol-label">Birthday</span>: {idol.birthday} </h3>
        <h3 className="idolStatus"><span className="idol-label">Status</span>: <a href={'/viewBy/' + idol.status}>{idol.status}</a></h3>
        <h3 className="idolTalent"><span className="idol-label">Talent</span>: {idol.talent} </h3>
        <h3 className="idolHeight"><span className="idol-label">Height</span>: {idol.height}cm </h3>
        <h3 className="idolNotes"><span className="idol-label">Notes</span>: {idol.notes} </h3>
      </div>
    );
  });

  return (
    <div className="chosenIdol">
      {idolNode}
    </div>
  );
};

const renderEditForm = function () {
  const renderFormData = this.state.data.map(function(idol) {
    return (
      <div key={idol._id} className="chosenIdol">
        <h3 className="sectionTitle">Edit {idol.name}'s Profile</h3>
        <input id="idolName" type="text" name="name" defaultValue={idol.name} placeholder="Name" required/>
        <input id="idolBirthday" type="text" name="birthday" defaultValue={idol.birthday} placeholder="Birthday" required/>
        <input id="idolStatus" type="text" name="status" defaultValue={idol.status} placeholder="Status" required/>
        <input id="idolTalent" type="text" name="talent" defaultValue={idol.talent} placeholder="Talent" required/>
        <input id="idolHeight" type="number" name="height" defaultValue={idol.height} placeholder="Height (cm)"/>
        <textarea id="idolNotes" type="text" name="notes" defaultValue={idol.notes} placeholder="Additional Information"/>
        <input type="submit" className="editIdolSubmit" value="Save" />
      </div>
    );
  });

  return (
    <form id="chosenIdolForm"
      onSubmit={this.handleSubmit}
      name="chosenIdolForm"
      method="POST"
    >
      <input type="hidden" name="_csrf" value={this.props.csrf} />
      {renderFormData}
    </form>
  );
};

const createPage = function(csrf, renderElement) {
  const requestUrl = '/getChosen/' + idolId;

  if ( renderElement == renderEditForm ) {
    editButton.className = "editButton hide";
  } else {
    editButton.className = "editButton";
  }

  ChosenIdolClass = React.createClass({
    handleSubmit: handleEdit,
    loadChosenFromServer: function() {
      sendAjax('GET', requestUrl, null, function(data) {
        this.setState({data:data.foundIdol});
      }.bind(this));
    },
    getInitialState: function () {
      return {data: []};
    },
    componentDidMount: function () {
      this.loadChosenFromServer();
    },
    componentDidUpdate: function() {
      const picker = new Pikaday({ field: document.querySelector('#idolBirthday'), yearRange: [1985, 2017], maxDate: new Date() });
    },
    render: renderElement
  });

  if ( renderElement == renderEditForm ) {
    idolRenderer = ReactDOM.render(
      <ChosenIdolClass csrf={csrf}/>,
      document.querySelector("#makeIdol")
    );
  } else {
    idolRenderer = ReactDOM.render(
      <ChosenIdolClass csrf={csrf}/>,
      document.querySelector("#makeIdol")
    );
  }

  console.log(document.querySelector('#idolBirthday'));

};

const setup = function (csrf) {
  idolId = document.querySelector('#chosenId').value;

  editButton.addEventListener("click", (e) => {
    e.preventDefault();
    createPage(csrf, renderEditForm);
    return false;
  })

  createPage(csrf, renderChosenIdol);
}

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
}

const aniUp = () => {
  var previousScroll = 0;

  $(window).scroll(function(){
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

$(document).ready(function() {
  getToken();
  aniUp();
});
