# api-typewriter

芝加哥打字机&lt;大雾>~~不是~~

```ts
type Response<T> = {
  200: {
    code: number;
    data: T;
  };
  500: {
    code: number;
    reason: string;
  };
};

class User {
  uid: number;
  name: string;
  createTime: number;
}

type GetUser = {
  method: "GET";
  path: "{{APIHOST}}/get/user/:uid";
  query: {
    maybe?: string;
  };
  body: {
    list: User[];
  };
  response: Response<{
    uid: number;
    name: string;
  }>;
};

type UpdateUser = {
  method: "POST";
  path: "{{APIHOST}}/post/user/:uid";
  body: Partical<User> & Pick<User, "uid">;
  response: {
    200: {
      uid: number;
      name: string;
    };
    500: {
      message: string;
    };
  };
};
```
