export type put = {
  url: "{{SERVER}}/pet";
  // body: OmitAndRequired<Pet, "id", "name" | "photoUrls">;
  resp: Resp<Pet>;
  // resp: | Resp<Pet>
  //   | Resp<Pet, "application/xml">
  //   | Reason<"Invalid ID supplied">
  //   | Reason<"Pet not found", 401>
  //   | Reason<"Validation expection", 422>;
};
