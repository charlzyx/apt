class User {
  id: number;
  name: string;
}

type Resp<T, HTTPStatusCode extends number = 200> = {
  data: T,
  code: string
}

type Reason<Message, HTTPStatusCode extends number =400> = {
  reason: string
}

type get = {
  url: '{{SERVER}}/user',
  query: Pick<User, "id" |"name">
  resp: Resp<User> | Reason<"User not found", 404>
}

