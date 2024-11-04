export type get = {
  url: "{{SERVER}}/user/login";
  query: Pick<User, "username" | "password">;
  resp:
    | Resp<
        string,
        "application/json",
        200,
        {
          "X-Rate-Limit": string;
          "X-Expires-After": string;
        }
      >
    | Resp<
        string,
        "application/xml",
        200,
        {
          "X-Rate-Limit": string;
          "X-Expires-After": string;
        }
      >
    | Reason<"Invalid username/password supplied ">;
};
