module.exports.setup = function(config) {
    config.inprod = true;

    // To be changed
    config.database.user = "postgres";
    config.database.password = "";
    config.database.host = "postgres";
    config.database.port = "5432";

    return config;
};