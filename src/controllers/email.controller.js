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
/*       {
        item: 'Bicicleta de 25 ruedas',
        description: 'Linda bicicleta para bicletear',
        price: 'USD10.99'
      },
      {
        item: 'Bicicleta de 3 ruedas rotas',
        description: 'Linda bicicleta para bicletear',
        price: 'USD100.99'
      },
      {
        item: 'Bicicleta de 1/2 rueda',
        description: 'Linda bicicleta para bicletear',
        price: 'USD101.99'
      } */
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
/*   const emailUser = data.email
  const dataEmail = data.map(async el => {
    const product = await ProductService.getById(el.product);
    return {
      product: product.title,
      quantity: el.quantity,
      totalPrice: el.totalPrice,
    }
  }) */
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
    subject: 'Compra realizada',
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