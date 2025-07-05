"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('strictQuery', false);
const url = process.env.MONGODB_URI;
if (!url) {
    throw new Error('MONGODB_URI environment variable is not defined');
}
console.log('connecting to', url);
mongoose_1.default
    .connect(url)
    .then(() => {
    console.log('connected to MongoDB');
})
    .catch((error) => {
    console.error('error connecting to MongoDB:', error.message);
});
// Define the schema with proper types
const contactSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
});
// Transform the JSON output
contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
// Export the model with proper types
const Contact = mongoose_1.default.model('Contact', contactSchema);
exports.default = Contact;
