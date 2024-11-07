export type get = {
  url: "{{SERVER}}/user/:username";
  path: {
    username: User["username"];
  };
  resp:
    | Resp<User>
    | Resp<User, "application/xml">
    | Reason<"INvalid username supplied">
    | Reason<"User not found", 404>;
};
