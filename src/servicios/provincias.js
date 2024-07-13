import Bd from "../repositories/provincias_repositories.js";
const bd = new Bd();

export default class ProvinciasServicios {
  
  parsedOffset(offset){
    return !isNaN(parseInt(offset)) ? parseInt(offset) : 0;
  }

  parsedLimit(limit){
    return !isNaN(parseInt(limit)) ? parseInt(limit) : 15; 
  }

  async ObtencionProvincias(pageSize, requestedPage, path) {
    const limited = this.parsedLimit(pageSize)
    const offseted = this.parsedOffset(requestedPage)
    const provincias = await bd.Consulta1(limited, offseted);
    const totalCount = provincias.length
    const collection = provincias.map(row => {
      return {
        id: row.id,
        name: row.name,
        full_name: row.full_name,
        latitude: row.latitude,
        longitude: row.longitude
      };
  });
  const result = {
      collection: collection,
      pagination: {
          limit: limited,
          offset: offseted,
          nextPage: ((offseted + 1) * limited <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${limited}&offset=${offseted + 1}` : null,
          totalCount: totalCount
      }
  };
  return result;
}

  async ObtencionProvinciasID(id) {
    const provincia = await bd.Consulta2(id);
    if(provincia.length <= 0){
      return false
    }
    const parseProv = provincia.map(row => {
      const prov = new Object();
      prov.id = row.id,
      prov.name = row.name,
      prov.id_province = row.id_province,
      prov.latitude = row.latitude,
      prov.longitude = row.longitude;
      return {
        province: prov,
      };
    });
    return parseProv;
  }

  async busqLocations(id, limit, offset, path){
    const limited = this.parsedLimit(limit)
    const offseted = this.parsedOffset(offset)
    const locations = await bd.locationsXid(id, limited, offseted);                                                                            
    const totalCount = locations.length
    if(totalCount <= 0){
      return false
    }
    const parsedDB = locations.map(row => {
    return{
      id : row.id,
      name : row.name,
      id_province : row.id_province,
      latitude : row.latitude,
      longitude : row.longitude,
      }
    })
    const result = {
      collection: parsedDB,
      pagination: {
        limit: limited,
        offset: offseted,
        nextPage: ((offseted + 1) * limited <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${limited}&offset=${offseted + 1}` : null,
        total: totalCount,   
      }
    }
    return result
  }

  esNumero(value) {
    return typeof value === 'number' && !isNaN(value);
  }

  async cheqProv(name, longitude, latitude){
    if(name.length < 3 || name.length < 3) {
      return("El campo first_name  deben tener al menos tres caracteres.");
    }
    if(this.esNumero(longitude) == false){
      return("Longitud invalida no es un numero")
    }
    if(this.esNumero(latitude) == false){
      return("Latitud invalida no es un numero")
    }
    return true
  }

  async CrearEjercicio7Provincias(name, full_name, latitude, longitude, display_order) {
    try {
      await bd.Consulta3(name, full_name, latitude, longitude, display_order);
      return "Provincia creada con exito";
    } catch (error) {
      console.log("Error creacion de provincia servicio");
      return ("Error creacion de provincia");
    }
  }

  async autenticarRegistro(name, full_name, latitude, longitude) {
    const existingProvince = await this.buscarProvinciaPorUsername(name);
    if (existingProvince) {
      throw new Error("El name de usuario ya está en uso.");
    }
    const sql = ` INSERT INTO users (name, full_name, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING * `;
    const values = [name, full_name, latitude, longitude];
    try {
      const rta = await bd.Consulta(sql, values);
      return rta.rows[0];
    } catch (error) {
      throw new Error("Error al registrar usuario: " + error.message);
    }
  }

  async EditarProvincia(id, name,full_name, latitude, longitude, display_order ) {
    const cheq = await bd.Consulta2(id)
    if(cheq[0] == null){
      return 404
    }
    try {
      const confirmacion = await bd.Consulta4(id, name,full_name, latitude, longitude, display_order);
      return ("Provincia editada con éxito");
    } catch (error) {
      console.error("Error en la actualización de la provincia:", error);
      return("Error en la actualización de la provincia");
    }
  }

  async EliminarProvincia(id) {
    const cheq = await bd.Consulta2(id)
    if(cheq[0].length <= 0){
      return 404
    }
    try {
      await bd.Consulta5(id);
      return ("Provincia eliminada con exito");
    } catch (error) {
      console.log("Error eliminacion de provincia servicio");
      return response.json("Error eliminacion de provincia");
    }
  }

  async buscarProvinciaPorUsername(name) {
    const sql = `SELECT * FROM provinces WHERE name = $1`;
    try {
      const rta = await bd.Consulta(sql, values);
      return rta.rows[0];
    } catch (error) {
      throw new Error("Error al buscar name por provincia: " + error.message);
    }
  }
}
