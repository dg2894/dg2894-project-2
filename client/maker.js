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

const renderIdolList = function() {
  if(this.state.data.length === 0) {
    return (
      <div className="idolList">
        <h3 className="emptyIdol">No profiles yet</h3>
      </div>
    );
  }

  const idolNodes = this.state.data.map(function(idol) {
    return (
      <div key={idol._id} className="idol">
        <div className="idolInfo">
          <h3 className="idolName">{idol.name}</h3>
          <h3 className="idolStatus"><a href={'/viewBy/' + idol.status}>{idol.status}</a></h3>
          <a href={'/view/' + idol._id}>View Profile</a>
        </div>
      </div>
    );
  });

  return (
    <div className="idolList">
      {idolNodes}
    </div>
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

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
}

$(document).ready(function() {
  aniUp();
  getToken();
});
