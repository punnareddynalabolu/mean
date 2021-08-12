let environment = "dev";

let serverURLs = {
    "dev": {
        "NODE_SERVER": "http://localhost",
        "NODE_SERVER_PORT": "3000",
        "SERVERIP":"localhost",
        "PORT":27017,
        "USERNAME":"test1",
        "PASSWORD":"test1",
        "DATABASE":"userReg"

    },
    "production": {
        "NODE_SERVER": "http://11.11.11.11",
        "NODE_SERVER_PORT": "3000",
        "SERVERIP":"localhost",
        "PORT":27017,
        "USERNAME":"test1",
        "PASSWORD":"test1",
        "DATABASE":"userReg"

    }
}

let config = {
    "DB_URL": {
        "url": `mongodb://${serverURLs[environment].USERNAME}:${serverURLs[environment].PASSWORD}@${serverURLs[environment].SERVERIP}:${serverURLs[environment].PORT}/${serverURLs[environment].DATABASE}`
    },
    "NODE_SERVER_PORT": {
        "port": `${serverURLs[environment].NODE_SERVER_PORT}`
    },
    "NODE_SERVER_URL": {
        "url": `${serverURLs[environment].NODE_SERVER}`
    },
    "jwtsecret":'punna@test'
};

module.exports = {
    config: config
};
