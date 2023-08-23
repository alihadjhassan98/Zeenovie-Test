import { Injectable, NestMiddleware } from '@nestjs/common';
import * as cors from 'cors';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        cors({
            origin: 'http://localhost:4200', // Replace with the origin of your Angular app
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        })(req, res, next);
    }
}
