// import config(s)
const {mongoDB} = require("../config/index.js");

// import module(s)
const {connect} = require("mongoose");

module.exports = async () => {
    try {
        await connect(`mongodb+srv://${mongoDB.username}:${mongoDB.password}@${mongoDB.cluster}.mongodb.net/${mongoDB.collection}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`server has successfully connected to ${mongoDB.collection} database`);
    }
    catch(error) {
        console.log(`server wasn't able to connect to ${mongoDB.collection} database`);
    }
}