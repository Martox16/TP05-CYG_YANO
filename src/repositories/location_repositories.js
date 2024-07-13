import pg from 'pg';
import { bdconfig } from './BD_Config.js';


export default class Bd{
    
    constructor(){
        const {Client} = pg;
        this.client = new Client(bdconfig);
        this.client.connect();
    }
    
    async Consulta1(limit, offset){
        const sql = `SELECT * FROM locations limit '${limit}' offset '${offset}'`
        const respuesta = await this.client.query(sql);
        return respuesta.rows
    }

    async Consulta2(id,limit, offset){
        const sql = `SELECT * FROM locations WHERE id = '${id}' limit '${limit}' offset '${offset}'`
        const respuesta = await this.client.query(sql)
        return respuesta.rows
    }

    async Consulta3(id, limit, offset){
        const sql = `SELECT * FROM event_locations WHERE id_location = '${id}' limit '${limit}' offset '${offset}'`
        const respuesta = await this.client.query(sql)
        return respuesta.rows
    }

}
