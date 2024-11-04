export type get = {
  url: "{{SERVER}}/store/order/:orderId";
  path: {
    orderId: Order["id"];
  };
  resp:
    | Resp<Order>
    | Resp<Order, "application/xml">
    | Reason<"Invalid ID supplied">
    | Reason<"Order not found", 404>;
};
