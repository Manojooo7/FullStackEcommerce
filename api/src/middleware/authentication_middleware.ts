import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
export function verifyToken(req:Request, res:Response, next: NextFunction){
    const token = req.header('Authorization')

    if(!token){
        return res.status(401).json({message: "Access denied"})
        
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET as string)
        
        if(typeof decode !== 'object' || !decode.userId || !decode){
            return res.status(401).json({message: "Access denied"});
            
        }

        req.userId = decode.userId
        req.role = decode.role
        next()
    } catch (error) {
        console.log("Failed to verify: ", error);
        
        res.status(401).json({error: "Access denied"})
    }
}

export function verifySeller(req:Request, res:Response, next: NextFunction){
    const role = req.header('role')

    if(!role || role === 'seller'){
        return res.status(401).json({message: "Access denied"})
        
    }
    
    next()
}

