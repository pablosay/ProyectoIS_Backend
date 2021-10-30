const {Client} = require('pg');
const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "pg1234",
    database: "wcnutrition"
})

client.connect((error) => {
    if(error){
        console.log("No se puede conectar a la base de datos");
    } else {
        console.log("Servidor de base de datos corriendo");
    }
});

module.exports = client;