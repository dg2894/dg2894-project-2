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


const handleFavorite = function (e) {
  e.preventDefault();

  let idolFave = document.querySelector('.idolFavorite').value;

  const requestUrl = '/favorite/' + idolId + idolFave;

  sendAjax('POST', requestUrl, $("#chosenIdolFavorite").serialize(), function(idol) {
    window.location.reload();
  });

  return false;
};

const renderChosenIdol = function() {
  const idolNode = this.state.data.map(function(idol) {

    return (
      <div key={idol._id} className="idolInfoDetail">
        <div className="idolPhoto"
        style={{backgroundImage: 'url(' + idol.photo + ')',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'none'}}>
        </div>
        <h3 className="idolNameDetail">{idol.name}</h3>
        <h3 className="idolBirthday"><span>Born On</span> {idol.birthday} </h3>
        <h3 className="idolHeight">{idol.height} cm </h3>
        <div className="status-talent">
          <h3 className="idolStatus"><div className="idol-label">Status</div> <a href={'/viewBy/' + idol.status}>{idol.status}</a></h3>
          <h3 className="idolTalent"><div className="idol-label">Talent</div> {idol.talent} </h3>
        </div>
        <h3 className="idolNotes">{idol.notes}</h3>
      </div>
    );
  });

  const favoriteNode = this.state.data.map(function(idol) {
    if (idol.favorite) {
      return (
        <button key={idol._id} type="submit" className="idolFavorite" name="favorite" value="false">
          <img className="fave" src="/favorite.png" title="Unfavorite"/>
        </button>
      );
    } else {
      return (
        <button key={idol._id} type="submit" className="idolFavorite" name="favorite" value="true">
          <img className="fave" src="/unfavorite.png" title="Favorite" />
        </button>
      );
    }
  });

  return (
    <div id="favoriteForm">
      <form id="chosenIdolFavorite"
        onSubmit={this.handleFavorite}
        name="chosenIdolFavorite"
        method="POST"
      >
        <input type="hidden" name="_csrf" value={this.props.csrf}/>
        {favoriteNode}
      </form>

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
        <input id="idolPhoto" type="text" name="photo" defaultValue={idol.photo} placeholder="Profile Photo"/>
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
    handleFavorite: handleFavorite,
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

$(document).ready(function() {
  getToken();
  aniUp();
});
