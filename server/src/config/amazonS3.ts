type AmazonS3Config = {
  accessKeyId: string
  secretAccessKey: string
  region: string
  bucket: string
}

export default {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucket: process.env.AWS_BUCKET_NAME
} as AmazonS3Config
