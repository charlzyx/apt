export type post = {
  url: "{{SERVER}}/user";
  body: OmitAndRequired<User, "id", "username" | "password">;
  resp: Resp<User> | Resp<User, "application/xml">;
};
