const app = require('./config/server');
require('./app/rutas/inicio')(app);
require('./app/rutas/nutris') (app);
require('./app/rutas/admin') (app);
require('./app/rutas/clientes')(app);
app.listen(app.get('port'),
    () => console.log(`server corriendo en puerto ${app.get('port')}`));