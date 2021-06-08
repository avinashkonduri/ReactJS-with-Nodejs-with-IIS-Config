let environment = "dev";

let serverURLs = {
    "dev": {
        "NODE_SERVER": "http://localhost",
        "NODE_SERVER_PORT": "4200",
        "MONGO_DB": "mongodb+srv://avinash:mbb1ULXarL7O0Uek@cluster0.tim9q.mongodb.net/test"
    }
}

let config = {
    "NODE_SERVER_PORT": {
        "port": `${serverURLs[environment].NODE_SERVER_PORT}`
    },
    "NODE_SERVER_URL": {
        "url": `${serverURLs[environment].NODE_SERVER}`
    },
    "DB_URL": {
        "url": `${serverURLs[environment].MONGO_DB}`
    },
};

module.exports = {
    config: config
};
