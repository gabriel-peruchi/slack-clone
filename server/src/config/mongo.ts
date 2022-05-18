type MongoConfig = {
  url: string
}

export default {
  url: process.env.MONGO_URL
} as MongoConfig
