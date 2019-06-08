//create middle ware function
const logger = (request, response, next) => {
    console.log(request.protocol, "//", request.get('host'), request.originalUrl);
    next();
}
//initialise middle ware

module.exports = logger;