/*global WildRydes _config*/

var FFXVTrainer = window.FFXVTrainer || {};
FFXVTrainer.clock = FFXVTrainer.clock || {};

(function rideScopeWrapper($) {

  function _lpad(pad, str) {
    return (str + pad).substring(0, pad.length);
  }

  function lpad(str, length, fillCharacter) {
    var fill = "";
    for (var i = 0; i < length; ++i) {
      fill += fillCharacter;
    }
    return _lpad(fill, str);
  }


  function updateClock(response) {
    $('#updates').append($('<div>' + response.schedule['currentTime'] + '</div>'));
    $('#updates').append($('<div>' + response.schedule['nextRVR'] + '</div>'));

    Object.keys(response.schedule.events).sort().forEach(
      function(key) {
        if (key === "currentTime" || key === "nextRVR") {
          return;
        }
        var val = response.schedule.events[key];
        var line = "<div>";
        var padding = " ";

        if (val.isCurrentHepoch) {
          line += "=>";
          padding = "=";
        } else {
          line += "  ";
        }

        line += " " + val.dayTime;
        line += lpad(" (" + val.relativeTime + ") ", 11, padding) + " ";
        for (var i = 0; i < val.events.length; ++i) {
          var eventName = val.events[i];
          if (eventName != "") {
            eventName = eventName + " ";
          }
          line += lpad(eventName, 20, padding) + " ";
        }

        line += "</div>";
        $('#updates').append(line);
        console.log(key);
      }
    );
  }

  $(function onDocReady() {
    // $.ajax({
    //     method: 'GET',
    //     url: _config.api.invokeUrl + '/clock',
    //     headers: {
    //         // Authorization: authToken
    //     },
    //     // data: JSON.stringify({
    //     //     PickupLocation: {
    //     //         Latitude: pickupLocation.latitude,
    //     //         Longitude: pickupLocation.longitude
    //     //     }
    //     // }),
    //     contentType: 'application/json',
    //     success: completeRequest,
    //     error: function ajaxError(jqXHR, textStatus, errorThrown) {
    //         console.error('Error requesting clock: ', textStatus, ', Details: ', errorThrown);
    //         console.error('Response: ', jqXHR.responseText);
    //         alert('An error occured when requesting the clock:\n' + jqXHR.responseText);
    //     }
    // });
    var response = getResponse1();
    updateClock(response);
  });


  function getResponse1() {
    var test_response_1 = {
      "schedule": {
        "currentTime": "Current time is --- 01:58 (07-19) GMT --- 09:58pm (07-18) EST --- 06:58pm (07-18) PST",
        "nextRVR": "Next Major RVR in 2:22:01",
        "events": {
          "425545": {
            "hepoch": 425545,
            "isCurrentHepoch": true,
            "dayTime": "06:00pm (07-18)",
            "relativeTime": "now",
            "events": [
              "Monster Hunt",
              "",
              "Empire Ascend (cont)"
            ]
          },
          "425546": {
            "hepoch": 425546,
            "isCurrentHepoch": false,
            "dayTime": "07:00pm (07-18)",
            "relativeTime": "in 0:01",
            "events": [
              "Guild RSS Help ",
              "Luna Gifts ",
              "Empire Ascend (cont)"
            ]
          },
          "425547": {
            "hepoch": 425547,
            "isCurrentHepoch": false,
            "dayTime": "08:00pm (07-18)",
            "relativeTime": "in 1:01",
            "events": [
              "Guild Quests ",
              "",
              "Empire Ascend (cont)"
            ]
          },
          "425548": {
            "hepoch": 425548,
            "isCurrentHepoch": false,
            "dayTime": "09:00pm (07-18)",
            "relativeTime": "in 2:01",
            "events": [
              "Guild RSS Help ",
              "",
              "Research "
            ]
          },
          "425549": {
            "hepoch": 425549,
            "isCurrentHepoch": false,
            "dayTime": "10:00pm (07-18)",
            "relativeTime": "in 3:01",
            "events": [
              "Guild Defend ",
              "",
              "Research (cont)"
            ]
          },
          "425550": {
            "hepoch": 425550,
            "isCurrentHepoch": false,
            "dayTime": "11:00pm (07-18)",
            "relativeTime": "in 4:01",
            "events": [
              "Spin the Wheel ",
              "Luna Gifts ",
              "Research (cont)"
            ]
          },
          "425551": {
            "hepoch": 425551,
            "isCurrentHepoch": false,
            "dayTime": "12:00am (07-19)",
            "relativeTime": "in 5:01",
            "events": [
              "Secret Gift ",
              "",
              "Research (cont)"
            ]
          },
          "425552": {
            "hepoch": 425552,
            "isCurrentHepoch": false,
            "dayTime": "01:00am (07-19)",
            "relativeTime": "in 6:01",
            "events": [
              "Hero Quests ",
              "",
              "Empire Ascend "
            ]
          },
          "425553": {
            "hepoch": 425553,
            "isCurrentHepoch": false,
            "dayTime": "02:00am (07-19)",
            "relativeTime": "in 7:01",
            "events": [
              "Gather RSS",
              "",
              "Empire Ascend (cont)"
            ]
          },
          "425554": {
            "hepoch": 425554,
            "isCurrentHepoch": false,
            "dayTime": "03:00am (07-19)",
            "relativeTime": "in 8:01",
            "events": [
              "Unknown ",
              "Luna Gifts ",
              "Empire Ascend (cont)"
            ]
          },
          "425555": {
            "hepoch": 425555,
            "isCurrentHepoch": false,
            "dayTime": "04:00am (07-19)",
            "relativeTime": "in 9:01",
            "events": [
              "Unknown ",
              "",
              "Empire Ascend (cont)"
            ]
          },
          "425556": {
            "hepoch": 425556,
            "isCurrentHepoch": false,
            "dayTime": "05:00am (07-19)",
            "relativeTime": "in 10:01",
            "events": [
              "Training",
              "",
              "Research "
            ]
          },
          "425557": {
            "hepoch": 425557,
            "isCurrentHepoch": false,
            "dayTime": "06:00am (07-19)",
            "relativeTime": "in 11:01",
            "events": [
              "Monster Hunt",
              "",
              "Research (cont)"
            ]
          },
          "425558": {
            "hepoch": 425558,
            "isCurrentHepoch": false,
            "dayTime": "07:00am (07-19)",
            "relativeTime": "in 12:01",
            "events": [
              "Guild RSS Help ",
              "Luna Gifts ",
              "Research (cont)"
            ]
          },
          "425559": {
            "hepoch": 425559,
            "isCurrentHepoch": false,
            "dayTime": "08:00am (07-19)",
            "relativeTime": "in 13:01",
            "events": [
              "Guild Quests ",
              "",
              "Research (cont)"
            ]
          },
          "425560": {
            "hepoch": 425560,
            "isCurrentHepoch": false,
            "dayTime": "09:00am (07-19)",
            "relativeTime": "in 14:01",
            "events": [
              "Guild RSS Help ",
              "",
              "Empire Ascend "
            ]
          },
          "425561": {
            "hepoch": 425561,
            "isCurrentHepoch": false,
            "dayTime": "10:00am (07-19)",
            "relativeTime": "in 15:01",
            "events": [
              "Guild Defend ",
              "",
              "Empire Ascend (cont)"
            ]
          },
          "425562": {
            "hepoch": 425562,
            "isCurrentHepoch": false,
            "dayTime": "11:00am (07-19)",
            "relativeTime": "in 16:01",
            "events": [
              "Spin the Wheel ",
              "Luna Gifts ",
              "Empire Ascend (cont)"
            ]
          },
          "425563": {
            "hepoch": 425563,
            "isCurrentHepoch": false,
            "dayTime": "12:00pm (07-19)",
            "relativeTime": "in 17:01",
            "events": [
              "Secret Gift ",
              "",
              "Empire Ascend (cont)"
            ]
          },
          "425564": {
            "hepoch": 425564,
            "isCurrentHepoch": false,
            "dayTime": "01:00pm (07-19)",
            "relativeTime": "in 18:01",
            "events": [
              "Hero Quests ",
              "",
              "Research "
            ]
          },
          "425565": {
            "hepoch": 425565,
            "isCurrentHepoch": false,
            "dayTime": "02:00pm (07-19)",
            "relativeTime": "in 19:01",
            "events": [
              "Gather RSS",
              "",
              "Research (cont)"
            ]
          },
          "425566": {
            "hepoch": 425566,
            "isCurrentHepoch": false,
            "dayTime": "03:00pm (07-19)",
            "relativeTime": "in 20:01",
            "events": [
              "Guild Quests ",
              "Luna Gifts ",
              "Research (cont)"
            ]
          },
          "425567": {
            "hepoch": 425567,
            "isCurrentHepoch": false,
            "dayTime": "04:00pm (07-19)",
            "relativeTime": "in 21:01",
            "events": [
              "Guild Help ",
              "",
              "Research (cont)"
            ]
          },
          "425568": {
            "hepoch": 425568,
            "isCurrentHepoch": false,
            "dayTime": "05:00pm (07-19)",
            "relativeTime": "in 22:01",
            "events": [
              "Training",
              "",
              "Empire Ascend "
            ]
          },
          "425569": {
            "hepoch": 425569,
            "isCurrentHepoch": false,
            "dayTime": "06:00pm (07-19)",
            "relativeTime": "in 23:01",
            "events": [
              "Monster Hunt",
              "",
              "Empire Ascend (cont)"
            ]
          },
        }
      },
      "message": "clock",
      "something": "foo",
      "car": "carz",
      "location": "216.9.110.2",
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
    return test_response_1;
  }

  function getResponse2() {
    var test_response_2 =
    {
      "schedule": {
        "currentTime": "Current time is --- 06:37 (07-21) GMT --- 02:37am (07-21) EST --- 11:37pm (07-20) PST",
        "nextRVR": "Next Major RVR in 17:22",
        "events": {
          "425598": {
            "hepoch": 425598,
            "isCurrentHepoch": true,
            "dayTime": "11:00pm (07-20)",
            "relativeTime": "now",
            "events": [
              "Spin the Wheel ",
              "Luna Gifts ",
              "Research (cont)"
            ]
          },
          "425599": {
            "hepoch": 425599,
            "isCurrentHepoch": false,
            "dayTime": "12:00am (07-21)",
            "relativeTime": "in 0:22",
            "events": [
              "Secret Gift ",
              "",
              "Research (cont)"
            ]
          },
          "425600": {
            "hepoch": 425600,
            "isCurrentHepoch": false,
            "dayTime": "01:00am (07-21)",
            "relativeTime": "in 1:22",
            "events": [
              "Hero Quests ",
              "",
              "Empire Ascend "
            ]
          },
          "425601": {
            "hepoch": 425601,
            "isCurrentHepoch": false,
            "dayTime": "02:00am (07-21)",
            "relativeTime": "in 2:22",
            "events": [
              "Gather RSS <=== ",
              "",
              "Empire Ascend (cont)"
            ]
          },
          "425602": {
            "hepoch": 425602,
            "isCurrentHepoch": false,
            "dayTime": "03:00am (07-21)",
            "relativeTime": "in 3:22",
            "events": [
              "Unknown ",
              "Luna Gifts ",
              "Empire Ascend (cont)"
            ]
          },
          "425603": {
            "hepoch": 425603,
            "isCurrentHepoch": false,
            "dayTime": "04:00am (07-21)",
            "relativeTime": "in 4:22",
            "events": [
              "Unknown ",
              "",
              "Empire Ascend (cont)"
            ]
          },
          "425604": {
            "hepoch": 425604,
            "isCurrentHepoch": false,
            "dayTime": "05:00am (07-21)",
            "relativeTime": "in 5:22",
            "events": [
              "Training <=== ",
              "",
              "Research "
            ]
          },
          "425605": {
            "hepoch": 425605,
            "isCurrentHepoch": false,
            "dayTime": "06:00am (07-21)",
            "relativeTime": "in 6:22",
            "events": [
              "Monster Hunt <=== ",
              "",
              "Research (cont)"
            ]
          },
          "425606": {
            "hepoch": 425606,
            "isCurrentHepoch": false,
            "dayTime": "07:00am (07-21)",
            "relativeTime": "in 7:22",
            "events": [
              "Guild RSS Help ",
              "Luna Gifts ",
              "Research (cont)"
            ]
          },
          "425607": {
            "hepoch": 425607,
            "isCurrentHepoch": false,
            "dayTime": "08:00am (07-21)",
            "relativeTime": "in 8:22",
            "events": [
              "Guild Quests ",
              "",
              "Research (cont)"
            ]
          },
          "425608": {
            "hepoch": 425608,
            "isCurrentHepoch": false,
            "dayTime": "09:00am (07-21)",
            "relativeTime": "in 9:22",
            "events": [
              "Guild RSS Help ",
              "",
              "Empire Ascend "
            ]
          },
          "425609": {
            "hepoch": 425609,
            "isCurrentHepoch": false,
            "dayTime": "10:00am (07-21)",
            "relativeTime": "in 10:22",
            "events": [
              "Guild Defend ",
              "",
              "Empire Ascend (cont)"
            ]
          },
          "425610": {
            "hepoch": 425610,
            "isCurrentHepoch": false,
            "dayTime": "11:00am (07-21)",
            "relativeTime": "in 11:22",
            "events": [
              "Spin the Wheel ",
              "Luna Gifts ",
              "Empire Ascend (cont)"
            ]
          },
          "425611": {
            "hepoch": 425611,
            "isCurrentHepoch": false,
            "dayTime": "12:00pm (07-21)",
            "relativeTime": "in 12:22",
            "events": [
              "Secret Gift ",
              "",
              "Empire Ascend (cont)"
            ]
          },
          "425612": {
            "hepoch": 425612,
            "isCurrentHepoch": false,
            "dayTime": "01:00pm (07-21)",
            "relativeTime": "in 13:22",
            "events": [
              "Hero Quests ",
              "",
              "Research "
            ]
          },
          "425613": {
            "hepoch": 425613,
            "isCurrentHepoch": false,
            "dayTime": "02:00pm (07-21)",
            "relativeTime": "in 14:22",
            "events": [
              "Gather RSS <=== ",
              "",
              "Research (cont)"
            ]
          },
          "425614": {
            "hepoch": 425614,
            "isCurrentHepoch": false,
            "dayTime": "03:00pm (07-21)",
            "relativeTime": "in 15:22",
            "events": [
              "Guild Quests ",
              "Luna Gifts ",
              "Research (cont)"
            ]
          },
          "425615": {
            "hepoch": 425615,
            "isCurrentHepoch": false,
            "dayTime": "04:00pm (07-21)",
            "relativeTime": "in 16:22",
            "events": [
              "Guild Help ",
              "",
              "Research (cont)"
            ]
          },
          "425616": {
            "hepoch": 425616,
            "isCurrentHepoch": false,
            "dayTime": "05:00pm (07-21)",
            "relativeTime": "in 17:22",
            "events": [
              "Training <=== ",
              "",
              "Empire Ascend "
            ]
          },
          "425617": {
            "hepoch": 425617,
            "isCurrentHepoch": false,
            "dayTime": "06:00pm (07-21)",
            "relativeTime": "in 18:22",
            "events": [
              "Monster Hunt <=== ",
              "",
              "Empire Ascend (cont)"
            ]
          },
          "425618": {
            "hepoch": 425618,
            "isCurrentHepoch": false,
            "dayTime": "07:00pm (07-21)",
            "relativeTime": "in 19:22",
            "events": [
              "Guild RSS Help ",
              "Luna Gifts ",
              "Empire Ascend (cont)"
            ]
          },
          "425619": {
            "hepoch": 425619,
            "isCurrentHepoch": false,
            "dayTime": "08:00pm (07-21)",
            "relativeTime": "in 20:22",
            "events": [
              "Guild Quests ",
              "",
              "Empire Ascend (cont)"
            ]
          },
          "425620": {
            "hepoch": 425620,
            "isCurrentHepoch": false,
            "dayTime": "09:00pm (07-21)",
            "relativeTime": "in 21:22",
            "events": [
              "Guild RSS Help ",
              "",
              "Research "
            ]
          },
          "425621": {
            "hepoch": 425621,
            "isCurrentHepoch": false,
            "dayTime": "10:00pm (07-21)",
            "relativeTime": "in 22:22",
            "events": [
              "Guild Defend ",
              "",
              "Research (cont)"
            ]
          },
          "425622": {
            "hepoch": 425622,
            "isCurrentHepoch": false,
            "dayTime": "11:00pm (07-21)",
            "relativeTime": "in 23:22",
            "events": [
              "Spin the Wheel ",
              "Luna Gifts ",
              "Research (cont)"
            ]
          }
        }
      },
      "message": "clock",
      "something": "foo",
      "car": "carz",
      "location": "50.53.174.110",
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
        "logStreamName": "2018\/07\/21\/[$LATEST]23c751d68a7b6ef2cef2c1f11ad8afad",
        "functionName": "test",
        "memoryLimitInMB": "128",
        "functionVersion": "$LATEST",
        "invokeid": "19fc3514-331b-159f-9b11-7b13ad5b7fe4",
        "awsRequestId": "19fc3514-331b-159f-9b11-7b13ad5b7fe4",
        "invokedFunctionArn": "arn:aws:lambda:us-west-2:14751945987038918:function:test"
      }
    };
  return test_response_2;
  }


    // var authToken;
    // WildRydes.authToken.then(function setAuthToken(token) {
    //     if (token) {
    //         authToken = token;
    //     } else {
    //         window.location.href = '/signin.html';
    //     }
    // }).catch(function handleTokenError(error) {
    //     alert(error);
    //     window.location.href = '/signin.html';
    // });

    // function requestUnicorn(pickupLocation) {
    //     $.ajax({
    //         method: 'POST',
    //         url: _config.api.invokeUrl + '/ride',
    //         headers: {
    //             Authorization: authToken
    //         },
    //         data: JSON.stringify({
    //             PickupLocation: {
    //                 Latitude: pickupLocation.latitude,
    //                 Longitude: pickupLocation.longitude
    //             }
    //         }),
    //         contentType: 'application/json',
    //         success: completeRequest,
    //         error: function ajaxError(jqXHR, textStatus, errorThrown) {
    //             console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
    //             console.error('Response: ', jqXHR.responseText);
    //             alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
    //         }
    //     });
    // }

    // function completeRequest(result) {
    //     var unicorn;
    //     var pronoun;
    //     console.log('Response received from API: ', result);
    //     unicorn = result.Unicorn;
    //     pronoun = unicorn.Gender === 'Male' ? 'his' : 'her';
    //     displayUpdate(unicorn.Name + ', your ' + unicorn.Color + ' unicorn, is on ' + pronoun + ' way.');
    //     animateArrival(function animateCallback() {
    //         displayUpdate(unicorn.Name + ' has arrived. Giddy up!');
    //         WildRydes.map.unsetLocation();
    //         $('#request').prop('disabled', 'disabled');
    //         $('#request').text('Set Pickup');
    //     });
    // }

    // function handlePickupChanged() {
    //     var requestButton = $('#request');
    //     requestButton.text('Request Unicorn');
    //     requestButton.prop('disabled', false);
    // }
    //
    // function handleRequestClick(event) {
    //     var pickupLocation = WildRydes.map.selectedPoint;
    //     event.preventDefault();
    //     requestUnicorn(pickupLocation);
    // }

    // function animateArrival(callback) {
    //     var dest = WildRydes.map.selectedPoint;
    //     var origin = {};
    //
    //     if (dest.latitude > WildRydes.map.center.latitude) {
    //         origin.latitude = WildRydes.map.extent.minLat;
    //     } else {
    //         origin.latitude = WildRydes.map.extent.maxLat;
    //     }
    //
    //     if (dest.longitude > WildRydes.map.center.longitude) {
    //         origin.longitude = WildRydes.map.extent.minLng;
    //     } else {
    //         origin.longitude = WildRydes.map.extent.maxLng;
    //     }
    //
    //     WildRydes.map.animate(origin, dest, callback);
    // }
    //
    // function displayUpdate(text) {
    //     $('#updates').append($('<li>' + text + '</li>'));
    // }

}(jQuery));
