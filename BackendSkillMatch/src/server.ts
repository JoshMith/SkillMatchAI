import { setupAliases } from 'import-aliases'
setupAliases()
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from '@app/routes/authRoutes'
import userRoutes from './routes/userRoutes'
import applicationRoutes from './routes/applicationRoutes'
import cvRoutes from './routes/cvRoutes'
import interviewRoutes from './routes/interviewRoutes'
import jobRoutes from './routes/jobRoutes'
import jobSkillRoutes from './routes/jobSkillRoutes'
import portfolioRoutes from './routes/portfolioRoutes'
import profileRoutes from './routes/profileRoutes'
import skillRoutes from './routes/skillRoutes'
import userSkillRoutes from './routes/userSkillRoutes'
import { notFound } from './middlewares/errorMiddlewares'




// 1:dotenv
dotenv.config()

//2:instance of express
const app = express()

//3:NEVER IN YOUR LIFE FORGET THIS
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Cookie parser middleware
app.use(cookieParser())

app.use(cors({
    origin: "*",
    methods: "GET, PUT,DELETE",
    credentials: true //allows cookies and auth headers
}))


app.get('/', (req, res) => {
    res.send(`
      <div style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(135deg, #00bcd4, #4caf50, #e91e63);
        color: white;
        padding: 60px;
        text-align: center;
        border-radius: 10px;
        margin: 40px auto;
        max-width: 700px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      ">
        <h1 style="font-size: 48px; margin-bottom: 20px;">🎉 Welcome to SkillMatch AI!</h1>
        <p style="font-size: 20px; line-height: 1.6;">
          Your intelligent career companion 🤖<br />
          Discover tailored job opportunities, enhance your skills, and unlock your full potential.<br/>
          Let’s shape your future together!
        </p>
        <a href="http://51.20.35.31:3000/jobs" style="
          display: inline-block;
          margin-top: 30px;
          padding: 12px 25px;
          background-color: #ffffff;
          color: #333;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          transition: all 0.3s ease;
        " onmouseover="this.style.backgroundColor='#e0e0e0'">
          🚀 Get Started
        </a>
      </div>
    `);
  });
  


//4. routes 
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/profiles", profileRoutes)
app.use("/api/skills", skillRoutes)
app.use("/api/user-skills", userSkillRoutes)
app.use("/api/jobs", jobRoutes)
app.use("/api/job-skills", jobSkillRoutes)
app.use("/api/applications", applicationRoutes)
app.use("/api/interviews", interviewRoutes)
app.use("/api/cvs", cvRoutes)
app.use("/api/portfolios", portfolioRoutes)




//5. middlewares for error handlers
app.use(notFound)

//6: start the serve
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`🚀🚀 server is running on http://51.20.35.31:${PORT}`)
})


// //6: start the serve
// const PORT = Number(process.env.PORT) || 3000;
// app.listen(PORT, '0.0.0.0',() => {
//     console.log(`🚀🚀 server is running on http://51.20.35.31:${PORT}`)
// })
