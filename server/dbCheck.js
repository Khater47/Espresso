//Run this with node to initialize the database and connection with hard coded data

(async ()=>{
    const dbConnection = require("./databaseScratch");
    await dbConnection.createConnection();
    let connectionTest = dbConnection.db;
    if (connectionTest !== null)
        console.log("DB INITIALIZED AND CHECKED !");
    else {
        console.log("Problems initializing db");
    }
})();