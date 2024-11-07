export type del = {
  url: "{{SERVER}}/user/:username";
  path: {
    username: User["username"];
  };
  resp: Reason<"INvalid username supplied"> | Reason<"User not found", 404>;
};
