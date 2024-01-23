import express, {Express, Request, Response} from "express"

const app: Express = express()
const port: number = 3000

app.use(express.json())

type Vehicle = {
    model: string,
    color: string,
    year: number,
    power: number,
    bodyType?: string,
    wheelCount?: number,
    draft?: number,
    wingspan?: number
}

let vehicleList: Vehicle[] = []

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello world!")
})

app.post("/vehicle/add", (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({ error: "Invalid request body" });
    }
    
    console.log(req.body)

    let vehicle: Vehicle = {
        model: req.body.model,
        color: req.body.color,
        year: req.body.year,
        power: req.body.power
    }
    if(req.body.bodyType && req.body.wheelCount) {
        vehicle.bodyType = req.body.bodyType
        vehicle.wheelCount = req.body.wheelCount
    }
    if (req.body.draft) {
        vehicle.draft = req.body.draft
    }
    if (req.body.wingspan) {
        vehicle.wingspan = req.body.wingspan
    }
    vehicleList.push(vehicle)
    console.log(vehicleList)
    return res.status(201).json("Vehicle added")
})

app.get("/vehicle/search/:model", (req: Request, res: Response) => {
    let reqModel = req.params.model

    const match = vehicleList.find(vehicle => vehicle.model === reqModel)

    if (!match) {
        return res.status(404).json({error: "Vehicle not found"})
    }
    return res.status(200).json(match)
})

app.get("/", (req: Request, res: Response) => {
    res.send("Not hello world!")
})

app.listen(port, () => {
    console.log("Server is up and running at http://localhost:" + port)
})