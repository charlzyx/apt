export type put = {
  url: "{{SERVER}}/pet";
  // query: Pet;
  query:
    | (Omit<Pet, "id" | "name" | "photoUrls"> & Pick<Partial<Pet>, "name">)
    | User;
  body: OmitAndRequired<Pet, "id", "name" | "photoUrls">;
  resp:
    | Resp<Pet>
    | Resp<Pet, "application/xml">
    | Reason<"Invalid ID supplied">
    | Reason<"Pet not found", 401>
    | Reason<"Validation expection", 422>;
};
