import mongoose from 'mongoose'

import mongoConfig from '../../config/mongo'

mongoose.set('toJSON', {
  virtuals: true,
  getters: true,
  transform: (doc, ret) => {
    delete ret._id
    delete ret.__v
  }
})

mongoose.set('toObject', {
  virtuals: true,
  getters: true,
  transform: (doc, ret) => {
    delete ret._id
    delete ret.__v
  }
})

mongoose
  .connect(mongoConfig.url, { authSource: 'admin' })
  .catch((error) => console.log(error))
