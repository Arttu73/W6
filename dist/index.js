"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
let vehicleList = [];
app.get("/hello", (req, res) => {
    res.send("Hello world!");
});
app.post("/vehicle/add", (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Invalid request body" });
    }
    console.log(req.body);
    let vehicle = {
        model: req.body.model,
        color: req.body.color,
        year: req.body.year,
        power: req.body.power
    };
    if (req.body.bodyType && req.body.wheelCount) {
        vehicle.bodyType = req.body.bodyType;
        vehicle.wheelCount = req.body.wheelCount;
    }
    if (req.body.draft) {
        vehicle.draft = req.body.draft;
    }
    if (req.body.wingspan) {
        vehicle.wingspan = req.body.wingspan;
    }
    vehicleList.push(vehicle);
    console.log(vehicleList);
    return res.status(201).json("Vehicle added");
});
app.get("/vehicle/search/:model", (req, res) => {
    let reqModel = req.params.model;
    const match = vehicleList.find(vehicle => vehicle.model === reqModel);
    if (!match) {
        return res.status(404).json({ error: "Vehicle not found" });
    }
    return res.status(200).json(match);
});
app.get("/", (req, res) => {
    res.send("Not hello world!");
});
app.listen(port, () => {
    console.log("Server is up and running at http://localhost:" + port);
});
