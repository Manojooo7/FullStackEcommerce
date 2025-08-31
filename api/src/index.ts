import express, {json, urlencoded} from 'express'
import productsRouter from './routes/products/index'

const app = express();
app.use(urlencoded({extended: false}))
app.use(json())

const PORT = process.env.PORT || 3000

app.get('/', (req, res)=>{
    res.send("Hello Manoj")
})

app.use('/products', productsRouter)




app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})