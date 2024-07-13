import pg from 'pg';
import { bdconfig } from './BD_Config.js';
   

export default class Bd{

    constructor(){
        this.client = new pg.Client(bdconfig);
        this.client.connect();
    }

    async Consulta1(limited, offseted) {
        const sql = `SELECT * from provinces limit '${limited}' offset '${offseted}'`
        const respuesta = await this.client.query(sql);
        return respuesta.rows
    }
    
    async Consulta2(id){
        const sql = `SELECT * FROM provinces WHERE id = '${id}'`
        const respuesta = await this.client.query(sql);
        return respuesta.rows
    } 
    
    async locationsXid(id, limit, offset){
        const sql = `SELECT * FROM locations WHERE id_province = '${id}' limit '${limit}' offset '${offset}'`
        const rta = await this.client.query(sql)
        return rta.rows
    }

    async Consulta3(name, full_name, latitude, longitude, display_order){
        const sql = `INSERT INTO provinces (name, full_name, latitude, longitude, display_order) 
        values ('${name}', '${full_name}', '${latitude}', '${longitude}', '${display_order}')`
        const respuesta = await this.client.query(sql);
        return respuesta
    }

    async Consulta4(id, name, full_name, latitude, longitude, display_order){
        const sql = `UPDATE provinces SET name = '${name}', full_name = '${full_name}', latitude = '${latitude}', longitude = '${longitude}', display_order = '${display_order}' 
        WHERE id = '${id}'`
        const respuesta = await this.client.query(sql);
        return respuesta
    }
    
    async Consulta5(id){
        const sql2 = `SELECT * FROM locations WHERE id_province = '${id}'`
        const cheq = await this.client.query(sql2)
        const chqq = cheq.rows
        const sql = `${chqq.lenght > 0 ? '': `DELETE FROM locations WHERE id_province = ${id} ;`} DELETE FROM provinces WHERE id = ${id}`
        console.log(sql)
        const respuesta = await this.client.query(sql);
        return respuesta
    }

}