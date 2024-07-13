import pg from 'pg';
import { bdconfig } from './BD_Config.js';
import { query } from 'express';


export default class Bd{
    
    constructor(){
        const {Client} = pg;
        this.client = new Client(bdconfig);
        this.client.connect();
    }

    async consulta1(limit, offset, id){
        const bd = `SELECT * FROM event_locations limit '${limit}' offset '${offset}'`
        const respuesta = await this.client.query(bd);
        return respuesta.rows
    }
    
    async consulta2(id, limit, offset){
        const bd = `SELECT * FROM event_locations WHERE id_location = '${id}' limit '${limit}' offset '${offset}'`
        const respuesta = await this.client.query(bd)
        return respuesta.rows
    }

    async consulta3(name, full_address, max_capacity, latitude, longitude, id_creator_user){
        const num1 = await this.cantEventos()
        let id_location = parseInt(num1[0].count)
        console.log(id_creator_user)
        const bd = `INSERT INTO event_locations (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) values ('${id_location+1}', '${name}', '${full_address}', '${max_capacity}', '${latitude}', '${longitude}', '${id_creator_user}')`
        const rta = await this.client.query(bd)
        return rta
    }

    async consulta4(id,name, full_address, max_capacity, latitude, longitude){
        const bd = `UPDATE event_locations SET name = '${name}', full_address = '${full_address}', max_capacity = '${max_capacity}', latitude = '${latitude}', longitude = '${longitude}' WHERE id = '${id}'`
        const rta = await this.client.query(bd)
        return rta
    }
        // Hacer
    
    async consulta5(id){ 
        const bd = `DELETE FROM events WHERE id_event_location =  '${id}';
        DELETE FROM event_locations WHERE id =  '${id}'`
        const rta = await this.client.query(bd)
        return rta
    }
        
    async consulta6(id){
        const bd = `SELECT * FROM event_locations WHERE id = '${id}'`
        const respuesta = await this.client.query(bd)
        return respuesta.rows
    }

    async cantEventos(){
        const sql = `SELECT COUNT(*) FROM event_locations`
        try{
            const num = await this.client.query(sql)
            return num.rows
        } catch(error){
            console.error("Error contando usuarios")
            return("Error contando usuarios")
        }
    }
    async idCreatorUser(){
        const sql = `select id_creator_user from event_locations `
        try{
            const num = await this.client.query(sql)
            return num.rows
        } catch(error){
            console.error("Error contando usuarios")
            return("Error contando usuarios")
        }
    }
}