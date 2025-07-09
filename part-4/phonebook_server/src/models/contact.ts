import mongoose, { Schema, Document, Model } from 'mongoose'

mongoose.set('strictQuery', false)

// Define the TypeScript interface for a Contact document
export interface IContact extends Document {
  name: string
  number: string
  _id: object
  __v: number
}

// Validate phone number
const numberValidator = (val: string): boolean => {
  const phoneRegex = /^[0-9]{2,3}-[0-9]+$/
  return phoneRegex.test(val)
}

// Define the schema with proper types
const contactSchema: Schema<IContact> = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true },
  number: { type: String, minlength: 8, validate: {
    validator: numberValidator,
    message: props => `${props.value} is not a valid phone number! Format: 2-3 digits, dash (-), followed by digits. Example: "123-456789".`,
  },
  required: true },
})

// Transform the JSON output
contactSchema.set('toJSON', {
  transform: (document: Document, returnedObject: Partial<IContact>) => {
    returnedObject.id = document._id!.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// Export the model with proper types
const ContactDB: Model<IContact> = mongoose.model<IContact>('Contact', contactSchema)
export default ContactDB
