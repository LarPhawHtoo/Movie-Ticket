"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post.controller");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router
    .route("/")
    .get(post_controller_1.getPosts)
    .post([
    (0, express_validator_1.body)("title").notEmpty().withMessage("Tilte must not be empty"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description must note be empty")
], post_controller_1.createPost);
router
    .route("/search")
    .post(post_controller_1.findByName);
router
    .route("/:id")
    .get(post_controller_1.findPost)
    .put([
    (0, express_validator_1.body)("title").notEmpty().withMessage("Tilte must not be empty"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description must note be empty"),
    (0, express_validator_1.body)("status")
], post_controller_1.updatePost)
    .delete(post_controller_1.deletePost);
exports.default = router;
