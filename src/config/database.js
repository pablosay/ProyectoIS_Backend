const {Client} = require('pg');
const client = new Client({
    host: "wcnutrition.cfk5ys1jmebn.us-east-2.rds.amazonaws.com",
    port: 5432,
    user: "postgres",
    password: "pg123456",
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