import Bd from "../repositories/location_repositories.js";
const bd = new Bd();

export default class locationServicios{

    parsedOffset(offset){
        return !isNaN(parseInt(offset)) ? parseInt(offset) : 0;
    }

    parsedLimit(limit){
        return !isNaN(parseInt(limit)) ? parseInt(limit) : 15; 
    }

    async getAllLocations(pageSize, requestedPage, path){
        const pageSizes = this.parsedLimit(pageSize)
        const requestedPages = this.parsedOffset(requestedPage)
        const result = await bd.Consulta1(pageSizes, requestedPages);
        const totalCount = result.length
        const parsedDB = result.map(row => {
            var locations = new Object();
            location.id = row.id
            location.name = row.name
            location.id_province = row.id_province
            location.latitude = row.latitude
            location.longitude = row.longitude
            return{
                location: locations,
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
    
    async BusquedaEvento(id, pageSize, requestedPage, path){
        const result = await bd.Consulta2(id)
        const parsedDB = result.map(row => {
            var locations = new Object();
            location.id = row.id
            location.name = row.name
            location.id_province = row.id_province
            location.latitude = row.latitude
            location.longitude = row.longitude
            return{
                location: locations,
                pagination: {
                    limit: pageSizes,
                    offset: requestedPages,
                    nextPage: ((requestedPages + 1) * pageSizes <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${pageSizes}&offset=${requestedPages + 1}` : null,
                    total: totalCount,   
                }
            }
        })
        return(parsedDB)
    }

    async BusquedaEventLocations(id, pageSize, requestedPage, path){
        const pageSizes = this.parsedLimit(pageSize)
        const requestedPages = this.parsedOffset(requestedPage)
        const result = await bd.Consulta3(id,pageSizes, requestedPages);
        const totalCount = result.length
        const parsedDB = result.map(row =>{
            var event_location = new Object()
            event_location.id = row.id
            event_location.id_location = row.id_location
            event_location.name = row.name
            event_location.full_address = row.full_address
            event_location.max_capacity = row.max_capacity
            event_location.latitude = row.latitude
            event_location.longitude = row.longitude
            event_location.id_creator_user = row.id_creator_user
            return{
                event_location: event_location,
                pagination: {
                    limit: pageSizes,
                    offset: requestedPages,
                    nextPage: ((requestedPages + 1) * pageSizes <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${pageSizes}&offset=${requestedPages + 1}` : null,
                    total: totalCount,   
                }
            }
        })
        return (parsedDB)
    }

}