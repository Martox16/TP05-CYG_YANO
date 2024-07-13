import express, { response } from "express"
import ProvinciasServicios from "../servicios/provincias.js";
import req from "express/lib/request.js";
const router = express.Router()
const serviceProv = new ProvinciasServicios();

router.get("/", async (request, response) =>{
    const limit = request.query.limit;
    const offset = request.query.offset;
    const url = request.originalUrl
    try{
        const todoProvincias = await serviceProv.ObtencionProvincias(limit, offset, url)
        if(todoProvincias){
            response.statusCode = 200
            return response.json(todoProvincias);
        }
    }catch(error){
        console.log("Error obtencion provincias")
        return response.json("Error obtenicon de las provincias 7")
    }
})
    


router.get("/:id", async (request, response) => {
    const id = request.params.id
    try{
        const provinciaId = await serviceProv.ObtencionProvinciasID(id)
        if(provinciaId == false){
            response.statusCode = 404
            return response.json("Provincia inexistente id no valido")
        }
            response.statusCode = 200
            return response.json(provinciaId);
        }catch(error){
            console.log("Error obtencion provincias id")
            return response.json("Error en la obtencion de la provincia con id")
    }
})


router.get("/:id/locations", async (request, response) => {
    const id = request.params.id
    const limit = request.query.limit
    const offset = request.query.offset
    const path = request.originalUrl
    try{
        const locationsid = await serviceProv.busqLocations(id, limit, offset, path)
        if(locationsid == false){
            response.statusCode = 404
            return response.json("Localizaciones no encontradas por provincia invalida")
        }else{
            response.statusCode = 200
            return response.json(locationsid)
        }
    }catch(error){
        console.log("Error obtencion localizaciones id")
        return response.json("Error obtencion localizaciones id")
    }   
})


router.post("/", async (request, response) => {
    const name = request.body.name;
    const full_name = request.body.full_name;
    const latitude = request.body.latitude;
    const longitude = request.body.longitude;
    const display_order = request.body.display_order;
    const cheq = await serviceProv.cheqProv(name, longitude, latitude)
    if(cheq != true){
        response.statusCode = 400
        return response.json(cheq)
    }
    try{
        const confirmacion = await serviceProv.CrearEjercicio7Provincias(name, full_name, latitude, longitude, display_order)
        response.statusCode = 201
        return response.json(confirmacion)
    }catch(error){
        console.log("Error en creacion de provincias")
        return response.json("Error en creacion de provincia")
    }
})

router.put("/", async (request, response) => {
    const { id,name, full_name, latitude, longitude, display_order } = request.body;
    const cheq = await serviceProv.cheqProv(name, longitude, latitude) 
    if(cheq == true){
        try {
            const confirmacion = await serviceProv.EditarProvincia(id, name, full_name, latitude, longitude, display_order);
            if(confirmacion == 404){
                response.statusCode = confirmacion
                return response.json("Provincia inexistente")
            }
            response.statusCode = 200
            return response.json(confirmacion);
        } catch(error) {
            console.error("Error en actualización:", error);
            return response.status(500).json({ error: "Error en la actualización de la provincia" });
        }
    }else{
        response.statusCode = 400
        return response.json(cheq)
    }
});


router.delete("/:id", async (request, respose) => {
    try{
        const confirmacion = await serviceProv.EliminarProvincia(request.params.id)
        if(confirmacion == 404){
            response.statusCode = confirmacion
            return response.json("Provincia inexistente")
        }
        response.statusCode = 200
        return respose.json(confirmacion)
    }catch(error){
        console.log("Error en la eliminacion de provincia")
        return respose.json("Error en la eliminacion de provincia")
    }
}) 

export default router