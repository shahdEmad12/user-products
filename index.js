import express from 'express'  
import UserRouter from './src/modules/users/user.routes.js'
import ProductRouter from './src/modules/products/products.routes.js'
import connection_db from './DB/connection.js'
const app = express()
app.use(express.json())
app.use(UserRouter)
app.use(ProductRouter)
connection_db

app.listen(4000,()=>{
    console.log('server is running')
})
