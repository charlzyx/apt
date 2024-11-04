export type get = {
  url: "{{SERVER}}/:petId";
  path: {
    petId: Pet["id"];
  };
  resp:
    | Resp<Pet>
    | Resp<Pet, "application/xml">
    | Reason<"Invalid ID supplied">
    | Reason<"Pet not Found", 404>;
};
