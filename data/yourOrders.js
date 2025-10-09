export const yourOrders = JSON.parse(localStorage.getItem('yourOrders')) ||
[
  {
    orderDate: '5 de outubro',
    orderYear: '2025',
    orderPriceCents: '49980',
    orderId: '27cba69d-4c3d-4098-b42d-ac7fa62b7664', 
    orderProducts: [
      {
        orderProductId: "119e0b11-4d3f-4e0c-9d62-7f284d3101b4", 
        orderProductDeliveryDate: '10 de outubro',
        orderProductQuantity: 2
      },
      {
        orderProductId:  "2d9a3b6d-8b0c-4e89-8b2b-9c7a2b9d3e5f", 
        orderProductDeliveryDate: '7 de outubro',
        orderProductQuantity: 2
      }
    ],
  }
]