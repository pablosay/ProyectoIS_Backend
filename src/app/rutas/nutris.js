const conn = require('../../config/database');
module.exports = (app) => {
    //Datos para el perfil
    app.get('/nutris/perfil/:usuario', (req,res) => {
        let query = `SELECT nombre, telefono, colegiado, descripcion FROM nutris WHERE usuario = '${req.params.usuario}'`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la base de datos"});
            } else {
                res.json({status: 1, mensaje: "No hay error", nutris:rows.rows});
            }
        });
    });
    //Ingresar cliente
    app.post('/nutris/ingresarCliente', (req, res) => {
        let query = `INSERT INTO clientes(usuario, pw, sexo, telefono,nombre, nutri) VALUES (concat('C', nextval('"num_usuario"')), '${req.body.pw}', '${req.body.sexo}', '${req.body.telefono}', '${req.body.nombre}', '${req.body.nutris}')`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                console.log(err);
                console.log(query);
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });
    //Listar clientes
    app.get('/nutris/listarClientes/:usuario', (req,res) => {
        let query = `SELECT nombre, usuario, sexo ,telefono FROM clientes WHERE nutri = '${req.params.usuario}'`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la base de datos"});
            } else {
                res.json({status: 1, mensaje: "No hay error", clientes:rows.rows});
            }
        });
    });
    //Ingresar alimentos
    app.post('/nutris/alimentos/ingresar', (req, res) => {
        let query = `INSERT INTO alimentos(nombre, tipo, calorias, prot, carb, grasa) VALUES ('${req.body.nombre}', '${req.body.tipo}', ${req.body.calorias}, ${req.body.prot}, ${req.body.carb}, ${req.body.grasa})`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });
    //Listar alimentos por tipo
    app.get('/nutris/alimentos/listar/tipo/:tipo', (req,res) => {
        let query = ``;
        if(req.params.tipo == 'D'){
            query = `SELECT nombre, calorias, prot, carb, grasa FROM alimentos WHERE tipo = 'D'`;
        } else if(req.params.tipo == 'A') {
            query = `SELECT nombre, calorias, prot, carb, grasa FROM alimentos WHERE tipo = 'A'`;
        } else if(req.params.tipo == 'C') {
            query = `SELECT nombre, calorias, prot, carb, grasa FROM alimentos WHERE tipo = 'C'`;
        }
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la base de datos"});
            } else {
                res.json({status: 1, mensaje: "No hay error", alimentos:rows.rows});
            }
        });
    });
    //Listar todos los alimentos
    app.get('/nutris/alimentos/listar/', (req,res) => {
        let query = `SELECT * FROM alimentos ORDER BY tipo ASC`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la base de datos"});
            } else {
                res.json({status: 1, mensaje: "No hay error", alimentos:rows.rows});
            }
        });
    });
    //Nueva consulta
    app.post('/nutris/consulta/nueva', (req, res) => {
        let query = `INSERT INTO consultas(calorias_dia, imc, peso, altura, tricep, pectoral, supracrestal, subescapular, biceps, medial_pierna, frontal_muslo, abdominal, supraespinal, cliente, nutri) ` + 
        `VALUES (${req.body.calorias_dia}, ${req.body.imc}, ${req.body.peso}, ${req.body.altura}, ${req.body.tricep}, ${req.body.pectoral}, ${req.body.supracrestal}, ${req.body.subescapular}, ${req.body.biceps}, ${req.body.medial_pierna}, ${req.body.frontal_muslo}, ${req.body.abdominal}, ${req.body.supraespinal}, '${req.body.cliente}', '${req.body.nutri}')`;
        conn.query(query, (err) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });
    //Listar datos generales consulta.
    app.get('/nutris/consultas/generales/:nutri', (req,res) => {
        let query = `SELECT b.numero, C.nombre, B.fecha, B.calorias_dia, B.imc, B.peso, B.altura  FROM clientes C, consultas B WHERE C.usuario = B.cliente AND C.nutri = '${req.params.nutri}' ORDER BY B.fecha DESC;`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la base de datos"});
            } else {
                res.json({status: 1, mensaje: "No hay error", generales:rows.rows});
            }
        });
    });
    //Torso
    app.get('/nutris/consultas/torso/:nutri', (req,res) => {
        let query = `SELECT b.numero, C.nombre, B.fecha, B.pectoral, B.supracrestal, b.subescapular, b.supraespinal, b.abdominal  FROM clientes C, consultas B WHERE C.usuario = B.cliente  AND C.nutri = '${req.params.nutri}' ORDER BY B.fecha DESC`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la base de datos"});
            } else {
                res.json({status: 1, mensaje: "No hay error", datostorso:rows.rows});
            }
        });
    });
    //piernas
    app.get('/nutris/consultas/pierna/:nutri', (req,res) => {
        let query = `SELECT b.numero, C.nombre, B.fecha, B.medial_pierna, B.frontal_muslo   FROM clientes C, consultas B WHERE C.usuario = B.cliente  AND C.nutri = '${req.params.nutri}' ORDER BY B.fecha DESC`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la base de datos"});
            } else {
                res.json({status: 1, mensaje: "No hay error", datospierna:rows.rows});
            }
        });
    });
    //Brazos
    app.get('/nutris/consultas/brazo/:nutri', (req,res) => {
        let query = `SELECT b.numero, C.nombre, B.fecha, B.biceps, B.tricep  FROM clientes C, consultas B WHERE C.usuario = B.cliente  AND C.nutri = '${req.params.nutri}' ORDER BY B.fecha DESC`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la base de datos"});
            } else {
                res.json({status: 1, mensaje: "No hay error", datosbrazo:rows.rows});
            }
        });
    });
    //Ingresar datos nutricionales
    app.post('/nutris/datosnutricionales', (req, res) => {
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
    //Obtener datos nutricionales recientes por cliente
    app.get('/nutris/cliente/datos/:cliente', (req,res) => {
        let query = `SELECT calorias_dia, imc, peso, altura FROM datos_nutricionales WHERE cliente = '${req.params.cliente}' ORDER BY fecha DESC LIMIT 1`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la base de datos"});
            } else {
                res.json({status: 1, mensaje: "No hay error", datos:rows.rows});
            }
        });
    });
    //Listar datos nutricionales recientes en general
    app.get('/nutris/cliente/datosgenerales/:nutri', (req,res) => {
        let query = `SELECT E.cliente,  C.nombre, E.calorias_dia, E.imc, E.peso, E.altura `
        + `FROM (SELECT D.cliente,  D.calorias_dia, D.imc, D.peso, D.altura `
        +`FROM (SELECT MAX(numero) AS mx , cliente `
        +`FROM datos_nutricionales `
        +`GROUP BY cliente) T JOIN datos_nutricionales D ON T.cliente = D.cliente AND D.numero = T.mx ) E, clientes C `
        +`WHERE C.usuario = E.cliente AND C.nutri = '${req.params.nutri}' `;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la base de datos"});
            } else {
                res.json({status: 1, mensaje: "No hay error", datos:rows.rows});
            }
        });
    });

    //Crear menu
    app.post('/nutris/ingresarMenu', (req, res) => {
        let query = `INSERT INTO menus(desayuno, almuerzo, cena, cliente) ` + 
        `VALUES ('${req.body.desayuno}', '${req.body.almuerzo}', '${req.body.cena}', '${req.body.cliente}')`;
        conn.query(query, (err) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });
    //Listar menus por cliente
    app.get('/nutris/listarMenu/:cliente', (req, res) => {
        let query = `SELECT id, desayuno, almuerzo, cena FROM menus WHERE cliente = '${req.params.cliente}'`;
        conn.query(query, (err, rows) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "No hay error", menus:rows.rows});
            }
        });
    });
    //Listar menus general
    app.get('/nutris/listarMenu/nutri/:nutri', (req, res) => {
        let query = `SELECT M.cliente, M.id, M.desayuno, M.almuerzo, M.cena FROM menus M, clientes C WHERE C.nutri = '${req.params.nutri}' and C.usuario = M.cliente ORDER BY M.cliente;`;
        conn.query(query, (err, rows) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "No hay error", menusgeneral:rows.rows});
            }
        });
    });
    //Ingresar menu a cliente
    app.post('/nutris/ingresarMenu', (req, res) => {
        let query = `INSERT INTO menus(desayuno, almuerzo, cena, cliente) ` + 
        `VALUES ('${req.body.desayuno}', '${req.body.almuerzo}', '${req.body.cena}', '${req.body.cliente}')`;
        conn.query(query, (err) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });
    //Ingresar menu semanal
    app.post('/nutris/ingresarMenuSemanal', (req, res) => {
        let query = `INSERT INTO menusemanal(client, dia_semana, menu) ` + 
        `VALUES ('${req.body.cliente}', '${req.body.dia}', ${req.body.menu})`;
        conn.query(query, (err) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });
    //Listar menu semanal por cliente
    app.get('/nutris/listarMenuSemanal/nutri/:nutri', (req, res) => {
        let query = `SELECT C.usuario, C.nombre, D.dia , M.desayuno, M.almuerzo, M.cena FROM menusemanal S, menus M, dias D, clientes C WHERE  C.usuario = S.client AND S.menu = M.id AND D.dia = S.dia_semana AND M.cliente = C.usuario AND C.nutri = '${req.params.nutri}' ORDER BY S.client, D.numero;`;
        conn.query(query, (err, rows) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "No hay error", menus:rows.rows});
            }
        });
    });
    
    /**
     * 
     * //Listar menu semanal por cliente
    app.get('/nutris/listarMenuSemanal/cliente/:client/nutri/:nutri', (req, res) => {
        let query = `SELECT M.client, M.dia_semana, N.desayuno, N.almuerzo, N.cena  FROM menusemanal M, menus N, dias D, clientes C WHERE N.cliente = M.client AND M.menu = N.id AND M.client = '${req.params.client}' AND D.dia = M.dia_semana AND C.usuario = M.client AND C.nutri = '${req.params.nutri}' ORDER BY D.numero;`;
        conn.query(query, (err, rows) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "No hay error", menus:rows.rows});
            }
        });
    });
     */
}