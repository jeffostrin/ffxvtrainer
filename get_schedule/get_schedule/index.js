const Clock = require ('clock')

let response;

exports.lambda_handler_v2 = async (event, context, callback) => {
    try {
        const clock = new Clock();
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
