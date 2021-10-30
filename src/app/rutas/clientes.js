const conn = require('../../config/database');
module.exports = (app) => {
    //Obtener ultimo dato datos nutricionales recientes por cliente
    app.get('/cliente/perfil/:cliente', (req,res) => {
        let query = `SELECT C.nombre,C.sexo, C.telefono, (N.nombre) AS nutri ,D.calorias_dia, D.imc, D.peso, D.altura `
        + `FROM datos_nutricionales D, clientes C , nutris N `
        + `WHERE D.cliente = C.usuario AND N.usuario = C.nutri AND C.usuario = '${req.params.cliente}' `
        +`ORDER BY D.fecha DESC LIMIT 1 `;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la base de datos"});
            } else {
                res.json({status: 1, mensaje: "No hay error", perfil:rows.rows});
            }
        });
    });
    app.post('/cliente/datosnutricionales', (req, res) => {
        let query = `INSERT INTO datos_nutricionales(calorias_dia, imc, peso, altura, cliente) ` + 
        `VALUES (${req.body.calorias_dia}, ${req.body.imc}, ${req.body.peso}, ${req.body.altura}, '${req.body.cliente}')`;
        conn.query(query, (err) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });
    app.get('/cliente/progreso/datos/:cliente', (req, res) =>{
        let query = `SELECT fecha, calorias_dia, imc, peso, altura FROM datos_nutricionales WHERE cliente = '${req.params.cliente}'`;
        conn.query(query, (err,rows) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la base de datos"});
            } else {
                res.json({status: 1, mensaje: "No hay error", datos:rows.rows});
            }
        });
    });

    app.get('/cliente/progreso/datos/torso/:cliente', (req, res) =>{
        let query = `SELECT  B.fecha, B.pectoral, B.supracrestal, b.subescapular, b.supraespinal, b.abdominal  FROM consultas B WHERE B.cliente = '${req.params.cliente}'   ORDER BY B.fecha DESC LIMIT 1`;
        conn.query(query, (err,rows) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la base de datos"});
            } else {
                res.json({status: 1, mensaje: "No hay error", datos:rows.rows});
            }
        });
    });

    app.get('/cliente/progreso/datos/brazo/:cliente', (req, res) =>{
        let query = `SELECT  B.fecha, B.biceps, B.tricep FROM consultas B WHERE B.cliente = '${req.params.cliente}'   ORDER BY B.fecha DESC LIMIT 1;`;
        conn.query(query, (err,rows) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la base de datos"});
            } else {
                res.json({status: 1, mensaje: "No hay error", datos:rows.rows});
            }
        });
    });

    app.get('/cliente/progreso/datos/pierna/:cliente', (req, res) =>{
        let query = `SELECT  fecha, medial_pierna, frontal_muslo FROM consultas WHERE cliente = '${req.params.cliente}'   ORDER BY fecha DESC LIMIT 1`;
        conn.query(query, (err,rows) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la base de datos"});
            } else {
                res.json({status: 1, mensaje: "No hay error", datos:rows.rows});
            }
        });
    });
    //Menu semanal
    app.get('/cliente/menuSemanal/:cliente', (req, res)=> {
        let query = `SELECT D.dia , M.id, M.desayuno, M.almuerzo, M.cena FROM menusemanal S, menus M, dias D, clientes C WHERE  C.usuario = S.client AND S.menu = M.id AND D.dia = S.dia_semana  AND M.cliente = '${req.params.cliente}' ORDER BY S.client, D.numero`;
        conn.query(query, (err,rows) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la base de datos"});
            } else {
                res.json({status: 1, mensaje: "No hay error", menusemanal:rows.rows});
            }
        });
    });

    app.get('/cliente/menuSemanal/menusopciones/:cliente', (req, res)=> {
        let query = `SELECT DISTINCT M.id, M.desayuno, M.almuerzo, M.cena FROM menus M, menusemanal S WHERE M.cliente = '${req.params.cliente}' EXCEPT SELECT M.id, M.desayuno, M.almuerzo, M.cena  FROM menus M, menusemanal S WHERE S.menu = M.id AND S.client = '${req.params.cliente}'`;
        conn.query(query, (err,rows) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la base de datos"});
            } else {
                res.json({status: 1, mensaje: "No hay error", menus:rows.rows});
            }
        });
    });

    app.put('/cliente/actualizarMenuSemanal/cliente/:cliente/dia/:dia/menu/:menu', (req, res) => {
        let query = `UPDATE public.menusemanal SET menu= ${req.params.menu} WHERE client = '${req.params.cliente}' AND dia_semana = '${req.params.dia}';`;
        conn.query(query, (err) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });
}