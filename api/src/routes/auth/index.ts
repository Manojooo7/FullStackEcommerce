import { Router } from "express";
import { createUserSchema, loginSchema, userTable } from "../../db/usersSchema.js";
import { validateData } from "../../middleware/validation_middleware.js";
import bcrypt from "bcryptjs";
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken"

const router = Router();

router.post('/register', validateData(createUserSchema), async(req, res)=>{
   
    try {
        const data = req.cleanBody ;
        data.password = await bcrypt.hash(data.password, 10)
        const [user] = await db
       .insert(userTable)
       .values(data)
       .returning()

       const { password: _, ...userWithoutPassword } = user;
       
       
       res.status(201).json({...userWithoutPassword})
        
    } catch (error) {
        res.status(500).send("Something went wrong")
    }

})

router.post('/login', validateData(loginSchema), async(req, res)=>{
    try {
        const {email, password} = req.cleanBody;
        
        const [user] = await db.
        select()
        .from(userTable)
        .where(eq(userTable.email, email));


        
        if(!user){
            return res.status(401).send("Authentication failed")
        }
        
        
        
        const isMatched = await bcrypt.compare(password, user.password)
        if(!isMatched){
            return res.status(401).send("Authentication failed")
        }
        const {password: _, ...userWithoutPassword} = user
        
        const token = jwt.sign({
            userId: user.id,
            role: user.role
        }, process.env.JWT_SECRET as string, {expiresIn: '12h'})

        return res.status(200).json({
            user: userWithoutPassword,
            token: token
        })

        // if(haspassword !== user.password){
        //     res.status(400).send("Wrong password")
        // }
    } catch (error) {
        console.log("Error: ", error);
        
        return res.status(500).json({message: "Something went wrong"})
    }   
})

export default router