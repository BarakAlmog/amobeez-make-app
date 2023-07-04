function wallmartOrderParser(textContent) {
  // TEXT Content: Order Date
  const orderDateMatch = /Order date:[\s]*(.+,[\s]*[\d]*)/i.exec(textContent);
  const orderDate = orderDateMatch[1];
  const orderDateFixed = orderDate.replace('.', '');
  const orderDateFinal = new Date(orderDateFixed).toISOString().slice(0, 10);

  // TEXT Content: Order ID
  const orderIDMatch = /Order[\s]([\d-]+)/i.exec(textContent);
  const orderID = orderIDMatch[1];

  // TEXT Content: Team
  const orderTeamMatch = /Team[\s]([\d\w]+)/i.exec(textContent);
  const orderTeam = orderTeamMatch[1];

  // TEXT Content: Get quantity
  const itemQuantityMatch = /qty:[\s]*([\d]+)/i.exec(textContent);
  const itemQuantity = itemQuantityMatch[1].replace(',', '');

  // TEXT Content: shipped by
  const orderShippedByMatch = /shipped by[\s]*([\d\w]+)/i.exec(textContent);
  const orderShippedBy = orderShippedByMatch[1];

  // TEXT Content: Order Subtotal
  const orderSubtotalMatch = /Subtotal[\s]*[$]*([\d.]+)/i.exec(textContent);
  const orderSubtotal = orderSubtotalMatch[1].replace(',', '');

  // TEXT Content: Order Taxes
  const orderSalesTaxMatch = /Taxes[\s]*[$]*([\d.]+)/i.exec(textContent);
  const orderSalesTax = orderSalesTaxMatch[1].replace(',', '');

  // TEXT Content: Order Total
  const orderTotalMatch = /total[\s]*[$]*([\d.]+)/i.exec(textContent);
  const orderTotal = orderTotalMatch[1].replace(',', '');

  // RETURN VALUE
  const parsedOrder = {
    Date: orderDateFinal,
    'Order ID': orderID,
    'Order Total': orderTotal,
    'Order Subtotal': orderSubtotal,
    'Order Shipped By': orderShippedBy,
    'Order Sales Tax': orderSalesTax,
    'Order Team': orderTeam,
    'Item Quantity': itemQuantity,
  };
  return parsedOrder;
}
