import express from "express"
import EventController from "./src/controllers/event-controller.js";
import UserController from "./src/controllers/user-controller.js";
import ProvinciasController from "./src/controllers/provincias-controller.js";
import LocationController from "./src/controllers/location-controller.js"
import CategoryController from "./src/controllers/category-constroller.js";
import eventLocationCotroller from "./src/controllers/event-location.js"
const app = express(); 
app.use(express.json()); 
const port = 3408;

app.use("/event", EventController);
app.use("/user", UserController);
app.use("/province", ProvinciasController);
app.use("/location", LocationController)
app.use("/event-category", CategoryController)
app.use("/event-location", eventLocationCotroller)

app.listen(port, () =>{
    console.log("mandalo al servido")
})