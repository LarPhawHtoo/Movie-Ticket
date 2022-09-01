"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const movie_route_1 = __importDefault(require("./routes/movie.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const cinema_route_1 = __importDefault(require("./routes/cinema_route"));
const seat_route_1 = __importDefault(require("./routes/seat.route"));
const ticket_route_1 = __importDefault(require("./routes/ticket.route"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
require('./config/passport');
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const utils_1 = require("./utils/utils");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api.yaml');
dotenv_1.default.config();
const fileStorage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        console.log(_file === null || _file === void 0 ? void 0 : _file.fieldname);
        if ((_file === null || _file === void 0 ? void 0 : _file.fieldname) == "image") {
            cb(null, "apiuploads/movies");
        }
        else {
            cb(null, "apiuploads/profiles");
        }
    },
    filename: (_req, file, cb) => {
        cb(null, `${(0, uuid_1.v4)()}_${file.originalname}`);
    }
});
const fileFilter = (_req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
//app.use(upload.single('image'));
//app.use("/single", upload.single("image"));
//app.use(multer({ storage: fileStorage, fileFilter }).single("profile"));
//app.use('/apiuploads/profiles', express.static('apiuploads/profiles'));
//app.use(multer({ storage: fileStorageMovies, fileFilter }).single("image"));
//app.use('/apiuploads/movies', express.static('apiuploads/movies'));
app.use((0, multer_1.default)({ storage: fileStorage, fileFilter }).fields([{ name: 'profile', maxCount: 1 }, { name: 'image', maxCount: 1 }]));
//app.use(multer({ storage: fileStorage, fileFilter }).fields([{ name: 'movie', maxCount: 1},{ name: 'image', maxCount: 1}]));
app.use("/apiuploads", express_1.default.static(path_1.default.join(utils_1.rootDir, "apiuploads")));
//app.use("/postuploads", express.static(path.join(rootDir, "postuploads")));
app.use((0, multer_1.default)({ storage: fileStorage, fileFilter }).single("profile"));
app.use('/apiuploads/profiles', express_1.default.static('apiuploads/profiles'));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
const port = process.env.PORT;
mongoose_1.default.connect(`${process.env.MONGO_URL}`, {
//useNewUrlParser: true
//useUnifiedTopology: true
}, err => {
    if (!err) {
        console.log('Database connection successed');
    }
    else {
        console.log('Error in connection ' + err);
    }
});
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/cinemas', passport_1.default.authenticate('jwt', { session: false }), cinema_route_1.default);
app.use('/api/users', passport_1.default.authenticate('jwt', { session: false }), user_route_1.default);
app.use('/api/movies', passport_1.default.authenticate('jwt', { session: false }), movie_route_1.default);
app.use('/api/seats', passport_1.default.authenticate('jwt', { session: false }), seat_route_1.default);
app.use('/api/tickets', passport_1.default.authenticate('jwt', { session: false }), ticket_route_1.default);
app.use("/api", auth_route_1.default);
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.listen(port, () => {
    console.log(`[server]:Server is running at https://localhost:${port}`);
});
