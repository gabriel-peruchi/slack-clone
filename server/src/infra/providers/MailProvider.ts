import { createTransport, Transporter } from 'nodemailer'

import mailConfig from '../../config/mail'

export type MailMessage = {
  from: string
  to: string
  subject: string
  body: string
}

export class MailProvider {
  private transporter: Transporter

  constructor() {
    this.transporter = createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: {
        user: mailConfig.auth.user,
        pass: mailConfig.auth.pass
      }
    })
  }

  async sendEmail({ from, to, subject, body }: MailMessage) {
    await this.transporter.sendMail({
      to,
      from,
      subject,
      html: body
    })
  }
}
