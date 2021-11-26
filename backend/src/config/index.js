// load .env
require("dotenv").config();

module.exports = {
    app: {
        port: parseInt(process.env.APP_PORT) || 80
    },
    mongoDB: {
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD,
        cluster: process.env.MONGODB_CLUSTER,
        collection: process.env.MONGODB_COLLECTION
    },
    tokens: {
        secretKey: process.env.TOKENS_SECRET_KEY || "12345"
    }
}