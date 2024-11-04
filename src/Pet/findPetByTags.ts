export type get = {
  url: "{{SERVER}}/findByTags";
  query: Pet["tags"];
  resp:
    | Resp<Pet>
    | Resp<Pet, "application/xml">
    | Reason<"Invalid status value">;
};
