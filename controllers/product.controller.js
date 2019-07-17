const http = require('http');
const path = require('path');
const status = require('http-status');
const _config = require('../_config');

let _product;


const createProduct = (req, res) => {
    const product = req.body;

    _product.create(product)
        .then((data)=> {
            res.status(200);
            res.json({msg:"Producto creado correctamente", data: data});
        })
        .catch((err)=> {
            res.status(400);
            res.json({msg:"Error!!!!", data:err});
        })
}

const findAll = (req, res) => { 
  _product.find()
    .then((data)=>{
        if(data.length == 0){
            res.status(status.NO_CONTENT);
            res.json({msg:"No se encontaron productos"});
        }else{
            res.status(status.OK);
            res.json({msg:"Exito!!!",data:data});
        }

    })
    .catch((err)=>{
        res.status(status.BAD_REQUEST);
        res.json({msg: "Error!"});
    })
}

const deleteByID = (req, res) =>{
    const {id}  = req.params;
    
    const params = {
        _id: id
    };

    _product.findByIdAndRemove(params)
    .then((data)=>{
            res.status(status.OK);
            res.json({msg:"Exito!!!",data:data});
    })
    .catch((err)=>{
        res.status(status.NOT_FOUND);
        res.json({msg: "Error!!! No se encontro", err:err});
    })
}

const updateProduct = (req, res) =>{
    const {id}  = req.params;
    const params = {
        _id: id
    };
    
    let update = req.body;
    
    _product.findOneAndUpdate(params,update)
    .then((data)=>{
            res.status(status.OK);
            res.json({msg:"Exito, producto actualizado correctamente!!!",data:data});
    })
    .catch((err)=>{
        res.status(status.NOT_FOUND);
        res.json({msg: "Error!!! No se encontro usuario", err:err});
    })
}


const findOne = (req, res) =>{
    const {id}  = req.params;
    const params = {
        _id: id
    };
    
    _product.findOne(params)
    .then((data)=>{
            res.status(status.OK);
            res.json({msg:"Producto encontrada!!!",data:data});
    })
    .catch((err)=>{
        res.status(status.NOT_FOUND);
        res.json({msg: "Error!!! No se encontro", err:err});
    })
}

module.exports = (Product) => {
  _product = Product;
    return({
        createProduct,findAll,deleteByID, updateProduct, findOne
    });
}