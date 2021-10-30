const conn = require('../../config/database');
module.exports = (app) => {
    //Ingresar nutricionista
    app.post('/ingresarNutricionista', (req, res) => {
        let query = `INSERT INTO nutris(usuario, pw, telefono, nombre, descripcion, colegiado) VALUES (concat('N', nextval('"num_nutri"')), '${req.body.pw}', '${req.body.telefono}', '${req.body.nombre}', '${req.body.des}', ${req.body.colegiado})`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });
    //Listar nutricionistas
    app.get('/listarNutricionistas', (req,res) => {
        let query = `SELECT nombre, usuario, telefono, colegiado, descripcion FROM nutris`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la base de datos"});
            } else {
                res.json({status: 1, mensaje: "No hay error", nutris:rows.rows});
            }
        })
    })
}