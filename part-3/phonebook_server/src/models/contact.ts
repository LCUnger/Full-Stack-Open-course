import mongoose, { Schema, Document, Model } from 'mongoose';

mongoose.set('strictQuery', false);

const url: string | undefined = process.env.MONGODB_URI;

if (!url) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

console.log('connecting to', url);

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error: Error) => {
    console.error('error connecting to MongoDB:', error.message);
  });

  
// Define the TypeScript interface for a Contact document
export interface IContact extends Document {
  name: string;
  number: string;
  _id: object;
  __v: number;
}

// Define the schema with proper types
const contactSchema: Schema<IContact> = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
});

// Transform the JSON output
contactSchema.set('toJSON', {
  transform: (document: Document, returnedObject: Partial<IContact>) => {
    returnedObject.id = document._id!.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Export the model with proper types
const Contact: Model<IContact> = mongoose.model<IContact>('Contact', contactSchema);
export default Contact;