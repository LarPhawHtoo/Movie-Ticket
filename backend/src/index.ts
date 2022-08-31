import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import  movieRoute  from "./routes/movie.route";
import  userRoute  from "./routes/user.route";
import authRoute from "./routes/auth.route";
import cinemaRoute from "./routes/cinema_route";
import seatRoute from "./routes/seat.route";
import ticketRoute from "./routes/ticket.route";
import cors from 'cors';
import multer, { FileFilterCallback } from "multer";
import { v4 } from "uuid";
import passport from "passport";

const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api.yaml');

require('./config/passport');

import "dotenv/config"; 

import bodyParser, {json} from 'body-parser';
import path from "path";
import { rootDir } from "./utils/utils";
import cookieParser from "cookie-parser";

dotenv.config();

const fileStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "apiuploads/profile");
  },
  filename: (_req, file, cb) => {
    cb(null, `${v4()}_${file.originalname}`);
  }
});

const fileFilter = (_req: Request, file: any, cb: FileFilterCallback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype==="image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  } 
}
const fileStorageMovies = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "apiuploads/movies");
  },
  filename: (_req, file, cb) => {
    cb(null, `${v4()}_${file.originalname}`);
  }
});


const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(upload.single('image'));
//app.use("/single", upload.single("image"));
app.use(multer({ storage: fileStorage, fileFilter }).single("profile"));
app.use('/apiuploads/profiles', express.static('apiuploads/profiles'));
app.use(multer({ storage: fileStorageMovies, fileFilter }).single("image"));
app.use('/apiuploads/movies', express.static('apiuploads/movies'));

app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT;

mongoose.connect(`${process.env.MONGO_URL}`, {
  //useNewUrlParser: true
  //useUnifiedTopology: true
},
  err => {
      if (!err) {
          console.log('Database connection successed');
      } else {
          console.log('Error in connection ' + err);
      }
  });

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/cinemas', passport.authenticate('jwt', { session: false }), cinemaRoute);
app.use('/api/users', passport.authenticate('jwt', { session: false }), userRoute);
app.use('/api/movies', passport.authenticate('jwt', { session: false }), movieRoute);
app.use('/api/seats', passport.authenticate('jwt', { session: false }), seatRoute);
app.use('/api/tickets', passport.authenticate('jwt', { session: false }), ticketRoute);
app.use("/api", authRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`[server]:Server is running at https://localhost:${port}`);
})
