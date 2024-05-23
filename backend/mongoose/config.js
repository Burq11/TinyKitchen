const mongoose= require('mongoose')

const clientOptions= { serverApi: { version: '1', deprecationErrors: true } }

module.exports = async (mongoConnectionString) => {
    try {
        await mongoose.connect(mongoConnectionString, clientOptions)
        return mongoose.connection
    } catch (err) {
        if (mongoose.connection) {
            mongoose.connection.disconnect()
        }
        throw err
    }
}