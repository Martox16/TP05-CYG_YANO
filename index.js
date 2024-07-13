import express from "express"
import Event from "./src/controllers/event-controller.js";
import User from "./src/controllers/user-controller.js";
import Provincias from "./src/controllers/provincias-controller.js";
import Location from "./src/controllers/location-controller.js"
import Category from "./src/controllers/category-constroller.js";
import eventLocation from "./src/controllers/event-location.js"
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
app.use("/event-category", Category);
//6
app.use("/event-location", eventLocation);

app.listen(port, () =>{
    console.log("mandalo al servido")
})