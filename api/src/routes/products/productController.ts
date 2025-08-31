import { Request, Response } from "express"
import { db } from 'src/db'
import { productTable } from 'src/db/productsSchema'

export function listProducts(req:Request, res:Response){
    res.send("This is the list is product")
}

export function getProductById(req:Request, res:Response){
    res.send(`Details of product: ${req.params.id}`)
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
        const product = await db.insert(productTable).values(productData).returning()

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

export function updateProduct(req:Request, res:Response){
    res.send(`Details of product: ${req.params.id} is updated`)
}

export function deleteProduct(req:Request, res:Response){
    res.send(`Product ${req.params.id} has been deleted`)
}
