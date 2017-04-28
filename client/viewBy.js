let idolRenderer; //Idol Renderer component
let idolForm; //Idol Add Form Render Component
let IdolFormClass; //Idol Form React UI class
let IdolListClass; //Idol List React UI class

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
  const idolStatus = document.querySelector('#chosenStatus').value;
  const requestUrl = '/getAll/' + idolStatus;

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
