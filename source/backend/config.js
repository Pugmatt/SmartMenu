let config = {};
config.database = {};

// Set config type based on environment (development/production)
let variant = (process.env.NODE_ENV || "dev");
if (variant === "staging")
    variant = "production";
config.variant = variant;
config = require('./config/' + variant + '.js').setup(config);

module.exports = config;
