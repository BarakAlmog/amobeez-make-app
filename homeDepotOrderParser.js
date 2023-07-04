function homeDepotOrderParser(htmlContent, textContent) {
  // TEXT Content: Order ID
  const orderIDMatch = /order[\n\r\s]+number[\n\r\s]+([a-zA-Z0-9]+)/i.exec(
    textContent
  );
  const orderID = orderIDMatch[1];

  // TEXT Content: Order Date
  const orderDateMatch =
    /Order[\n\r\s]+date[\n\r\s]+([a-zA-Z0-9. ,]+)[\s]+Order/i.exec(textContent);
  const orderDate = orderDateMatch[1];
  const orderDateFixed = orderDate.replace('.', '');
  const orderDateFinal = new Date(orderDateFixed).toISOString().slice(0, 10);

  // TEXT Content: Order Total
  const orderTotalMatch = /Order[\n\r\s]+total[\n\r\s]+[$]*([0-9. ,]+)/i.exec(
    textContent
  );
  const orderTotal = orderTotalMatch[1].replace(',', '');

  // TEXT Content: Order Params
  const orderOtherParamsMatch =
    /Subtotal[\s]+[$]([\d.,]*).*Shipping[\s]*([$.\w\d\s]*)[\s]+Sales[\s]+Tax[\s]*[\s]+[$]([\d.,]*).*Order Total[\s]+[$]([\d.,]*)/i.exec(
      textContent
    );
  const orderSubtotal = orderOtherParamsMatch[1].replace(',', '');
  const orderShipping = orderOtherParamsMatch[2].replace(',', '');
  const orderSalesTax = orderOtherParamsMatch[3].replace(',', '');

  // HTML Content
  const htmlStripped = htmlContent.replace(/(<([^>]+)>)/gi, '');
  const removedLines = htmlStripped.replace(/\n\s*\n/g, '');

  // HTML: Get item name
  const splitHtml1 = removedLines.split('Item Total')[1];
  const itemName = splitHtml1.split('Store SKU')[0].trim();

  // HTML: Get quantity
  const itemQuantityMatch = /Qty[\s\n\r]*([0-9.]*)/i.exec(splitHtml1);
  const itemQuantity = itemQuantityMatch[1].replace(',', '');

  // RETURN VALUE
  const parsedOrder = {
    Date: orderDateFinal,
    'Order ID': orderID,
    'Order Total': orderTotal,
    'Order Subtotal': orderSubtotal,
    'Order Shipping': orderShipping,
    'Order Sales Tax': orderSalesTax,
    'Item Name': itemName,
    'Item Quantity': itemQuantity,
  };

  return parsedOrder;
}
