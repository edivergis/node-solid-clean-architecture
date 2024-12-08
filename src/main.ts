import { ApiFastify } from "./infra/api/fastify/api-fastify";
import { userRoutes } from "./infra/api/fastify/routes/user/user-routes";
require('dotenv').config();
import config = require("config");
import { Application } from "./infra/config-interfaces/application-interface";
import { corsMiddleware } from "./infra/api/fastify/hooks/cors-options.hook";


function main() {

    const application:Application = config.get('Application');

    const routes = [
        ...userRoutes()  
    ];

    const api = ApiFastify.create(routes);
    const port = application.port;

    api.registerHook(corsMiddleware)
    
    api.start(port);
    
}

main();