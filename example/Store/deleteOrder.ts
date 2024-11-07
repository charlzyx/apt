export type del = {
  url: "{{SERVER}}/store/order/:orderId";
  path: {
    orderId: Order["id"];
  };
  resp: Reason<"Invalid ID supplied"> | Reason<"Order not found", 404>;
};
