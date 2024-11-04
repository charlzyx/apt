type Auth = {};

type Resp<
  T,
  ContentType extends BuiltInContentType = "application/json",
  HTTPStateCode = 200,
  Headers extends Partial<Record<BuiltInHttpHeaders, string>> = {}
> = {
  code: int32;
  data: T;
  message: string;
};

type Reason<
  T,
  HTTPStateCode = 400,
  Headers extends Partial<Record<BuiltInHttpHeaders, string>> = {}
> = {
  code: int32;
  reason: string;
};
