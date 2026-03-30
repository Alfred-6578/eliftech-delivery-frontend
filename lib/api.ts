const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const getShops = async (params?: Record<string, string>) => {
  const query = params ? '?' + new URLSearchParams(params).toString() : ''
  const res = await fetch(`${BASE_URL}/api/shops${query}`)
  const data = await res.json()
  return data.shops
}

export const getProductsByShop = async (shopId: string) => {
  const res = await fetch(`${BASE_URL}/api/products/shop/${shopId}`)
  return res.json()
}

export const createOrder = async (data: object) => {
  const res = await fetch(`${BASE_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const getOrders = async (params?: Record<string, string>) => {
  const query = params ? '?' + new URLSearchParams(params).toString() : ''
  const res = await fetch(`${BASE_URL}/api/orders${query}`)
  return res.json()
}

export const getCoupons = async () => {
  const res = await fetch(`${BASE_URL}/api/coupons`)
  return res.json()
}

export const validateCoupon = async (code: string) => {
  const res = await fetch(`${BASE_URL}/api/coupons/${code}`)
  return res.json()
}
