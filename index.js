const express=require('express')
const app=express()
const port=8080
const routes_products=require('./routes/products.js')
app.use(express.json())
app.use('/products',routes_products)

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})