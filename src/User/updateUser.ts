export type put = {
  url: "{{SERVER}}/user/:username";
  path: {
    username: User["username"];
  };
  resp:
    | Resp<string>
    | Reason<"INvalid username supplied">
    | Reason<"User not found", 404>;
};
