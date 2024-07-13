import express from "express"
import Event from "./src/controllers/event_controller.js";
import User from "./src/controllers/user_controller.js";
import Provincias from "./src/controllers/provincias_controller.js";
import Location from "./src/controllers/location_controller.js"
import Category from "./src/controllers/categoria_constroller.js";
import eventLocation from "./src/controllers/evento_location.js"
const app = express(); 
app.use(express.json()); 
const port = 3408;
//1
app.use("/event", Event);
//2
app.use("/user", User);
//3
app.use("/province", Provincias);
//4
app.use("/location", Location);
//5
app.use("/event_category", Category);
//6
app.use("/event_location", eventLocation);

app.listen(port, () =>{
    console.log("mandalo al servido")
})