function setCORS(app) {
    app.use((req, res, next) => {
        const allowedOrigins = ['http://192.168.0.121:4200', 'http://localhost:4200', 'http://localhost:5173'];
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        // res.setHeader('Access-Control-Allow-Origin', ['http://192.168.0.121:4200', 'http://localhost:4200']);
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        next();
    });
}

module.exports = setCORS