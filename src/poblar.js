import mongoose from "mongoose";
import productModel from "./models/product.model.js";

const uri = 'mongodb+srv://yesicachuic:yesica@backendbasico.s7qaobr.mongodb.net/'

const main = async ()=>{
  await mongoose.connect(uri,{
    dbName:'ecommerce'
  })

  const result = await productModel.insertMany(
    [
      {
        "title": "camisa roja",
        "description": "marca joh holden",
        "price": 250,
        "thumbnail": "ruta en firebase",
        "code": "CA-01",
        "stock": 5,
        "category":"camiseria"
      },
      {
        "title": "blusa",
        "description": "blusa roja Zara",
        "price": 180,
        "thumbnail": "ruta en firebase de blusa",
        "code": "BLU-01",
        "stock": 5,
        "category":"camiseria"
      },
      {
        "title": "zapato",
        "description": "zapato adidas",
        "price": 200,
        "thumbnail": "ruta en firebase2",
        "code": "ZA-01",
        "stock": 3,
        "category":"calzado"
      },
      {
        "title": "botas",
        "description": "botas rickborn",
        "price": 150,
        "thumbnail": "ruta en firebase de botas",
        "code": "BO-01",
        "stock": 5,
        "category":"calzado"
      },
      {
        "title": "Polo",
        "description": "Polo rojo",
        "price": 100,
        "thumbnail": "ruta en firebase de Polo",
        "code": "PO-01",
        "stock": 5,
        "category":"camiseria"
      },
      {
        "title": "Zapatilla",
        "description": "Zapatillas Estela",
        "price": 120,
        "thumbnail": "ruta en firebase",
        "code": "ZA-02",
        "stock": 5,
        "category":"calzado"
      },
      {
        "title": "Medias",
        "description": "medias rojas",
        "price": 10,
        "thumbnail": "ruta en firebase",
        "code": "ME-01",
        "stock": 5,
        "category":"calzado"
      },
      {
        "title": "blusa",
        "description": "blusa verde Karen",
        "price": 130,
        "thumbnail": "ruta en firebase",
        "code": "BLU-02",
        "stock": 5,
        "category":"camiseria"
      },
      {
        "title": "Gorro",
        "description": "Gorro Verde",
        "price": 40,
        "thumbnail": "ruta en firebase",
        "code": "GO-01",
        "stock": 5,
        "category":"accesorios"
      },
      {
        "title": "Sombreros",
        "description": "Sombrero grande clasico",
        "price": 200,
        "thumbnail": "ruta en firebase",
        "code": "SO-01",
        "stock": 5,
        "category":"accesorios"
      }
    ]
  )
}

main()