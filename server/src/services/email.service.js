import nodemailer from 'nodemailer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const EXCEL_PATH = path.join(__dirname, '../../data/orders.xlsx')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
})

export const sendOrderEmail = async ({ orderNumber, customer, items, totalAmount }) => {
  const itemsHtml = items
    .map(
      (i) =>
        `<tr>
          <td style="padding:6px;border:1px solid #ddd;">${i.name}</td>
          <td style="padding:6px;border:1px solid #ddd;">${i.description}</td>
          <td style="padding:6px;border:1px solid #ddd;">Rs ${i.price}</td>
          <td style="padding:6px;border:1px solid #ddd;">${i.quantity}</td>
        </tr>`
    )
    .join('')

  const html = `
    <h2>New Order Received — ${orderNumber}</h2>
    <h3>Customer</h3>
    <p>
      Name: ${customer.name}<br/>
      Phone: ${customer.phone}<br/>
      Address: ${customer.address}, ${customer.city} ${customer.postal || ''}
    </p>
    <h3>Items</h3>
    <table style="border-collapse:collapse;width:100%;">
      <thead>
        <tr>
          <th style="padding:6px;border:1px solid #ddd;">Item</th>
          <th style="padding:6px;border:1px solid #ddd;">Description</th>
          <th style="padding:6px;border:1px solid #ddd;">Price</th>
          <th style="padding:6px;border:1px solid #ddd;">Qty</th>
        </tr>
      </thead>
      <tbody>${itemsHtml}</tbody>
    </table>
    <h3>Total: Rs ${totalAmount}</h3>
  `

  await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: 'mohsinalishahnaqvi123@gmail.com',
  subject: `New Order ${orderNumber}`,
  html,
})
}