import ExcelJS from 'exceljs'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FILE_PATH = path.join(__dirname, '../../data/orders.xlsx')

const ensureFile = async () => {
  const dir = path.dirname(FILE_PATH)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  const workbook = new ExcelJS.Workbook()

  if (fs.existsSync(FILE_PATH)) {
    await workbook.xlsx.readFile(FILE_PATH)
  } else {
    const sheet = workbook.addWorksheet('Orders')
    sheet.columns = [
      { header: 'Order Number', key: 'orderNumber', width: 20 },
      { header: 'Item Name', key: 'itemName', width: 25 },
      { header: 'Description', key: 'description', width: 35 },
      { header: 'Price', key: 'price', width: 12 },
      { header: 'Quantity', key: 'quantity', width: 10 },
      { header: 'Customer Name', key: 'customerName', width: 20 },
      { header: 'Address', key: 'address', width: 35 },
      { header: 'City', key: 'city', width: 15 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Total Amount', key: 'totalAmount', width: 15 },
      { header: 'Date', key: 'date', width: 20 },
    ]
    sheet.getRow(1).font = { bold: true }
    await workbook.xlsx.writeFile(FILE_PATH)
  }

  return workbook
}

export const appendOrderToExcel = async ({ orderNumber, customer, items, totalAmount }) => {
  const workbook = await ensureFile()
  const sheet = workbook.getWorksheet('Orders')

  items.forEach((item) => {
    sheet.addRow({
      orderNumber,
      itemName: item.name,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      customerName: customer.name,
      address: customer.address,
      city: customer.city,
      phone: customer.phone,
      totalAmount,
      date: new Date().toLocaleString(),
    })
  })

  await workbook.xlsx.writeFile(FILE_PATH)
}