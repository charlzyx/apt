export type post = {
  url: "{{SERVER}}/pet/:petId";
  path: {
    petId: Pet["id"];
  };
  query: Pick<Pet, "name" | "status">;
  resp: Reason<"Invalid ID supplied">;
};
