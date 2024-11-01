type int32 = number;
type int64 = number;
type float = number;
type double = number;
type password = string;

type OmitThenRequired<
  T,
  OmitedProps extends keyof T,
  RquiredProps extends keyof T
> = Omit<Partial<T>, OmitedProps> & Pick<T, RquiredProps>;

type OmitThenOptional<
  T,
  OmitedProps extends keyof T,
  OptionalProps extends keyof T
> = Omit<Partial<T>, OmitedProps> & Partial<Pick<T, OptionalProps>>;

type WithHeaders<
  CustomeHeaders extends Partial<
    Record<BuiltInHttpHeaders, string | number>
  > = {}
> = CustomeHeaders & {};

type WithContentType<T, ContentType extends MIME = "application/json"> = T;
