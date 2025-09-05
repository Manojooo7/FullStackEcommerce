import express, {json, urlencoded} from 'express'
import authRoutes from './routes/auth/index.js'
import productsRoutes from './routes/products/index.js'

const app = express();
app.use(urlencoded({extended: false}))
app.use(json())

const PORT = process.env.PORT || 3000

app.get('/', (req, res)=>{
    res.send("Hello Manoj")
})

app.use('/products', productsRoutes)
app.use('/auth', authRoutes)




app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})