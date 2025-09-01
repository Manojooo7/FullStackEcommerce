import { eq } from "drizzle-orm";
import { Request, Response } from "express"
import { db } from 'src/db'
import { productTable } from 'src/db/productsSchema'

export async function listProducts(req:Request, res:Response){
    try {
        const product = await db.select().from(productTable);
        res.json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function getProductById(req:Request, res:Response){
    const id = req.params.id
    if(!id){
        res.status(400).json({message: "invalid request"})
    }
    try {
        const [product] = await db
        .select()
        .from(productTable)
        .where(eq(productTable.id, id))

        if(!product){
            res.status(404).json({messaage: "Product not found"})
        }else{
            res.json(product)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function createProduct(req:Request, res:Response){
    console.log(req.body);

    try {
        const productData = {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image || null,
            price: Number(req.body.price),
            quantity: Number(req.body.quantity),
            category: Array.isArray(req.body.category) ? req.body.category : [req.body.category],
            tags: Array.isArray(req.body.tags) ? req.body.tags : [req.body.tags]
        };
        const product = await db
        .insert(productTable)
        .values(productData)
        .returning()

        res.status(201).json({
            message: "Product created successfully",
            data: product
        })
        
    } catch (error) {
        console.log('Error creating product:', error);
        res
        .status(500).send(error)
    }
}

export async function updateProduct(req:Request, res:Response){
    
    const id = req.params.id
    const updatedData = req.body
    
    if(!id || !updatedData){
        res.status(400).json({message: "invalid request"})
    }

    try {
        const [product] = await db
        .update(productTable)
        .set(updatedData)
        .where(eq(productTable.id, id))
        .returning()

        if(product){
            res.status(200).json(product)
        }else{
            res.status(404).json({message: "Product not found"})
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

export async function deleteProduct(req:Request, res:Response){
    
    const id = req.params.id
    
    if(!id){
        res.status(400).json({message: "invalid request"})
    }

    try {
       const [deletedProduct] = await db
       .delete(productTable)
       .where(eq(productTable.id, id))
       .returning();

       if(deletedProduct){
           res.status(204).json({message: "Product has been moved/deleted"})
       }else{
        res.status(404).json({message: "Product not found"})
       }

    } catch (error) {
        res.status(500).json(error)
    }
}
