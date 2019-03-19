
window.onload = function() {

  var explainScheduleLink = document.getElementById("explain_schedule");
  explainScheduleLink.onclick = function() {
    var explanationText = document.getElementById("schedule_explanation");
    if (explanationText.style.display === "none") {
      explanationText.style.display = "block";
    } else {
      explanationText.style.display = "none";
    }
    return false;
  }

  var explainTrainingLink = document.getElementById("explain_training");
  explainTrainingLink.onclick = function() {
    var explanationText = document.getElementById("training_explanation");
    if (explanationText.style.display === "none") {
      explanationText.style.display = "block";
    } else {
      explanationText.style.display = "none";
    }
    return false;
  }
}



var Padding = function() {
  return {
    // https://stackoverflow.com/questions/2686855/is-there-a-javascript-function-that-can-pad-a-string-to-get-to-a-determined-leng
    _pad: function(pad, str, padLeft) {
      if (typeof str === 'undefined')
        return pad;
      if (padLeft) {
        return (pad + str).slice(-pad.length);
      } else {
        return (str + pad).substring(0, pad.length);
      }
    },

    _createFormat(length, fillCharacter) {
      var fill = "";
      for (var i = 0; i < length; ++i) {
        fill += fillCharacter;
      }
      return fill;
    },

    leftPadFormat: function(paddingFormat, valueToPad) {
      return (paddingFormat + valueToPad).slice(-paddingFormat.length);
    },

    rightPadFormat: function(paddingFormat, valueToPad) {
      return (valueToPad + paddingFormat).substring(0, paddingFormat.length);
    },

    leftPad: function lpad(str, length, fillCharacter) {
      var format = this._createFormat(Math.max(length, str.length), fillCharacter);
      var r = this.leftPadFormat(format, str);
      return r;
    },


    rightPad: function lpad(str, length, fillCharacter) {
      var format = this._createFormat(Math.max(length, str.length), fillCharacter);
      var r = this.rightPadFormat(format, str);
      return r;
    },
  }
}

var Ctime = function(padding) {
  var ONE_HOUR_AGO = -1 * 60 * 60;
  var SECONDS_IN_MINUTE = 60;
  var SECONDS_IN_HOUR = 60 * 60;
  var SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;

  return {
    nowSepoch: function() {
      // for (var m in now) {
      //   console.log(m);
      // }
      return new Date().valueOf() / 1000;
    },

    asRelativeTime: function(relativeSeconds) {
      if (relativeSeconds <= ONE_HOUR_AGO) {
        return "past"
      }
      if (relativeSeconds <= 0) {
        return "now";
      }
      var futureTime = this.asFutureTime(relativeSeconds);
      return "in " + futureTime;
    },
    asFutureTime: function(relativeSeconds) {
      var days = this._humanifyDays(relativeSeconds);
      relativeSeconds = relativeSeconds % SECONDS_IN_DAY;

      var hours = this._humanifyHours(relativeSeconds);
      relativeSeconds = relativeSeconds % SECONDS_IN_HOUR;

      var minutes = this._humanifyMinutes(relativeSeconds)
      relativeSeconds = relativeSeconds % SECONDS_IN_MINUTE;

      var seconds = this._humanifySeconds(relativeSeconds);
      return days + hours + minutes + seconds;
    },

    _humanifyDays: function(timeInSeconds) {
      if (timeInSeconds < SECONDS_IN_DAY) {
        return "";
      }

      var days = Math.trunc(timeInSeconds / SECONDS_IN_DAY);
      return days + "d ";
    },

    _humanifyHours: function(timeInSeconds) {
      if (timeInSeconds < SECONDS_IN_HOUR) {
        return "0:";
      }

      var hours = Math.trunc(timeInSeconds / SECONDS_IN_HOUR);
      return hours + ":";
    },

    _humanifyMinutes: function(timeInSeconds) {
      var minutes = Math.trunc(timeInSeconds / 60);
      return padding.leftPadFormat("00", minutes.toString()) + ":";
    },

    _humanifySeconds: function(timeInSeconds) {
      var minutes = Math.trunc(timeInSeconds);
      return padding.leftPadFormat("00", minutes.toString())
    }
  }
};



