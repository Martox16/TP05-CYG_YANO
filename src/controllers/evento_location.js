import express, { request, response } from "express"
import eventService from "../servicios/event_location.js";    
const router = express.Router()
const eventLocationsService = new eventService();
import AuthMiddleware from "../auth/AuthMiddleware.js"; 

router.get("/", AuthMiddleware ,async (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;
    const url = request.originalUrl;
    try {
        const event = await eventLocationsService.getAllEventLocation(limit, offset, url);
        response.statusCode = 200
        return response.json(event);
    } catch(error){
        console.log("Error ejercicio 13 controller")
        return response.json(error)
    }
})

router.get("/:id", AuthMiddleware ,async (request, response) =>{
    const limit = request.query.limit;
    const offset = request.query.offset;
    const url = request.originalUrl;
    try { 
        const event = await eventLocationsService.ConsultEventoLocation(request.params.id,limit, offset, url);
        console.log(event.length)
        if(event.length == 0) {
            response.statusCode = 404;
            return response.json("Evento no encontrado")
        }else{
            response.statusCode = 200;
            return response.json(event)
        }
    } catch(error){
        console.log("Error ejercicio 13 id controller")
        return response.json("No se encontro el evento")
    }
})

router.post("/", AuthMiddleware, async (request, response) =>{
    const name = request.body.name
    const full_address = request.body.full_address
    const max_capacity = request.body.max_capacity
    const latitude = request.body.latitude
    const longitude = request.body.longitude
    const id_creator_user = request.user.id
    try{
        const err = eventLocationsService.cheq(id_creator_user, name, full_address, max_capacity)
        if(err == 400){
            response.statusCode = 400
            return response.json("name invalido vacio o menor de 3 caracteres")
        }
        const msg = await eventLocationsService.postEvento(name, full_address, max_capacity, latitude, longitude, id_creator_user)
        response.statusCode = 201
        return response.json(msg)
    }catch(error){
        console.log(error)
        return response.json("Error post evento")
    }
})

router.put("/", AuthMiddleware ,async (request, response) => {
    const id = request.body.id
    const name = request.body.name
    const full_address = request.body.full_address
    const max_capacity = request.body.max_capacity
    const latitude = request.body.latitude
    const longitude = request.body.longitude
    try{
        const err = eventLocationsService.cheq(id, name, full_address, max_capacity)
        if(err == 400){
            response.statusCode = err
            return response.json("name invalido vacio o menor de 3 caracteres")
        }else if(err == 404){
            response.statusCode = err
            return response.json("Evento no encontrada")
        }
        const msg = await eventLocationsService.putEvento(id,name, full_address, max_capacity, latitude, longitude)
        response.statusCode = 200
        return response.json(msg)
    }catch(error){
        console.log(error)
        return response.json("Error put ej 13")
    }
})

router.delete("/:id", AuthMiddleware ,async (request, response) => {
    try{
        const id = request.params.id  
        const msg = await eventLocationsService.deleteEvento(id)
        if(msg == 404){
            response.statusCode = msg
            return response.json("Event Location no encontrada")
        }
        return response.json(msg)
    }catch(error){
        console.log(error)
        return response.json("Error delete evento")
    }
})

export default router