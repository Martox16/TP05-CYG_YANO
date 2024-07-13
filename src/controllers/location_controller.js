import express, { request, response } from "express"
import locationServicios from "../servicios/location.js";    
const router = express.Router()
const locationServices = new locationServicios();
import AuthMiddleware from "../auth/AuthMiddleware.js"


router.get("/",  async (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;
    const url = request.originalUrl;
    try {
        const locations = await locationServices.BusquedaLocations(limit, offset, url);
        response.statusCode = 200
        return response.json(locations);
    } catch(error){
        console.log(error)
        return response.json(error)
    }
})


router.get("/:id", async (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;
    const url = request.originalUrl;
    try { 
        const location = await locationServices.ConsultaEvento(request.params.id,limit, offset, url);
        if(evento.length == 0) {
            response.statusCode = 404;
            return response.json("Location no encontrada")
        }else{
            response.statusCode = 200;
            return response.json(location)
        }
    } catch(error){
        console.log("Error ejercicio 11 id controller")
        return response.json("No se encontro localizacion")
    }
})

router.get("/:id/event_location", AuthMiddleware, async (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;
    const url = request.originalUrl;
    try{
        const event_location = await locationServices.ConsultaEvento(request.params.id, limit, offset, url);
        if(event_location.length == 0) {
            response.statusCode = 404;
            return response.json("Location no encontrada")
        }else{
            response.statusCode = 200;
            return response.json(event_location)
        }
    }catch(error){
        console.log("Error ejercicio 11 id event location controller")
        return response.json("No se encontro localizacion")
    }
})

export default router