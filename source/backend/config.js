let config = {};
config.database = {};

let variant = (process.env.NODE_ENV || "dev");
if (variant === "staging")
    variant = "production";
config.variant = variant;
config = require('./config/' + variant + '.js').setup(config);

module.exports = config;
