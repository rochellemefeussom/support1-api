const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

const requestlogger = (req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`)
        next()
}

app.use(requestlogger)

let courses = [
    {id: 1, title: 'Algorithme',teacher: 'Dr Nji', credits : 6},
    {id: 2, title: 'Developpement Web', teacher: 'Dr Jiomekong', credits: 6}
]
 app.get('/api/health', (req, res) => {
    res.status(200).json({status: 'ok'})
 })

 app.get('/api/courses', (req, res) => {
    res.status(200).json(courses)
 })

 app.get('/api/courses/:id',(req, res) => {
    const id = Number(req.params.id)
    const course = courses.find(c => c.id === id)

    if (!course) {
        res.status(404).json({error: 'course not found'})
        return
    }
 })


 app.post('/api/courses', (req, res) => {
    const { title, teacher, credits } = req.body

    if (!title || !teacher || !credits){
        res.status(400).json({error: 'title, teacher, credits are required'})
        return 
    }

    const nextId = courses.length > 0
      ?Math.max(...courses.map(c => c.id)) + 1
      : 1

      const newCourse = { id: nextId, title, teacher, credits: Number(credits) }
      courses = courses.concat(newCourse)
      
    res.status(201).json(newCourse)
})
app.delete('/api/courses/:id', (req, res) => {
    const id = Number(req.params.id)
    const exists = courses.some(c => c.id === id)

    if(!exists){
        res.status(404).json({ error: 'course not found'})
        return
    }
    courses = courses.filter(c => c.id !== id)
    res.status(204).send()
})

app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`)
})