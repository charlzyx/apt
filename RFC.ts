type Resp<T> = {
  200: {
    code: number;
    data: T;
  };
  500: {
    code: number;
    reason: string;
  };
};

class Post {
  title: string;
  content: string;
}

class User {
  uid: number;
  name: string;
  avatar: string;
  createTime: number;
  posts: Post[];
}

type GetUserById = {
  method: "GET";
  path: "{{APIHOST}}/get/user/:uid";
  response: Resp<User>;
};

type QueryUserList = {
  method: "GET";
  path: "{{APIHOST}}/user/list";
  query: {
    name?: User["name"];
  };
  response: Resp<{
    records: User[];
    total: number;
  }>;
  // https://ts-ast-viewer.com/#code/C4TwDgpgBAShDOYA8AVAfFAvFA3gKCigCYAGEgLlwMKgGMB7AEwkoDsBXAWwCMIAnANzVCjAIbBRlFEMIBfGVACsZSvhp0mLKBx78FhPhFHx6rSvGB8AlqwDmC+Xkd4bwfgDNRtaAAV6FqkJgK2AAGy0LazsFBlY3OPNLG3snPBc4jy9oAFV4fkCoditGNi5eQWpWUU4IpOjqUQA3cVE+RKiUwlpDcQgUKxrS3QrCMH9geEo-CwBtAF0hWTTQSCgAcQhgXP4AIRAASUYsAprgAAsmSgAiNYBRFCuFMHEz65wcAEEffYAJAHkAMooWSyAD0tk2oPYeT4oPIRUYj2ohkQpjylDgiCQ2z4aEWQjwK2gAEV2PwQDiADJWALYNRQU4XEpQG73JGjF5vT7ff5AkFQmGg0I04DsqAARzJfBAqmE2mqEAA-JQcTMrlUalcFtRHAYEGNWOjYPqkPS9Qw+IxJlBVdr1MB6BJQkNyg48dQIAAPapgcKy9SSKAARgANHLuJQiGH1LRrvArtGaMyAOSibi0RjJuVjCzWmY4KDBMJaK6iR6F8Al+NQWRzROEK4QKrccJXSiWMn1lmsMDwQ5tlmkIgAZhIABYiGOE3KrmI3DBRHYIAOZnL1Fch8OALRjreT6fqdebreKLdBxRXOV1mcSPgQrYwldrmhXB3sawWS-qa-rout66AAbygAU6oAWJqAOSagDQXoAZXqAFBygBY8oAFcaAArBgBrcoAXXKAP7ygAUroAiv6AK4ZgASToA8DqAEV+gBmcoA+P8Hi+PbwAuS5PoeNAkF26ihs+hBRhxUDDqxNBjnxhCKIJUAAGwiQA7CJAAcIkAJwiUGJBXl2r5nCiFyhIilCyTe1i2BCfDxv6TEso0NIhAAsgAYgOvHcVc5kQAA7gAco6CADkpIlXBYoggJZNjsG4xlKHKsiqZKCDBKYVRWIYA5moer4hP+LKAO-RgB3qYAVyqANlymWABkZgCO+oAsyqAGFygAVBoAIW7IYA8IaAPyGFGABD-gD3yiBgCQCYAkP-UUxpaGs5-ChaupmHklI2-qly7XIAaZl4U1gCLyoADc54Z12GAMrygAxWYAwfGAHe6PXjeuzShGSA5XNwoiMAA+u4EAQFdXqQNYTbeF+B01iJ6hjW9KXFqdgAo3oADdGAGfRgCjBnhVXrdte0faZjmiMdU0sudV2sB5l0PfwVjPcu3HqBFuM0F9B0-WlVyAFRyaGANxy4OQ7t+1vWZ8MndcyOXdC-CXc8ELo56j1Y6wL0E3IMOEET40k4jVyAPlKgC-AYAXP6AIya9PfUdzMsqEXgANaXfQ7jXewAsxYar0HfjDNiyNEunchgChioAndqALBygA5qoARNbK8TquS4wNLCprECXYYDCcDUrDMIiQvvRHFuw3+kv24AYEqAN4+UCglAgCJGYAygmAIg67vi57p03c5l20Gci6sBAoTxhHZtvdHvWx6dgA4JoARL6yw7gC+mlhueW-nLMXZdeStCXPN89jJvjTXB118lDfXIAAOmAIGRgDzfoAHHqAN5ugCq+oAZLGAO-K3ew73LKcOww+hPQtiXTY48jZP43TxNv3XIAbooofvvWH1cjpnPw1+mUsI1zHCqkQgTgCREigAAYR6G4HExx6SMkuCyHwgIHhPE5Cyd4XxfgoP5OzWE3QjBuDFNwJgMooB-E4CEbEMIQwsmKFcKAAAfFkBDej9E1O6PUqJDRaExMgJKgd6CWmtLafQhZHTwxdHoHU7pnDgOyGAOcEBYF0moAg5kVwfDZFQdQZ45wuRYN5MCMEOZgACn4HCBExDSFTFaMEeGSAKFUJxLQq4rC3DsOXGgDAAAyKAPgrC0E1tQ-grirGcKgCiA0Ro+EhNxPiPAQA
  example: {
    targetUser: ["tourist"];
    title: "你在多大程度上会推荐他人使用网页版小红书？";
    npsRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  };
};

type CreateUser = {
  method: "POST";
  path: "{{APIHOST}}/user/create";
  body: Omit<User, "id" | "createTime">;
  response: Resp<{
    records: User[];
    total: number;
  }>;
};

type UpdateUser = {
  method: "PUT";
  path: "{{APIHOST}}/post/user/:uid";
  body: Partial<Omit<User, "createTime">> & Pick<User, "uid">;
  response: Resp<User>;
};
