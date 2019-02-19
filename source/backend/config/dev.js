module.exports.setup = function(config) {
    config.inprod = false;

    config.database.user = "postgres";
    config.database.password = "admin";
    config.database.host = "localhost";
    config.database.port = "5432";

    return config;
};