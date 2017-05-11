const handleError = (message) => {
  $("#errorMessage").text(message);
};

const handleSuccess = (message) => {
  $("#successMessage").text(message);
};

const redirect = (response) => {
  window.location = response.redirect;
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
      <div key={idol._id} className="idol"
        style={{backgroundImage: 'url(' + idol.photo + ')',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'none'}}>
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

const sendAjax = (type, action, data, success) => {
  $.ajax({
      cache: false,
      type: type,
      url: action,
      data: data,
      dataType: "json",
      success: success,
      error: function(xhr, status, error) {
        var messageObj = JSON.parse(xhr.responseText);
        handleError(messageObj.error);
      }
  });
};
