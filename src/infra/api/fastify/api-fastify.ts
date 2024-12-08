import { Api } from "../api";
import { Route } from "./routes/route";
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

export class ApiFastify implements Api {
    private app: FastifyInstance;

    private constructor(routes: Route[]) {
        this.app = Fastify({ logger: true });
        this.addRoutes(routes); 
    }

    public static create(routes: Route[]) {
        return new ApiFastify(routes);
    }
    
    public registerHook(handler:(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => void){
        this.app.addHook('onRequest', handler);
    }

    private addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod().toLowerCase(); 
            const handler = route.getHandler();

            this.app.route({
                method: method as any, 
                url: path,
                handler,
            });
        });
        
    }

    public async start(port: number) {
        try {
            await this.app.listen({ port });
            console.log(`Server running on port ${port}`);
            this.listRoutes();
        } catch (err) {
            this.app.log.error(err);
            process.exit(1);
        }
    }

    private listRoutes() {
        const routes = this.app.printRoutes(); 
        console.log(routes);
    }

}

