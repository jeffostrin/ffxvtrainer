const Clock = require ('clock')


function getParameter(pname) {
  return {
    from(event) {
      return {
        or(def) {

          // Test events through Lambda UI
          // {
          //   "utc_offset": "-5"
          // }
          if (event.utc_offset !== null && event.utc_offset !== undefined) {
            return event.utc_offset;
          }

          // API Gateway Request using query string or curl like
          // curl -X POST https://ng06xi3pog.execute-api.us-east-1.amazonaws.com/prod/schedule?utc_offset=-4
          if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {
            if (event.queryStringParameters[pname] !== null && event.queryStringParameters[pname] !== undefined) {
              return event.queryStringParameters[pname];
            }
          }

          // CURL Request like
          // curl -X POST https://ng06xi3pog.execute-api.us-east-1.amazonaws.com/prod/schedule -d '{"utc_offset":-3}'
          if (event.body !== null && event.body !== undefined) {
            let jsonBody = JSON.parse(event.body);
            if (jsonBody[pname] !== null && jsonBody[pname] !== undefined) {
              return jsonBody[pname];
            }
          }

          return def;
        }
      };
    }
  };
}


let response;

function do_handler(event, context, callback, utc_offset) {
  try {
    const clock = new Clock(utc_offset);
    response = {
        statusCode: 200,
        body: JSON.stringify({ schedule: clock.generate_json() }),
        headers: { 'Access-Control-Allow-Origin': '*', },
    }
  }
  catch (err) {
      console.log(err);
      callback(err, null);
  }

  callback(null, response)
};

exports.lambda_handler_v3 = async (event, context, callback) => {
  let utc_offset = getParameter("utcoffset").from(event).or(-8);
  do_handler(event, context, callback, utc_offset);
};
