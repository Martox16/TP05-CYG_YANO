import Bd from "../repositories/events_repositories.js";
const bd = new Bd();

export default class EventosServicios{

    parsedOffset(offset){
        return !isNaN(parseInt(offset)) ? parseInt(offset) : 0;
    }

    parsedLimit(limit){
        return !isNaN(parseInt(limit)) ? parseInt(limit) : 15; 
    }

    async getAllEvent(pageSize, requestedPage, path){
        const pageSizes = this.parsedLimit(pageSize)
        const requestedPages = this.parsedOffset(requestedPage)
        const result = await bd.Consulta1(pageSizes, requestedPages);
        const totalCount = result.length
        const parsedDB = result.map(row => {
            var event = new Object();
            var creator_user = new Object();
            var event_categories  = new Object();
            var event_location = new Object();
            event.id = row.id
            event.name = row.name
            event.description = row.description
            event.start_date = row.start_date
            event.duration_in_minutes = row.duration_in_minutes
            event.price = row.price
            event.enabled_for_enrollment = row.enabled_for_enrollment
            event.max_assistance = row.max_assistance
            creator_user.id = row.user_id
            creator_user.username = row.username
            creator_user.first_name = row.first_name
            creator_user.last_name = row.last_name
            event_categories.id = row.eventcat_id
            event_categories.name = row.eventcat_name
            event_location = row.event_location
            event_location.location = row.location
            event_location.location.province = row.province
            return{
                event: event,
                creator_user: creator_user,
                event_categories: event_categories,
                event_location: event_location,
                tags: row.tags,
                pagination: {
                    limit: pageSizes,
                    offset: requestedPages,
                    nextPage: ((requestedPages + 1) * pageSizes <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${pageSizes}&offset=${requestedPages + 1}` : null,
                    total: totalCount,   
                }
            }
        })
        return (parsedDB);
    }
         
    
 
    async BusquedaEvento(name, category, startDate, tag, path){
        const result = await bd.Consulta2(name, category, startDate, tag)
        const totalCount = result.length
        const parsedDB = result.map(row => {
            var event = new Object();
            var creator_user = new Object();
            var event_categories  = new Object();
            var event_location = new Object();
            event.id = row.id
            event.name = row.name
            event.description = row.description
            event.start_date = row.start_date
            event.duration_in_minutes = row.duration_in_minutes
            event.price = row.price
            event.enabled_for_enrollment = row.enabled_for_enrollment
            event.max_assistance = row.max_assistance
            creator_user.id = row.user_id
            creator_user.username = row.username
            creator_user.first_name = row.first_name
            creator_user.last_name = row.last_name
            event_categories.id = row.eventcat_id
            event_categories.name = row.eventcat_name
            event_location = row.event_location
            event_location.location = row.location
            event_location.location.province = row.province
            return{
                event: event,
                creator_user: creator_user,
                event_categories: event_categories,
                event_location: event_location,
                tags: row.tags,
                pagination:{
                    nextPage: `${process.env.BASE_URL}/${path}${(event.name) ? `&eventname=${event.name}` : null}${(event_categories.id) ? `&eventCategory=${event_categories.id}` : null} ${(event.startdate) ? `&eventDate=${event.startdate}` : null}`
                },
                total: totalCount
            }
        })
        return(parsedDB)
    }

    async ConsultaEvento(id){
        const result = await bd.Consulta3(id)
        const parsedDB = result.map(row => {
            var event = new Object();
            var creator_user = new Object();
            var event_categories  = new Object();
            var event_location = new Object();
            event.id = row.id
            event.name = row.name
            event.description = row.description
            event.start_date = row.start_date
            event.duration_in_minutes = row.duration_in_minutes
            event.price = row.price
            event.enabled_for_enrollment = row.enabled_for_enrollment
            event.max_assistance = row.max_assistance
            creator_user.id = row.user_id
            creator_user.username = row.username
            creator_user.first_name = row.first_name
            creator_user.last_name = row.last_name
            event_categories.id = row.eventcat_id
            event_categories.name = row.eventcat_name
            event_location = row.event_location
            event_location.location = row.location
            event_location.location.province = row.province
            return{
                event: event,
                creator_user: creator_user,
                event_categories: event_categories,
                event_location: event_location,
                tags: row.tags,
            }
        })
        return(parsedDB)
    }

    async ListadoParticiPantes(id, first_name, last_name, username, attended, rating){
        const result = await bd.Consulta4(id, first_name, last_name, username, attended, rating)
        console.log(result)
        const parsedDB = result.map(row => {
            var us = new Object();
            var enrols = new Object();
            us.id = row.user_id
            us.first_name = row.first_name
            us.last_name = row.last_name
            us.username = row.username
            enrols.id = row.id
            enrols.id_event = row.id_event
            enrols.id_user = row.id_user
            return{
                'id': row.id,
                'id_event': row.id_event,
                'id_user': row.id_user,
                user: us,
                'description' : row.description,
                'registration_date_time' : row.registration_date_time,
                'attended' : row.attended,
                'observations' : row.observations,
                'rating': row.rating,
            }
        }) 
        console.log(parsedDB)
        return parsedDB
    }

    async CrearEjercicio8Eventos(evento){
        try{
            bd.Consulta5(evento)
            return("Evento creado efectivamente")
        } catch(error){
            console.log("Error creacion de evento");
            return response.json("Error creacion de evento");
        }
    }
    
    async EditarEjercicio8Eventos(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        try{
            bd.Consulta6(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
            return("Evento editado efectivamente")
        } catch(error){
            console.log("Error edicion de evento");
            return response.json("Error edicion de evento");
        }
    }

    async EliminarEjercicio8Eventos(id, id_creator_user){
        try{
            bd.Consulta7(id, id_creator_user)
            return("Evento borrado efectivamente")
        } catch(error){
            console.log("Error borrado de evento");
            return response.json("Error borrado de evento");
        }
    }

    async ComprobarCapacity(id_event_location){
        try{
            const max_capacity = bd.ConsultaCapacity(id_event_location)
            return max_capacity
        }catch{
            console.log("Error service capacity")
            return response.json("Error servicio capacity")
        }
    }

    async ChequeosServicios(evento){ 
        if(evento[0]== null || evento[0].length < 3){
            return ("name invalido")
        }
        if(evento[1] == null || evento[1].length < 3){
            return ("Descripcion invalida")
        }
        const max_capacity = await this.ComprobarCapacity(evento[3])
        if(Number(evento[8]) > max_capacity[0].max_capacity){
            return ("Capacidad Maxima invalida")
        }
        if(evento[6] < 0){
            return("Precio invalido menor que 0")
        }
        if(evento[5] < 0){
            return("Duracion invalida menor que 0")
        }
        return ("")
    }

    async ChequeosEvento(id){
        const event = await bd.Consulta3(id)
        if(event.length == 0){
            return("Evento inexistente")
        }
        return("")
    }

    async ChequeosEnrollment(id){
        const enrollment = await bd.Enrollments(id)
        if(enrollment[0].count > 0){
            return("No se puede borrar existen inscriptos")
        }
        return("")
    }

    async RatiarEvento(id_evento, rating, observations, id_user){
        await bd.Ratiar(id_evento, rating, observations, id_user)
        return
    }

    async VerificarEnrollment(id_evento, rating, id_user){
        const userTa = await bd.BusqUser(id_user)
        if(userTa == null){
            return("No esta inscripto el usuario")
        }
        const event = await bd.Consulta3(id_evento)
        if(event == null){
            return false
        }
        const start_date = event[0].start_date
        const hoy = new Date()
        if(start_date > hoy){
            return("Error el eventon no a finalizado")
        }

        if(rating < 1 && rating > 10){
            return("Error rating ingresado invalido se debe encontrar entre 1 y 10")
        }
        return true
    }
    
    async InscripcionEvento(id_creator_user, event_id) {
        try{
           const capacidadMax = bd.ConsultaCapacity(event_id)
           const capacidadActual = bd.consultaCapacidadActual(event_id)
           if (capacidadActual < capacidadMax){
            console.log(error)
           }
        }catch(error){

        }
    }

    async DeleteEvent(id) {
        await repo.DeleteEvent(id);
        return "Eliminado con éxito";
    } 
}  

  