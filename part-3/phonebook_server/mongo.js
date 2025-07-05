const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://luukcunger:${password}@cluster0.zzjsjth.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set(`strictQuery`, false)

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model(`Contact`, contactSchema)

nameEntry = process.argv[3]
numberEntry = process.argv[4]

if (!nameEntry || !numberEntry) {
    console.log('Phonebook:')
    Contact.find({}).then(result => {
        result.forEach(contact => console.log(`${contact.name} ${contact.number}`))
    mongoose.connection.close()
    })
} else {
    const contact = new Contact({
        name: nameEntry,
        number: numberEntry,
    })
    
    contact.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}
