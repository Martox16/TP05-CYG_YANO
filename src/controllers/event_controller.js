import express, { request, response } from "express"
import EventosServicios from "../servicios/eventos.js";    
const router = express.Router()
const eventService = new EventosServicios();
import AuthMiddleware from "../auth/AuthMiddleware.js"

//router.get("/", middleware, (request, response) => {

router.get("/",  async (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;
    const name = request.query.name;
    const category = request.query.category;
    const startDate = request.query.startDate;
    const tag = request.query.tag;
    const url = request.originalUrl;
    if(name != null || category != null || startDate != null || tag != null){
        try {
            const BusquedaEvent = await eventService.BusquedaEvento(name, category, startDate, tag);
            return response.json(BusquedaEvent);
        } catch(error){
            console.log(error)
            return response.json(error)
        }
    }else{
        try {
            const todoseventos = await eventService.getAllEvent(limit, offset, url);
            return response.json(todoseventos);
        }catch(error){
            console.log("Error ej2 controller");
            return response.json("Error ej2 controller");
        }
    }
    
})


router.get("/:id", async (request, response) => {
    try { 
        const evento = await eventService.ConsultaEvento(request.params.id);
        if(evento.length == 0) {
            response.statusCode = 404;
            return response.json("Evento no encontrado")
        }else{
            response.statusCode = 200;
        }
        return response.json(evento)
    } catch(error){
        console.log("Error ejercicio 4 controller")
        return response.json("No se encontro evento")
    }
})

router.get("/:id/enrollment", async(request, respose) => {
    const first_name = request.query.first_name
    const last_name = request.query.last_name
    const usernames = request.query.username
    const attended = request.query.attended
    const rating = request.query.rating
        try{
            const usuario = await eventService.ListadoParticiPantes(request.params.id, first_name, last_name, usernames, attended, rating)
            if(usuario){
                return respose.json(usuario)
            } else{
                console.log("Error ejercicio 5 controller")
                return respose.json("No se encontro al usuario")
            }
        }catch(error){
            console.log("Error ej 5 catch")
            return respose.json("Error ej 5 catch")
        }

})

router.post("/", AuthMiddleware, async(request, response) => {
    const name = request.body.name
    const description = request.body.description
    const id_event_category = request.body.id_event_category
    const id_event_location = request.body.id_event_location
    const start_date = request.body.start_date
    const duration_in_minutes = request.body.duration_in_minutes
    const price = request.body.price
    const enabled_for_enrollment = request.body.enabled_for_enrollment
    const max_assistance = request.body.max_assistance
    const id_creator_user = request.user.id
    const evento = [name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user]
    try{
        const msg = await eventService.ChequeosServicios(evento)
        if(msg.length > 0){
            response.statusCode = 400
            return response.json(msg)
        }
        const confirmacion = await eventService.CrearEjercicio8Eventos(evento)
        if(confirmacion){
            return response.json(confirmacion)
        } else{
            console.log("Error en creacion de eventos controller")
            return response.json("Error en la creacion")
        }
    }catch(error){
        response.statusCode = 400
        console.log("Error post envento catch")
        return response.json("Error creacion evento faltan parametros para busqueda")
    }
})

router.put("/", AuthMiddleware,async (request, response) => {
    const name = request.body.name
    const description = request.body.description
    const id_event_category = request.body.id_event_category
    const id_event_location = request.body.id_event_location
    const start_date = request.body.start_date
    const duration_in_minutes = request.body.duration_in_minutes
    const price = request.body.price
    const enabled_for_enrollment = request.body.enabled_for_enrollment
    const max_assistance = request.body.max_assistance
    const id_creator_user = request.user.id
    const id = request.body.id
    const evento = [name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user, id];
    try{
        const msg = await eventService.ChequeosServicios(evento)
        if(msg.length > 0){
            response.statusCode = 400
            return response.json(msg)
        }
        const msg2 = await eventService.ChequeosEvento(evento[10])
        if(msg2.length > 0){
            response.statusCode = 404
            return response.json(msg2)
        }
        const confirmacion = await eventService.EditarEjercicio8Eventos(evento)
        if(confirmacion){       
            response.statusCode = 201;
            return response.json(confirmacion)
        }
    } catch(error){
        console.log("Error en edicion de eventos controller")
        return response.json("Error en edicion de eventos")
    } 
})

router.delete("/:id", AuthMiddleware,async (request, response) => {
    try{
        const msg = await eventService.ChequeosEnrollment(request.params.id)
        if(msg.length > 0){
            response.statusCode = 400
            return response.json(msg)
        }
        const confirmacion = await eventService.EliminarEjercicio8Eventos(request.params.id)
        response.statusCode = 200
        return response.json(confirmacion)
    }catch(error){
        console.log("Error en el delete eventos")
        return response.json("Error en borrado de evento")
    }
})

router.patch("/:id/enrollment/:rating", AuthMiddleware, async (request, response) =>{
    const id_evento = request.params.id
    const rating = request.params.rating
    const observations = request.body.observations
    const id_user = request.user.id
    try{
        const msg = await eventService.VerificarEnrollment(id_evento, rating, id_user)
        if(msg == false){
            response.statusCode = 404
            return response.json("Evento inexistente")
        }else if(msg != true){
            response.statusCode = 400
            return response.json(msg)
        }
        eventService.RatiarEvento(id_evento, rating, observations, id_user)
        response.statusCode = 200
        return response.json("Se pudo ratiar el evento")
    }catch(error){
        console.log("Error rating evento controller")
        return response.json("No se pudo ratiar el evento")
    }
})

router.post("/:id/enrollment", AuthMiddleware, async (request, response) => {
    const id_creator_user = request.user.id
    const event_id = request.params.id
    const max_capacity = request.body.max_capacity
    const startDate = request.body.start_date
    const enabledForEnrollment = request.body.enabled_for_enrollment
    try {
        await eventEnrollmentService.registrarUsuarioEvento(id_creator_user, event_id, max_capacity,startDate, enabledForEnrollment);
        return response.status(201).json({message: "El evento se registro correctamente"});
    } catch (error) {
        return response.status(400).json({message: "Error a la hora de registrar evento"});
    }
});

router.delete("/:id/enrollment", AuthMiddleware, async (request, response) => {
    const id_creator_user = request.user.id;
    const event_id = request.params.id;
    try {
        await eventEnrollmentService.borrarRegistroUsuarioEvento(id_creator_user, event_id);
        return response.status(200).json({message: "Usuario del evento eliminado correctamente"});
    } catch (error) {
        return response.status(400).json({message: "Error al eliminar el usuario del evento"});
    }
});

export default router;