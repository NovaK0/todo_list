const mongoose = require('mongoose')

const conn = async () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => console.error('DB Connection Error:', err))
}

conn();


