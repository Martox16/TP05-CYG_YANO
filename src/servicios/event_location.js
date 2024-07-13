import Bd from "../repositories/event_location.js";
const bd = new Bd();

export default class locationServicios{

    parsedOffset(offset){
        return !isNaN(parseInt(offset)) ? parseInt(offset) : 0;
    }

    parsedLimit(limit){
        return !isNaN(parseInt(limit)) ? parseInt(limit) : 15; 
    }

    async cheq(id_location, name, full_address, max_capacity){
        const limit = this.parsedLimit(0)
        const offset = this.parsedOffset(0)
        if(name.lenght < 3 || name == null){
            return 400
        }else if(full_address < 3 || full_address == null){
            return 400
        }else if (id_location != null){
            const event = await bd.consulta2(id_location, limit, offset)
            if(event == null){
                return 404
            }
        }else if (max_capacity <= 0){
            return "400"
        }else{
            return "salcipapa"
        }
    }

    async getAllEventLocation(limit, offset, path){
        const limited = this.parsedLimit(limit)
        const offseted = this.parsedOffset(offset)
        const result = await bd.consulta1(limited, offseted);
        const totalCount = result.length
        const parsedDB = result.map(row => {
            var event_locations = new Object()
            event_locations.id = row.id
            event_locations.id_location = row.id_location
            event_locations.name = row.name
            event_locations.full_address = row.full_address
            event_locations.max_capacity = row.max_capacity
            event_locations.latitude = row.latitude
            event_locations.longitude = row.longitude
            return{
                event_locations: event_locations,
                pagination: {
                    limit: limited,
                    offset: offseted,
                    nextPage: ((offseted + 1) * limited <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${limited}&offset=${offseted + 1}` : null,
                    total: totalCount
                },
            }
        })
        return parsedDB
    }

    async ConsultEventoLocation(id,limit, offset, path){
        const limited = this.parsedLimit(limit)
        const offseted = this.parsedOffset(offset)
        const result = await bd.consulta2(id, limited, offseted)
        const totalCount = result.lenght
        const parsedDB = result.map(row => {
            var event_locations = new Object()
            event_locations.id = row.id
            event_locations.id_location = row.id_location
            event_locations.name = row.name
            event_locations.full_address = row.full_address
            event_locations.max_capacity = row.max_capacity
            event_locations.latitude = row.latitude
            event_locations.longitude = row.longitude
            return{
                event_locations: event_locations,
                pagination: {
                    limit: limited,
                    offset: offseted,
                    nextPage: ((offseted + 1) * limited <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${limited}&offset=${offseted + 1}` : null,
                    total: totalCount
                },
            }
        })
        return parsedDB
    }

    async postEvento(name, full_address, max_capacity, latitude, longitude, id_creator_user){
        const result = await bd.consulta3(name, full_address, max_capacity, latitude, longitude, id_creator_user)
        return ("Insetado efectivamente")
    }

    async putEvento(id,name, full_address, max_capacity, latitude, longitude){
        const result = await bd.consulta4(id,name, full_address, max_capacity, latitude, longitude)
        return ("Actualizado efectivamente")
    }

    async deleteEvento(id){
        const event = await bd.consulta6(id)
        if (event[0] != null){
            const result = await bd.consulta5(id)
            return ("Borrado efectivamente")
        }else{
            return 404
        }
    }
}