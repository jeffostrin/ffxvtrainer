/*global WildRydes _config*/

var FFXVTrainer = window.FFXVTrainer || {};
FFXVTrainer.clock = FFXVTrainer.clock || {};

(function rideScopeWrapper($) {
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

      var keys = Object.keys(response.schedule);
      delete keys["currentTime"];
      delete keys.nextRVR;

      var keys = keys.sort().forEach(
        function(key) {
          if (key === "currentTime" || key === "nextRVR") {
            return;
          }
          var val = response.schedule[key];
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
      //alert("pre-request");

      var response = {
        "schedule": {
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
          "currentTime": "Current time is --- 01:58 (07-19) GMT --- 09:58pm (07-18) EST --- 06:58pm (07-18) PST",
          "nextRVR": "Next RVR in 2:22:01"
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
      updateClock(response);
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

      //alert("post-request");


        // $('#request').click(handleRequestClick);
        // $(WildRydes.map).on('pickupChange', handlePickupChanged);
        //
        // WildRydes.authToken.then(function updateAuthMessage(token) {
        //     if (token) {
        //         displayUpdate('You are authenticated. Click to see your <a href="#authTokenModal" data-toggle="modal">auth token</a>.');
        //         $('.authToken').text(token);
        //     }
        // });
        //
        // if (!_config.api.invokeUrl) {
        //     $('#noApiMessage').show();
        // }
    });

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
