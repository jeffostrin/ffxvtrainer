exports.get_schedule = function($) {

  function requestComplete(result) {
    console.log('Response received from API: ', result);
    alert(result);
  }

  function requestError(jqXHR, textStatus, errorThrown) {
    console.error('Error requesting clock: ', textStatus, ', Details: ', errorThrown);
    console.error('Response: ', jqXHR.responseText);
    alert('An error occured when requesting the clock:\n' + jqXHR.responseText);
  }

  $.ajax({
      method: 'GET',
      url: _config.api.invokeUrl + '/clock',
      headers: {
          // Authorization: authToken
      },
      contentType: 'application/json',
      success: requestComplete,
      error: requestError
  });

}(jQuery);
