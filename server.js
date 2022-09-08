const express = require('express')
const cors = require('cors')

const app = express()

// middleware

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// routers
const LoginRouter = require('./routes/LoginRouter')
app.use('/login', LoginRouter)

const UserVerificationRouter = require('./routes/UserVerificationRouter')
app.use('/verifyUser', UserVerificationRouter)

const ProcductRouter = require('./routes/ProductRouter.js')
app.use('/api/products', ProcductRouter)

const HolderRouter = require('./routes/AssociationRouter');
app.use('/holders',HolderRouter);

const Tutorials = require('./routes/TutorialRoutes');
app.use('/tut',Tutorials);


//port

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})