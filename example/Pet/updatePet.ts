export type post = {
  url: "{{SERVER}}/pet";
  body: OmitAndRequired<Pet, "id", "name" | "photoUrls">;
  resp:
    | Resp<Pet>
    | Resp<Pet, "application/xml">
    | Reason<"Pet not found", 401>
    | Reason<"Validation expection", 422>;
};
