"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const movie_route_1 = __importDefault(require("../routes/movie.route"));
const user_route_1 = __importDefault(require("../routes/user.route"));
const auth_route_1 = __importDefault(require("../routes/auth.route"));
const seat_route_1 = __importDefault(require("../routes/seat.route"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const passport_1 = __importDefault(require("passport"));
require('./config/passport');
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils/utils");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const fileStorage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "apiuploads");
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
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, multer_1.default)({ storage: fileStorage, fileFilter }).single("profile"));
app.use("/apiuploads", express_1.default.static(path_1.default.join(utils_1.rootDir, "apiuploads")));
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
app.use('/api/users', passport_1.default.authenticate('jwt', { session: false }), user_route_1.default);
app.use('/api/movies', passport_1.default.authenticate('jwt', { session: false }), movie_route_1.default);
app.use('/api/seats', passport_1.default.authenticate('jwt', { session: false }), seat_route_1.default);
app.use("/api", auth_route_1.default);
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.listen(port, () => {
    console.log(`[server]:Server is running at https://localhost:${port}`);
});
