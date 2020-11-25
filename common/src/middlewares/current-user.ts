import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string,
    email: string;
}


//existinng type definition and make modification, we don't have to extend it, more easy.
declare global {
    namespace Express{
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (req: Request, 
                            res: Response, 
                            next: NextFunction) => {
                    
    if( !req.session?.jwt){
        return next();
    }

    try{
      const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
      req.currentUser = payload;
    } catch (err) {}

    next();

};