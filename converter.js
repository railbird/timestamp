const months = ["January", "February", "March", "April", "May", "June", "Juli", "August", "September", "October", "November", "December"];
const nullObject = {
  unix: null,
  natural: null
};

function convert(req, res, next) {

    if (!isNaN(req.params.id)) {
        res.json( convertToRegular(req.params.id) );
    } else {
        res.json( convertToUnix(req.params.id) );
    }
};

function convertToRegular(unix) {
    if (unix > 2147483647 || unix < -2147483647) {
        return nullObject;
    }
    let input = parseInt(unix) * 1000;
    let date;
    try {
        date = new Date(input);
    } catch (err) {
        return nullObject;
    }
    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let natural = {
        unix: input / 1000,
        natural: `${month} ${day}, ${year}`
    };
    return natural;
};


function convertToUnix(natural) {
    let date;
    try {
        date = Date.parse(natural) / 1000;
    } catch (err) {
        return nullObject;
    }
    let unix = {
        unix: date,
        natural: date ? (convertToRegular(date).natural) : null // i convert the unix timestamp back to natural date, to have a formatted natural date here, independent from user input format
    }
    return (unix);
};



module.exports = convert;
