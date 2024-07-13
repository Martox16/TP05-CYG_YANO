import express, { request, response } from "express"
import categoryServicios from "../servicios/categoria.js";    
const router = express.Router()
const categoryServices = new categoryServicios();


router.get("/",  async (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;
    const url = request.originalUrl;
    try {
        const category = await categoryServices.GetAllCategoryes(limit, offset, url);
        response.statusCode = 200
        return response.json(category);
    } catch(error){
        console.log("Error ejercicio 12 controller")
        return response.json(error)
    }
})

router.get("/:id", async (request, response) =>{
    const limit = request.query.limit;
    const offset = request.query.offset;
    const url = request.originalUrl;
    try { 
        const category = await categoryServices.ConsultCategory(request.params.id,limit, offset, url);
        console.log(category.length)
        if(category.length == 0) {
            response.statusCode = 404;
            return response.json("category no encontrada")
        }else{
            response.statusCode = 200;
            return response.json(category)
        }
    } catch(error){
        console.log("Error ejercicio 12 id controller")
        return response.json("No se encontro categoria")
    }
})

router.post("/", async (request, response) =>{
    const name = request.body.name
    const display_order = request.body.display_order
    try{
        const err = categoryServices.cheq(name, display_order)
        if(err == 400){
            response.statusCode = 400
            return response.json("name invalido vacio o menor de 3 caracteres")
        }
        const msg = await categoryServices.postCategory(name,display_order)
        response.statusCode = 201
        return response.json(msg)
    }catch(error){
        console.log(error)
        return response.json("Error post categoria")
    }
})

router.put("/", async (request, response) => {
    const id = request.body.id
    const name = request.body.name
    const display_order = request.body.display_order
    try{
        const err = categoryServices.cheq(name, display_order)
        if(err == 400){
            response.statusCode = err
            return response.json("name invalido vacio o menor de 3 caracteres")
        }else if(err == 404){
            response.statusCode = err
            return response.json("Categoria no encontrada")
        }
        const msg = await categoryServices.putCategory(id,name,display_order)
        response.statusCode = 200
        return response.json(msg)
    }catch(error){
        console.log(error)
        return response.json("Error put ej 12")
    }
})

router.delete("/:id", async (request, response) => {
    try{
        const err = await categoryServices.cheq("aaaa", request.params.id)
        if(err == 404){
            response.statusCode = err
            return response.json("Categoria no encontrada")
        }
        const msg = await categoryServices.deleteCategory(request.params.id)
        response.statusCode = 200
        return response.json(msg)
    }catch(error){
        console.log(error)
        return response.json("Error delete category")
    }
})

export default router