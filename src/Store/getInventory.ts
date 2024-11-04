export type get = {
  url: "{{SERVER}}/store/inventory";
  resp: Record<Pet["status"], int32>;
};
