import Bd from "../repositories/category_respositories.js";
const bd = new Bd();

export default class locationServicios{

    parsedOffset(offset){
        return !isNaN(parseInt(offset)) ? parseInt(offset) : 0;
    }

    parsedLimit(limit){
        return !isNaN(parseInt(limit)) ? parseInt(limit) : 15; 
    }

    async cheq(name, id){
        const limit = this.parsedLimit(0)
        const offset = this.parsedOffset(0)
        if(name.lenght < 3 || name == null){
            return 400
        }else if(id != null){
            const category = await bd.consulta2(id,limit, offset)
            if(category == null){
                return 404
            }
        }else{
            return "salchipapa"
        }
    }

    async GetAllCategoryes(limit, offset, path){
        const limited = this.parsedLimit(limit)
        const offseted = this.parsedOffset(offset)
        const result = await bd.consulta1(limited, offseted);
        const totalCount = result.length
        const parsedDB = result.map(row => {
            var event_categories = new Object()
            event_categories.id = row.id
            event_categories.name = row.name
            event_categories.display_order = row.display_order
            return{
                event_categories: event_categories,
                pagination: {
                    limit: limited,
                    offset: offseted,
                    nextPage: ((offseted + 1) * limited <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${limited}&offset=${offseted + 1}` : null,
                    total: totalCount,
                },
            }
        })
        return parsedDB
    }

    async ConsultCategory(id,limit, offset, path){
        const limited = this.parsedLimit(limit)
        const offseted = this.parsedOffset(offset)
        const result = await bd.consulta2(id, limited, offseted)
        const totalCount = result.lenght
        const parsedDB = result.map(row => {
            var event_categories = new Object()
            event_categories.id = row.id
            event_categories.name = row.name
            event_categories.display_order = row.display_order
            return{
                event_categories: event_categories,
                pagination: {
                    limit: limited,
                    offset: offseted,
                    nextPage: ((offseted + 1) * limited <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${limited}&offset=${offseted + 1}` : null,
                    total: totalCount
                }
            }
        })
        return parsedDB
    }

    async postCategory(name, display_order){
        const result = await bd.consulta3(name, display_order)
        return ("Insetado efectivamente")
    }

    async putCategory(id,name, display_order){
        const result = await bd.consulta4(id, name, display_order)
        return ("Actualizado efectivamente")
    }

    async deleteCategory(id){
        const result = await bd.consulta5(id)
        return ("Borrado efectivamente")
    }

}