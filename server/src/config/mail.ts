type MailConfig = {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

export default {
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
} as MailConfig
