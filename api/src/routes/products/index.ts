import {Router} from 'express'


const router = Router()
router.get('/', (req, res)=>{
    res.send("This is the list is product")
})

router.get('/:id', (req, res)=>{
    res.send(`Product Details of: ${req.params.id}`)
})

router.post('/', (req,res)=>{
    res.send("New product is created")
})

export default router;