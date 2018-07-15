const clock = require ('clock')
const impl = require ('impl')
const axios = require('axios')
const url = 'http://checkip.amazonaws.com/';
let response;


exports.lambda_handler = async (event, context, callback) => {
    try {
        const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                console: clock.generate_console(),
                schedule: clock.generate_json(),
                message: 'clock',
                something: 'foo',
                car: impl.car(),
                location: ret.data.trim(),
                ee: event,
                con: context
            })
        }
    }
    catch (err) {
        console.log(err);
        callback(err, null);
    }

    callback(null, response)
};
