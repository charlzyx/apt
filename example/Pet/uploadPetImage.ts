export type post = {
  url: "{{SERVER}}/pet/:petId/uploadImage";
  path: {
    petId: Pet["id"];
  };
  /**
   *  requestBody:
        content:
          application/octet-stream:
            schema:
              type: string
              format: binary
   */
  body: binary;
  query: Record<string, string>;
  resp: Resp<Pet> | Reason<"Pet not Found", 404>;
};
