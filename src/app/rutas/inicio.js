const conn = require('../../config/database');
const jwt = require('jsonwebtoken');
module.exports = (app) => {
    app.get('/inicio/tipo/:tipo/usuario/:usuario/pw/:pw', (req, res, next) => {
        let query = `SELECT usuario FROM ${req.params.tipo} WHERE usuario = '${req.params.usuario}' AND pw = '${req.params.pw}'`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                console.log(err);
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                if(rows.rows.length > 0){
                    let data = JSON.stringify(rows.rows[0]);
                    const token = jwt.sign(data, 'xyw');
                    res.json({status: 1, mensaje: "Consulta ejecutada", usuario:rows.rows, token});
                }
            }
        });
    });
}