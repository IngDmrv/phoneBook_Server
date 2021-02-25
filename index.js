//requerimiento de express
const express = require('express')
const morgan = require ('morgan')

//se crea una variable con app donde este nos va a reemplzar el createServer
const app = express()

app.use(express.json())
//app.use(morgan('dev'))

morgan.token('tokenBody', (req) => {
    return JSON.stringify(req.body)
})

app.use (
    morgan(':method :url :status :res[content-length] - :response-time ms  :tokenBody' )
)


//Lista telefonica
const list = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dam Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
]

//rutas de http

//Paso1: Devolver una lista en la ruta '/api/persons'

app.get('/api/persons',(req,res) => 
{
    res.json(list)
})

//Paso2: Implementar la direccion '/info'
app.get('/info',(req,res) => 
{
    let date = Date()
    res.send(`Phonebook has info for ${list.length} people </br>  </br> 
    ${date}`)
})

//Paso3: Mostrar la información de una sola entrada de la agenda

app.get('/api/persons/:id', (req,res) =>
{
    const id=Number(req.params.id)
    console.log(id)
    const person = list.find(item => item.id === id)
    console.log(person)
    res.status(404).json(person)
}
)

//Paso4: Eliminar una sola entrada de la agenda telefonica
app.delete ('/api/persons/:id',(req,res) =>
{
    const id = Number(req.params.id)
    console.log(id)
    const resultList = list.filter (item => item.id !== id)
    console.log(resultList)
    res.status(404).json(resultList)
})

//Paso5y6:Agregar nuevas entradas a la agenda y implementar manejo de errores.
app.post('/api/persons', (req,res) => 
{
    const newPerson = req.body
    console.log(newPerson)

    const personExist = list.find(personValidate => personValidate.name === newPerson.name)
    const errorMsg = {}

    if(!newPerson.name){
        errorMsg.error = 'name is null'
        res.status(404).json(errorMsg)
    }else if (!newPerson.number){
        errorMsg.error = 'number is null'
        res.status(404).json(errorMsg)
     }else if(personExist){
        errorMsg.error = 'name must be unique'
        res.status(404).json(errorMsg)
    }else{
        let id = Math.round(Math.random(1,100)*100)
        console.log(Number(id))

        newPerson.id = id

        list.push(newPerson)
        res.json(list)

  }

})

//Llamando el servidor
const PORT = 3001
app.listen(PORT)
console.log (`Server running ${PORT}`)