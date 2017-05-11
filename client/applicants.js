let applicantRenderer; //Idol Renderer component
let applicantForm; //Idol Add Form Render Component
let ApplicantFormClass; //Idol Form React UI class
let ApplicantListClass; //Idol List React UI class

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
      <div key={applicant._id} className="applicant">
        <div className="applicantInfo">
          <h3 className="applicantName">{applicant.name}</h3>
          <img className="applicantPhoto" src={applicant.photo}/>
          <h3 className="applicantBirthday">{applicant.birthday}</h3>
          <h3 className="applicantHeight">{applicant.height}</h3>
          <h3 className="applicantDream">{applicant.dream}</h3>
          <a className="applicantAudition" href={applicant.audition}>View Audition</a>
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

  applicantRenderer = ReactDOM.render(
    <ApplicantListClass />, document.querySelector("#applicants")
  );

  const picker = new Pikaday({ field: document.getElementById('applicantBirthday'), yearRange: [1985, 2017], maxDate: new Date() });
};

$(document).ready(function() {
  aniUp();
  getToken();
});
