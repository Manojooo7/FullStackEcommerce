import {Router} from 'express'
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from '../products/productController.js'
import { validateData, } from '../../middleware/validation_middleware.js'
import { createProductSchema, updateProductSchema } from 'src/db/productsSchema.js'
import { verifySeller, verifyToken } from 'src/middleware/authentication_middleware.js'

const router = Router()




router.get('/', listProducts)

router.get('/:id', getProductById)

router.post('/', verifyToken, verifySeller, validateData(createProductSchema), createProduct)

router.put('/:id', verifyToken, verifySeller, validateData(updateProductSchema), updateProduct)

router.delete('/:id', verifyToken, verifySeller, deleteProduct)

export default router;