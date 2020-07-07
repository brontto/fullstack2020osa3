const express = require('express')
const { response, request } = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))
app.use(cors())

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const info =
        `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`
    response.send(info)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(note => note.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    min = Math.ceil(0);
    max = Math.floor(10000);
    return Math.floor(Math.random() * (max - min)) + min;
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (persons.some(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique, like me!!!!'
        })
    }

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})