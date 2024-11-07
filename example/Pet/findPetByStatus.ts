export type get = {
  url: "{{SERVER}}/findByStatus";
  query: Pet["status"];
  resp:
    | Resp<Pet>
    | Resp<Pet, "application/xml">
    | Reason<"Invalid status value">;
};