(function trainer($, ct, padder) {

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
      var enriched_name = e + " (" + score + ")"
      result.push({ name: e, score: score, enriched_name: enriched_name })
    });

    return result;
  }

  function present_hourly_events(hourlyEvents, padding) {
    hourlyEvents.sort((x,y) => { return y.score - x.score });

    if (hourlyEvents.length == 1) {
      return "[ " + hourlyEvents[0].name + " ]";
    }

    return "[ " + padder.leftPad(hourlyEvents[0].name, 26, padding) + " or " + padder.rightPad(hourlyEvents[1].name, 21, padding) + " ]"
  }

  function present_hourly_events2(hourlyEvents, padding) {
    hourlyEvents.sort((x,y) => { return y.score - x.score });
    return hourlyEvents[0].name;

    // if (hourlyEvents.length == 1) {
    //   return hourlyEvents[0].name;
    // }
    //
    // return hourlyEvents[0].name + " or " + hourlyEvents[1].name;
  }

  function present_hourly_events3(hourlyEvents) {
    hourlyEvents.sort((x,y) => { return y.score - x.score });
    return hourlyEvents[0].name;
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
    $('#updates').empty();
    _updateClock(window.ffxv_schedule);

    // function ajaxError(jqXHR, textStatus, errorThrown) {
        // console.error('Error requesting schedule: ', textStatus, ', Details: ', errorThrown);
        // console.error('Response: ', jqXHR.responseText);
    //     alert('An error occured when requesting the schedule:\n' + jqXHR.responseText);
    // }
  }

  function updateClock(response) {
    $('#comm_error').empty();
    $('#updates').empty();

    var currentTime = "<div>";
    currentTime += "Last Refresh at " + (new Date()); //.format('hh:mma (MM-DD)'));
    currentTime += "</div>";
    $('#updates').append(currentTime);

    window.ffxv_schedule = response;
    _updateClock(window.ffxv_schedule);
  }

  function _updateClock(response) {
    // console.log(response);
    // console.log(response.schedule);
    var nowSepoch = ct.nowSepoch();

    // $('#updates').append($('<div id=schedule />'));
    // Object.keys(response.schedule.hepochs).sort().forEach(
    //   function(key) {
    //     var line = "<div>";
    //     var padding = " ";
    //
    //     var val = response.schedule.hepochs[key];
    //
    //     if (val.isCurrentHepoch) {
    //       line += "=>";
    //       padding = "=";
    //     } else if (key % 4 == 0) {
    //       line += "--";
    //       padding = "-";
    //     } else {
    //       line += "  ";
    //     }
    //
    //     line += " " + val.dayTime;
    //     var hepoch = val.hepoch;
    //     var relativeTime = ct.asRelativeTime(hepoch * 60 * 60 - nowSepoch);
    //     line += lpad(" (" + relativeTime + ") ", 16, padding) + " ";
    //
    //     var hourlyEvents = score_hourly_events(val.hourly_events);
    //     var hourlyOutput = present_hourly_events(hourlyEvents, padding);
    //     line += hourlyOutput;
    //
    //     if (val.luna_events !== null && val.luna_events !== undefined) {
    //       if (val.luna_events.length > 0) {
    //         var lunaEvent = lpad(" " + val.luna_events + " ", 20, padding);
    //         line += " " + padding + lunaEvent;
    //       }
    //     }
    //
    //     line += "</div>";
    //     $('#schedule').append(line);
    //   }
    // );

    $('#updates').append($('<div><table id=schedule /></div>'));
    $('#schedule').append(
      "<th></th>" +
      "<th align=center>Start Time</th>" +
      "<th></th>" +
      "<th align=center>From Now</th>" +
      "<th></th>" +
      "<th></th>" +
      "<th  align=center>Mini Events</th>" +
      "<th></th>" +
      "<th></th>" +
      "<th align=center>Luna Gifts</th>" +
      "<th></th>"
    );
    Object.keys(response.schedule.hepochs).sort().forEach(
      function(key) {
        var line = "<tr>";

        var val = response.schedule.hepochs[key];

        var padding = "";
        var header = "";
        if (val.isCurrentHepoch) {
          header = "=>";
          padding = "=";
        } else if (key % 4 == 0) {
          padding = "--";
        }

        line += "<td>" + header + "</td>";
        line += "<td>" + val.dayTime + "</td>";

        var hepoch = val.hepoch;
        var relativeTime = ct.asRelativeTime(hepoch * 60 * 60 - nowSepoch);
        line += "<td>(</td><td align=center>" + relativeTime + "</td><td>)</td>";

        line += "<td>[</td><td align=right>";
        var hourlyEvents = score_hourly_events(val.hourly_events);
        hourlyEvents = present_hourly_events3(hourlyEvents);
        line += hourlyEvents;
        line += "</td>";
        line += "<td>]</td>";

        if (val.luna_events !== null && val.luna_events !== undefined) {
          line += "<td>[</td><td>";
          if (val.luna_events.length == 1) {
            line += val.luna_events[0];
          } else if (val.luna_events.length == 2) {
            line += val.luna_events[0] + " and " + val.luna_events[1];
          } else {
            line += "unknown: " + val.luna_events;
          }
          // val.luna_events.forEach((e) => {
          //   line += "<div>" + e + "</div>";
          // });
          line += "</td><td>]</td>";
        }

        line += "</tr>";
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
    var nowHepoch = (new Date().valueOf() / 1000) / 60 / 60;
    var test_response = {
      "schedule": {
        "hepochs": {
          "425545": {
            "hepoch": (nowHepoch-1),
            "isCurrentHepoch": true,
            "dayTime": "06:00pm (07-18)",
            "hourly_events": {
              "Monster Hunt": 200,
              "Guild Quests": 50
            },
            "luna_events": [ "25x Luna's Gift Fragment" ],
          },
          "425546": {
            "hepoch": (nowHepoch),
            "isCurrentHepoch": false,
            "dayTime": "07:00pm (07-18)",
            "hourly_events": {
              "Guild Quests": 250,
              "Guild RSS Help": 25,
              "Monster": 50
            },
            "luna_events": [ "1x Adventurers Contract","25x Luna's Gift Fragment" ]
          },
          "425547": {
            "hepoch": (nowHepoch+1),
            "isCurrentHepoch": false,
            "dayTime": "08:00pm (07-18)",
            "hourly_events": {
              "Monster Hunt": 200,
              "Guild Quests": 50
            },
            "luna_events": ["5x Expedition Shard"]
          },
          "425548": {
            "hepoch": (nowHepoch+2),
            "isCurrentHepoch": false,
            "dayTime": "09:00pm (07-18)",
            "hourly_events": {
              "Combine Gems": 250,
              "Gather RSS": 25,
              "Hero Quests": 50
            },
            "luna_events": ["30x 1 Minute Adventurer Speed Up"]
          },
          "425549": {
            "hepoch": (nowHepoch+3),
            "isCurrentHepoch": false,
            "dayTime": "10:00pm (07-18)",
            "hourly_events": {
              "Monster": 200,
              "Guild Quests": 50
            },
            "luna_events": ["5x Expedition Fragment"]
          },
          "425550": {
            "hepoch": (nowHepoch+4),
            "isCurrentHepoch": false,
            "dayTime": "11:00pm (07-18)",
            "hourly_events": {
              "Hero Quests": 250,
              "Guild RSS Help": 25,
              "Monster": 50
            },
            "luna_events": ["25x Secret Gift Fragment"]
          },
          "425550": {
            "hepoch": (nowHepoch+4),
            "isCurrentHepoch": false,
            "dayTime": "11:00pm (07-18)",
            "hourly_events": {
              "Training": 250
            },
            "luna_events": ["25x Luna's Gift Fragment","5x VIP Quest Shard"]
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


}(jQuery, Ctime(Padding()), Padding()));
