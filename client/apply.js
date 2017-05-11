let applicantRenderer; //Idol Renderer component
let applicantForm; //Idol Add Form Render Component
let ApplicantFormClass; //Idol Form React UI class
let ApplicantListClass; //Idol List React UI class

const handleApplicant = (e) => {

  e.preventDefault();

  if($("#applicantName").val() == '' || $("#applicantBirthday").val() == '' || $("#applicantDream").val() == '' || $("#applicantAudition").val() == '') {
    handleError("Name, birthday, dream, and aufition fields are required");
    return false;
  }

  sendAjax('POST', $("#applicantForm").attr("action"), $("#applicantForm").serialize(), function() {
    handleSuccess("Profile Created");
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
      <input id="applicantPhoto" type="text" name="photo" placeholder="Profile Photo"/>
      <input id="applicantHeight" type="number" name="height" placeholder="Height (cm)"/>
      <input id="applicantDream" type="text" name="dream" placeholder="What do you want to become?" required/>
      <input id="applicantAudition" type="text" name="audition" placeholder="Audition Video URL" required/>
      <input type="hidden" name="_csrf" value={this.props.csrf} />
      <input type="submit" className="makeApplicantSubmit" value="Apply" />
    </form>
  );
};

const setup = function(csrf) {
  ApplicantFormClass = React.createClass({
    handleSubmit: handleApplicant,
    render: renderApplicant,
  });

  applicantForm = ReactDOM.render(
    <ApplicantFormClass csrf={csrf} />, document.querySelector("#makeApplicant")
  );

  const picker = new Pikaday({ field: document.getElementById('applicantBirthday'), yearRange: [1985, 2017], maxDate: new Date() });
};

$(document).ready(function() {
  aniUp();
  getToken();
});
