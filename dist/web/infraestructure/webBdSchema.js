"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const WebSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    domain: { type: String, required: true },
    content: { type: mongoose_1.Schema.Types.Mixed, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
});
const Web = (0, mongoose_1.model)('Web', WebSchema);
exports.default = Web;
