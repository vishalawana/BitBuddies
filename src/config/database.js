const mongoose = require('mongoose')

const connectDB = async () => {
      await mongoose.connect(
        "mongodb+srv://gujjarvishal117:VishalAwana@cluster0.54hgxyz.mongodb.net/BitBuddies?retryWrites=true&w=majority&appName=Cluster0"
    )
}

module.exports = connectDB;