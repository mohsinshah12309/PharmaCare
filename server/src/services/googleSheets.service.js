import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const HEADERS = [
  'Order Number',
  'Item Name',
  'Description',
  'Price',
  'Quantity',
  'Customer Name',
  'Address',
  'City',
  'Phone',
  'Total Amount',
  'Date',
]

let sheetInstance = null

const loadCredentials = () => {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    // Used on Render/production — full JSON pasted as an env var
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
  }

  if (process.env.GOOGLE_SERVICE_ACCOUNT_PATH) {
    // Used on local dev — path to the downloaded key file
    const KEY_PATH = path.join(__dirname, '../../', process.env.GOOGLE_SERVICE_ACCOUNT_PATH)
    return JSON.parse(fs.readFileSync(KEY_PATH, 'utf-8'))
  }

  throw new Error('No Google service account credentials found in environment variables')
}

const getSheet = async () => {
  if (sheetInstance) return sheetInstance

  const credentials = loadCredentials()

  const auth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth)
  await doc.loadInfo()

  let sheet = doc.sheetsByIndex[0]

  await sheet.loadHeaderRow().catch(async () => {
    // No header row exists yet — set it now
    await sheet.setHeaderRow(HEADERS)
  })

  sheetInstance = sheet
  return sheet
}

export const appendOrderToGoogleSheet = async ({ orderNumber, customer, items, totalAmount }) => {
  const sheet = await getSheet()

  const rows = items.map((item) => ({
    'Order Number': orderNumber,
    'Item Name': item.name,
    'Description': item.description,
    'Price': item.price,
    'Quantity': item.quantity,
    'Customer Name': customer.name,
    'Address': customer.address,
    'City': customer.city,
    'Phone': customer.phone,
    'Total Amount': totalAmount,
    'Date': new Date().toLocaleString(),
  }))

  await sheet.addRows(rows)
}