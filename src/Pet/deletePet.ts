export type del = {
  url: "{{SERVER}}/pet/:petId";
  headers: {
    api_key: string;
  };
  path: {
    petId: Pet["id"];
  };
  resp: Reason<"Invalid pet value">;
};
