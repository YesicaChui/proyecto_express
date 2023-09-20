import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'
import dotenv from 'dotenv'
dotenv.config()

export const signup = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount()
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  })
  let message = {
    from: 'Alejandro Di Stefano <alejandro@gmail.com>',
    to: 'alexmarinmendez@gmail.com',
    subject: 'Nuevo usuario registrado',
    html: '<h1>Nuevo usuario!</h1>'
  }

  try {
    const info = await transporter.sendMail(message)
    res.status(201).json({
      message: 'Email enviado..',
      preview: nodemailer.getTestMessageUrl(info)
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getbill = async (req, res) => {
  try {
    const emailUser = req.body.email
    const data= [

      {
        item: 'Bicicleta de 25 ruedas',
        description: 'Linda bicicleta para bicletear',
        price: 'USD10.99'
      }
    ]
    const info = await sendEmail(emailUser,data,"¡Ha llegado tu Comprobante de tu compra!")
    res.status(201).json({
      message: 'Email enviado..'
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const sendEmail = async (email, data,intro) => {

  let config = {
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  }
  let transporter = nodemailer.createTransport(config)
  let Mailgenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Ecommerce Yesica',
      link: 'http://www.yesica.com'
    },
  })

  let response = {
    body: {
      greeting: 'Hola',
      signature: 'Hasta la próxima',
      intro: intro,
      table: {
        data: data
      },
      outro: '¡Gracias por estar aquí!'
    }
  }

  let mail = Mailgenerator.generate(response)


  let message = {
    from: process.env.GMAIL_USER,
    to: email,
    subject:intro!=='¡Haz sido registrado exitosamente!'?'Compra realizada':'Registro Ecommerce exitoso',
    html: mail
  }

  try {
    const info = await transporter.sendMail(message)
    return {
      message: 'Email enviado..'
    }
  } catch (err) {
    return { error: err.message }
  }
}

export const sendSimpleEmail = async (email, link) => {

  let config = {
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  }
  let transporter = nodemailer.createTransport(config)

  let message = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: '[Yesica e-comm API] Reset your password',
    html: `<h1>[Yesica e-comm API] Reset your password</h1><hr />You have asked to reset your password. You can do it here: <a href=${link}>${link}</a><hr />Best regards,<br><strong>The Yesica e-comm API team</strong>`
  }

  try {
    const info = await transporter.sendMail(message)
    return {
      message: 'Email enviado..'
    }
  } catch (err) {
    return { error: err.message }
  }
}

export const sendGenericEmail = async (email,asunto, mensaje) => {

  let config = {
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  }
  let transporter = nodemailer.createTransport(config)

  let message = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: asunto,
    html: `<h1>${mensaje}</h1>`
  }

  try {
    const info = await transporter.sendMail(message)
    return {
      message: 'Email enviado..'
    }
  } catch (err) {
    return { error: err.message }
  }
}