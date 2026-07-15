import Product from '../models/Product.js'

const SYSTEM_PROMPT = `You are a product search assistant for PharmaCare, an online pharmacy.

STRICT RULES:
- You ONLY recommend products from the CATALOG list provided below. Never mention any product not in this list.
- You are NOT a doctor. Never diagnose conditions, suggest dosages, or give medical advice.
- If the user describes symptoms, help them find relevant product categories from the catalog (e.g. pain relief, vitamins), and always remind them to consult a pharmacist or doctor for medical guidance.
- Keep replies short and friendly, 1-3 sentences.
- You MUST respond with ONLY valid JSON in this exact format, no other text:
{"reply": "your short reply text here", "productIds": ["id1", "id2"]}
- productIds must only contain _id values that exist in the catalog below. Include at most 5. If nothing relevant matches, return an empty array.`

export const chatWithCatalog = async (userMessage) => {
  const products = await Product.find({ inStock: true })
    .populate('category', 'name')
    .select('name description price category')
    .limit(100)

  const catalogText = products
    .map((p) => `- id:${p._id} | ${p.name} | category:${p.category?.name || 'N/A'} | ${p.description || ''}`)
    .join('\n')

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: `${SYSTEM_PROMPT}\n\nCATALOG:\n${catalogText}` },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 400,
    }),
  })

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`Groq API error: ${response.status} ${errText}`)
  }

  const data = await response.json()
  const rawText = data.choices?.[0]?.message?.content || '{}'

  let parsed
  try {
    parsed = JSON.parse(rawText)
  } catch (e) {
    parsed = { reply: "Sorry, I couldn't process that. Could you rephrase?", productIds: [] }
  }

  const validIds = (parsed.productIds || []).filter((id) =>
    products.some((p) => p._id.toString() === id)
  )

  const matchedProducts = await Product.find({ _id: { $in: validIds } }).populate('category', 'name slug')

  return {
    reply: parsed.reply || "Here's what I found.",
    products: matchedProducts,
  }
}