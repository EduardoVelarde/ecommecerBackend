const express= require('express')
const {Router}=express
const knex=require('../utilities/db.js')
const router=new Router()
const product=require('../utilities/template')
const retrieve_data=async()=>knex.select('*').table('productsEcommerce')

const send_data=async(product1)=>{
    let data=await knex('productsEcommerce').insert(product1)
    return data
}

router.get('/all',async(req,res)=>{
    let dataobtain= await retrieve_data()
    res.status(200).json({msg:'SUCCESS',data:dataobtain})
})
router.get('/:id',async(req,res)=>{
    let {id}=req.params
    let dataobtained=await knex('productsEcommerce').where({id:id})
    res.json({msg:'SUCCESS',data:dataobtained})
})
router.post('/add',(req,res)=>{
    let{name,price,description,code}=req.body
    product.name=name
    product.price=price
    product.description=description
    product.code=code
    let dataobtained=send_data(product);
    res.json({msg:'SUCCESS',data:dataobtained})
})
router.delete('/delete/:id',async(req,res)=>{
    let{id}=req.params
    let elementDeleted=await knex('productsEcommerce').
                                where({id:id})
                                .del()
    res.status(200).json({msg:'element has been deleted from database',data:elementDeleted})
})
module.exports=router