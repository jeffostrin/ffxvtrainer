
(function trainer($) {

  function _lpad(pad, str) {
    return (str + pad).substring(0, pad.length);
  }

  function lpad(str, length, fillCharacter) {
    var fill = "";
    var l = Math.max(length, str.length);
    for (var i = 0; i < l; ++i) {
      fill += fillCharacter;
    }
    var r = _lpad(fill, str);
    return r;
  }

  function score_hourly_events(events) {
    var totalPoints = 0;
    Object.keys(events).forEach(function (e) {
      totalPoints += events[e];
    });

    var result = [];
    Object.keys(events).forEach(function (e) {
      var score = Math.floor(events[e] * 100 / totalPoints);
      var name = e + " (" + score + ")"
      result.push({ name: name, score: score })
    });

    return result;
  }

  function present_hourly_events(hourlyEvents, padding) {
    hourlyEvents.sort((x,y) => { return y.score - x.score });

    if (hourlyEvents.length == 1) {
      return "[ " + hourlyEvents[0].name + " ]";
    }

    return "[ " + lpad(hourlyEvents[0].name + " or ", 26, padding) + " " + lpad(hourlyEvents[1].name, 21, padding) + " ]"
  }

  function loadSchedule() {
    if (getUrlParameter("test") == "true") { // test / debug
      return updateClock(getTestResponse());
    } else {
      var api_url = "https://ng06xi3pog.execute-api.us-east-1.amazonaws.com/prod"
      var utcOffset = -1 * (new Date()).getTimezoneOffset()/60;
      $.ajax({
        method: 'POST',
        url: api_url + "/schedule", // _config.api.invokeUrl + '/clock',
        headers: {
            // Authorization: authToken
        },
        data: JSON.stringify({ "utcoffset": utcOffset }),
        contentType: 'application/json',
        success: updateClock,
        error: handleError
      });
    }
  }

  function startTimer() {
    setInterval(
      loadSchedule,
        1 * 60 * 1000 // 1 minute
    )
  }

  $(function onDocReady() {
    loadSchedule();
    startTimer();
  });

  function handleError(jqXHR, textStatus, errorThrown) {
    $('#comm_error').empty();
    $('#comm_error').append("Error contacting server, data may be out of date");

    // function ajaxError(jqXHR, textStatus, errorThrown) {
        // console.error('Error requesting schedule: ', textStatus, ', Details: ', errorThrown);
        // console.error('Response: ', jqXHR.responseText);
    //     alert('An error occured when requesting the schedule:\n' + jqXHR.responseText);
    // }
  }

  function updateClock(response) {
    $('#comm_error').empty();
    $('#updates').empty();
    $('#updates').append($('<div id=schedule />'));
    // console.log(response);
    // console.log(response.schedule);
    Object.keys(response.schedule.hepochs).sort().forEach(
      function(key) {
        var line = "<div>";
        var padding = " ";

        var val = response.schedule.hepochs[key];

        if (val.isCurrentHepoch) {
          line += "=>";
          padding = "=";
        } else if (key % 4 == 0) {
          line += "--";
          padding = "-";
        } else {
          line += "  ";
        }

        line += " " + val.dayTime;
        line += lpad(" (" + val.relativeTime + ") ", 16, padding) + " ";

        var hourlyEvents = score_hourly_events(val.hourly_events);
        var hourlyOutput = present_hourly_events(hourlyEvents, padding);
        line += hourlyOutput;

        if (val.luna_events !== null && val.luna_events !== undefined) {
          if (val.luna_events.length > 0) {
            var lunaEvent = lpad(" " + val.luna_events + " ", 20, padding);
            line += " " + padding + lunaEvent;
          }
        }

        line += "</div>";
        $('#schedule').append(line);
      }
    );
  }

  // https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
  var getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = window.location.search.substring(1),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
          }
      }
  };

  function getTestResponse() {
    var test_response = {
      "schedule": {
        "hepochs": {
          "425545": {
            "hepoch": 425545,
            "isCurrentHepoch": true,
            "dayTime": "06:00pm (07-18)",
            "relativeTime": "now",
            "hourly_events": {
              "Monster Hunt": 200,
              "Guild Quests": 50
            },
            "luna_events": []
          },
          "425546": {
            "hepoch": 425546,
            "isCurrentHepoch": false,
            "dayTime": "07:00pm (07-18)",
            "relativeTime": "in 0:01",
            "hourly_events": {
              "Guild Quests": 250,
              "Guild RSS Help": 25,
              "Monster": 50
            },
            "luna_events": [
              "Adventurer Contract"
            ]
          },
          "425547": {
            "hepoch": 425545,
            "isCurrentHepoch": false,
            "dayTime": "08:00pm (07-18)",
            "relativeTime": "in 1:01",
            "hourly_events": {
              "Monster Hunt": 200,
              "Guild Quests": 50
            }
          },
          "425548": {
            "hepoch": 425546,
            "isCurrentHepoch": false,
            "dayTime": "09:00pm (07-18)",
            "relativeTime": "in 2:01",
            "hourly_events": {
              "Combine Gems": 250,
              "Gather RSS": 25,
              "Hero Quests": 50
            }
          },
          "425549": {
            "hepoch": 425545,
            "isCurrentHepoch": false,
            "dayTime": "10:00pm (07-18)",
            "relativeTime": "in 3:01",
            "hourly_events": {
              "Monster": 200,
              "Guild Quests": 50
            }
          },
          "425550": {
            "hepoch": 425546,
            "isCurrentHepoch": false,
            "dayTime": "11:00pm (07-18)",
            "relativeTime": "in 4:01",
            "hourly_events": {
              "Hero Quests": 250,
              "Guild RSS Help": 25,
              "Monster": 50
            }
          },
        }
      },
      "ee": {
        "body": null,
        "httpMethod": "GET",
        "resource": "\/clock",
        "queryStringParameters": {
          "p2": "{tz=PST,r=bar}",
          "p1": "{tz=PST,r=foo}"
        },
        "requestContext": {
          "httpMethod": "GET",
          "requestId": "c6af9ac6-7b61-11e6-9a41-93e8deadbeef",
          "path": "\/clock",
          "extendedRequestId": null,
          "resourceId": "123456",
          "apiId": "1234567890",
          "stage": "prod",
          "resourcePath": "\/clock",
          "identity": {
            "accountId": null,
            "apiKey": null,
            "userArn": null,
            "cognitoAuthenticationProvider": null,
            "cognitoIdentityPoolId": null,
            "userAgent": "Custom User Agent String",
            "caller": null,
            "cognitoAuthenticationType": null,
            "sourceIp": "127.0.0.1",
            "user": null
          },
          "accountId": "123456789012"
        },
        "headers": {
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          "X-Forwarded-Port": "3000",
          "Connection": "keep-alive",
          "Accept": "text\/html,application\/xhtml+xml,application\/xml;q=0.9,image\/webp,image\/apng,*\/*;q=0.8",
          "Upgrade-Insecure-Requests": "1",
          "Host": "127.0.0.1:3000",
          "X-Forwarded-Proto": "http",
          "Cache-Control": "max-age=0",
          "User-Agent": "Mozilla\/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/67.0.3396.99 Safari\/537.36"
        },
        "stageVariables": null,
        "path": "\/clock",
        "pathParameters": null,
        "isBase64Encoded": false
      },
      "con": {
        "callbackWaitsForEmptyEventLoop": true,
        "logGroupName": "\/aws\/lambda\/test",
        "logStreamName": "2018\/07\/19\/[$LATEST]dfc3dde3c6e40e9c40fe4d88a634f1b1",
        "functionName": "test",
        "memoryLimitInMB": "128",
        "functionVersion": "$LATEST",
        "invokeid": "26aa3659-0294-1b4c-acde-98fbd7ddfaf4",
        "awsRequestId": "26aa3659-0294-1b4c-acde-98fbd7ddfaf4",
        "invokedFunctionArn": "arn:aws:lambda:us-west-2:2745724126771244:function:test"
      }
    };
    return test_response;
  }


}(jQuery));
