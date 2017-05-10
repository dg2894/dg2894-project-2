let applicantRenderer; //Idol Renderer component
let applicantForm; //Idol Add Form Render Component
let ApplicantFormClass; //Idol Form React UI class
let ApplicantListClass; //Idol List React UI class

const handleApplicant = (e) => {

  e.preventDefault();

  if($("#applicantName").val() == '' || $("#applicantBirthday").val() == '' || $("#applicantStatus").val() == '' || $("#idolTalent").val() == '') {
    handleError("Name, birthday, photo, and dream are required");
    return false;
  }

  sendAjax('POST', $("#applicantForm").attr("action"), $("#applicantForm").serialize(), function() {
    applicantRenderer.loadApplicantsFromServer();
  });

  return false;
};

const renderApplicant = function() {
  return (
    <form id="applicantForm"
      onSubmit={this.handleSubmit}
      name="applicantForm"
      action="/createApplicant"
      method="POST"
      className="idolForm"
    >
      <h3 className="sectionTitle">Apply Here</h3>
      <input id="applicantName" type="text" name="name" placeholder="Name" required/>
      <input id="applicantBirthday" type="text" name="birthday" placeholder="Birthday" required/>
      <input id="applicantPhoto" type="text" name="photo" placeholder="Profile Photo" required/>
      <input id="applicantHeight" type="number" name="height" placeholder="Height (cm)" required/>
      <input id="applicantDream" type="text" name="dream" placeholder="What do you want to become?" required/>
      <input id="applicantAudition" type="text" name="audition" placeholder="Audition Video URL" required/>
      <input type="hidden" name="_csrf" value={this.props.csrf} />
      <input type="submit" className="makeApplicantSubmit" value="Apply" />
    </form>
  );
};

const renderApplicantList = function() {
  if(this.state.data.length === 0) {
    return (
      <div className="applicantList">
        <h3 className="emptyApplicant">No applicants</h3>
      </div>
    );
  }

  const applicantNodes = this.state.data.map(function(applicant) {
    return (
      <div key={applicant._id} className="applicant"
        style={{backgroundImage: 'url(' + applicant.photo + ')',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'none'}}>
        <div className="applicantInfo">
          <h3 className="applicantName">{applicant.name}</h3>
          <a href={'/view/' + applicant._id}>View Applicant</a>
        </div>
      </div>
    );
  });

  return (
    <div className="applicantList">
      {applicantNodes}
    </div>
  );
};


const setup = function(csrf) {
  ApplicantFormClass = React.createClass({
    handleSubmit: handleApplicant,
    render: renderApplicant,
  });

  ApplicantListClass = React.createClass({
    loadApplicantsFromServer: function() {
      sendAjax('GET', '/getApplicants', null, function(data) {
        this.setState({data:data.applicants});
      }.bind(this));
    },
    getInitialState: function () {
      return {data: []};
    },
    componentDidMount: function () {
      this.loadApplicantsFromServer();
    },
    render: renderApplicantList
  });

  applicantForm = ReactDOM.render(
    <ApplicantFormClass csrf={csrf} />, document.querySelector("#makeApplicant")
  );

  applicantRenderer = ReactDOM.render(
    <ApplicantListClass />, document.querySelector("#applicants")
  );

  const picker = new Pikaday({ field: document.getElementById('applicantBirthday'), yearRange: [1985, 2017], maxDate: new Date() });
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
