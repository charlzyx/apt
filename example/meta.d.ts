type Auth = {};

type PageQuery<T> = T & {
  pageNo: number;
  pageSize: number;
};

// 分页配置
// 的包装器
type PageResp<T> = {
  /** 数组值 */
  records: T[];
  // 你好
  total: number;
  pageNo?: number;
  pageSize?: number;
};

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
