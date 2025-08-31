import { Request, Response } from "express"


export function listProducts(req:Request, res:Response){
    res.send("This is the list is product")
}

export function getProductById(req:Request, res:Response){
    res.send(`Details of product: ${req.params.id}`)
}

export function createProduct(req:Request, res:Response){
    res.send("A new Product has bee added")
}

export function updateProduct(req:Request, res:Response){
    res.send(`Details of product: ${req.params.id} is updated`)
}

export function deleteProduct(req:Request, res:Response){
    res.send(`Product ${req.params.id} has been deleted`)
}
