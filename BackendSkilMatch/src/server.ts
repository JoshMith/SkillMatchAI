import { setupAliases } from 'import-aliases'
setupAliases()
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from '@app/routes/authRoutes'
import usersRoute from '@app/routes/usersRoute'




// 1:dotenv
dotenv.config()

//2:instance of express
const app = express()

//3:NEVER IN YOUR LIFE FORGET THIS 
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//Cookie parser middleware
app.use(cookieParser())
//eneable CORS for all origins  
// app.use(cors())

//enable cors with optiosn (RECOMMENDED)
//To allow only http://localhost:5173:
app.use(cors({
    origin: "*",
    methods: "GET, PUT,DELETE",
    credentials: true //allows cookies and auth headers
}))


//4. routes 
app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoute)



//5. middlewares for error handlers


//6: start the serve
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`🚀🚀 server is running on http://localhost:${PORT}`)
})
