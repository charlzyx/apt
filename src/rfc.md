```typescript
type meta = {
  title: "Name of Api";
  seq: 1;
};
```

```ts
type 最简单例子 = {
  url: "/something";
  resp: Resp<{ name: string }>;
};

type 指定请求方法 = {
  method: "GET";
  url: "/other/:things";
  resp: Resp<{ name: string }>;
};

type 添加请求头和Cookie = {
  method: "POST";
  url: "/and/more";
  headers: {};
  // 需要类型提示的话可以使用辅助函数
  headers: WithHeaders<{
    Authorization: string;
  }>;
  // 默认是json
  // 可以指定 body 的 content-type
  body: WithContentType<
    {
      file: File;
    },
    "multipart/form-data"
  >;
  cookies: {
    literal: string;
  };
};

type 多状态响应值 = {
  url: "/complex/resp";
  resp: {
    // 设置Response 的Headers
    headers: {};
    // 以及 Set-Cookie
    cookies: {};
    200: Resp<{ name: string }>;
    // 可以单独指定 Content-Type
    201: WithContentType<File, "application/octet-stream">;
    400: Reason<"Bad Params">;
  };
};
```

```ts
export type get = {
  headers: WithHeaders<{
    Authorization: string;
  }>;
  cookies: {};
  url: "{{API_HOST}}/get/something/:interesting";
  path: {
    interesting: number;
  };
  query: {};
  body: WithContentType<
    {
      file: File;
    },
    "multipart/form-data"
  >;
};

type resp = {
  headers: WithHeaders<{
    "Content-Disposition": string;
  }>;
  cookies: {};
  200: {};
  201: WithContentType<File, "application/octet-stream">;
};
```
