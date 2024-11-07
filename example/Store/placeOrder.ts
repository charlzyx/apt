export type post = {
  url: "{{SERVER}}/store/order";
  body: Order;
  resp:
    | Resp<Order>
    | Reason<"Invalid input">
    | Reason<"Validation exception", 422>;
};
