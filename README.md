# api-typewriter
芝加哥打字机&lt;大雾>~~不是~~


```ts
type GetUser = {
  method: "GET";
  path: "{{APIHOST}}/get/user/:uid";
  query: {
    maybe?: string;
  };
  body: {
    list: string[];
  };
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

type UpdateUser = {
  method: "POST";
  path: "{{APIHOST}}/post/user/:uid";
  body: {
    list: string[];
  };
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
