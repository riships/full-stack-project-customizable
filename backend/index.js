
import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Server is ready')
})



app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`)
})
