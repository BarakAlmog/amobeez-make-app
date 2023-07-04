function homeDepotOrderParserV2(htmlContent, textContent) {
  // TEXT Content: Order Number
  const orderNumberMatch = /Order[\n\r\s]+number:[\n\r\s]+([a-zA-Z0-9]+)/i.exec(
    textContent
  )
  const orderNumber = orderNumberMatch && orderNumberMatch[1].replace(',', '')

  // TEXT Content: Order Amount
  const orderAmountMatch = /Total[\n\r\s]+[$]*([0-9. ,]+)/i.exec(textContent)
  const orderAmount = orderAmountMatch && orderAmountMatch[1].replace(',', '')

  // TEXT Content: Order Total
  const orderTotalMatch = /0 Total[\n\r\s]+[$]*([0-9. ,]+)/i.exec(textContent)
  const orderTotal = orderTotalMatch && orderTotalMatch[1].replace(',', '')

  // TEXT Content: Order Subtotal
  const orderSubtotalMatch = /Subtotal[\n\r\s]+[$]*([0-9. ,]+)/i.exec(
    textContent
  )
  const orderSubtotal =
    orderSubtotalMatch && orderSubtotalMatch[1].replace(',', '')

  // TEXT Content: Order Shipping
  const orderShippingMatch = /Shipping[\n\r\s]+[$]*([0-9. ,]+)/i.exec(
    textContent
  )

  const orderShipping =
    orderShippingMatch && orderShippingMatch[1].replace(',', '')

  // TEXT Content: Order Shipping
  const orderSalesTaxMatch = /Tax[\n\r\s]+[$]*([0-9. ,]+)/i.exec(textContent)
  const orderSalesTax =
    orderSalesTaxMatch && orderSalesTaxMatch[1].replace(',', '')

  // TEXT Content: Order Total
  const orderDiscountMatch = /Discount[\n\r\s]+[$]*([0-9. ,]+)/i.exec(
    textContent
  )
  const orderDiscount =
    orderDiscountMatch && orderDiscountMatch[1].replace(',', '')

  // TEXT Content: Order Total
  const orderQuantityMatch = /(\d)\s? x/i.exec(textContent)
  const orderQuantity =
    orderQuantityMatch && orderQuantityMatch[1].replace(',', '')

  // TEXT Content: Order Date
  const orderDateMatch =
    /Order[\n\r\s]+date[\n\r\s]+([a-zA-Z0-9. ,]+)[\s]+Order/i.exec(textContent)

  let orderDateFinal
  if (orderDateMatch) {
    const orderDate = orderDateMatch[1]
    const orderDateFixed = orderDate.replace('.', '')
    orderDateFinal = new Date(orderDateFixed).toISOString().slice(0, 10)
  }

  if (false) {
    // HTML Content
    const htmlStripped = htmlContent.replace(/(<([^>]+)>)/gi, '')
    const removedLines = htmlStripped.replace(/\n\s*\n/g, '')

    // HTML: Get item name
    const splitHtml1 = removedLines.split('Item Total')[1]
    const itemName = splitHtml1.split('Store SKU')[0].trim()

    // HTML: Get quantity
    const itemQuantityMatch = /(\d)\s? x/i.exec(splitHtml1)
    const itemQuantity = itemQuantityMatch[1].replace(',', '')
  }

  // RETURN VALUE
  const parsedOrder = {
    Date: orderDateFinal,
    'Order Number': orderNumber,
    'Order Amount': orderAmount,
    'Order Total': orderTotal,
    'Order Subtotal': orderSubtotal,
    'Order Shipping': orderShipping,
    'Order Sales Tax': orderSalesTax,
    'Order Discount': orderDiscount,
    'Order Quantity': orderQuantity,
  }

  return parsedOrder
}
