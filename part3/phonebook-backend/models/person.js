const mongoose = require('mongoose')
const logger = require('../utils/logger')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

if (url) {
  mongoose
    .connect(url)
    .then(() => logger.info('connected to MongoDB'))
    .catch((err) => logger.error('error connecting to MongoDB:', err.message))
} else {
  logger.error('MONGODB_URI is not defined — DB calls will fail')
}

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: (v) => /^\d{2,3}-\d+$/.test(v),
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
})

personSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
