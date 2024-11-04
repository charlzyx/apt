type int32 = number;
type int64 = number;
type float = number;
type double = number;
type date = string;
type datetime = string;
type password = string;
type binary = string;
type byte = string;

type OmitAndRequired<
  T,
  OmitedProps extends keyof T,
  RquiredProps extends keyof T
> = Omit<Partial<T>, OmitedProps> & Pick<T, RquiredProps>;

type OmitAndOptional<
  T,
  OmitedProps extends keyof T,
  OptionalProps extends keyof T
> = Omit<Partial<T>, OmitedProps> & Partial<Pick<T, OptionalProps>>;

// type WithHeaders<
//   CustomeHeaders extends Partial<
//     Record<BuiltInHttpHeaders, string | number>
//   > = {}
// > = CustomeHeaders & {};

// type WithContentType<
//   T,
//   ContentType extends BuiltInContentType = "application/json"
// > = T;

// https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers
type BuiltInHttpHeaders =
  | "Accept"
  | "Accept-CH"
  | "Accept-Charset"
  | "Accept-Encoding"
  | "Accept-Language"
  | "Accept-Patch"
  | "Accept-Post"
  | "Accept-Ranges"
  | "Access-Control-Allow-Credentials"
  | "Access-Control-Allow-Headers"
  | "Access-Control-Allow-Methods"
  | "Access-Control-Allow-Origin"
  | "Access-Control-Expose-Headers"
  | "Access-Control-Max-Age"
  | "Access-Control-Request-Headers"
  | "Access-Control-Request-Method"
  | "Age"
  | "Allow"
  | "Alt-Svc"
  | "Alt-Used"
  | "Authorization"
  | "Cache-Control"
  | "Clear-Site-Data"
  | "Connection"
  | "Content-Digest"
  | "Content-Disposition"
  | "Content-Encoding"
  | "Content-Language"
  | "Content-Length"
  | "Content-Location"
  | "Content-Range"
  | "Content-Security-Policy"
  | "Content-Security-Policy-Report-Only"
  | "Content-Type"
  | "Cookie"
  | "Cross-Origin-Embedder-Policy"
  | "Cross-Origin-Opener-Policy"
  | "Cross-Origin-Resource-Policy"
  | "Date"
  | "Device-Memory"
  | "ETag"
  | "Expect"
  | "Expires"
  | "Forwarded"
  | "From"
  | "Host"
  | "If-Match"
  | "If-Modified-Since"
  | "If-None-Match"
  | "If-Range"
  | "If-Unmodified-Since"
  | "Keep-Alive"
  | "Last-Modified"
  | "Link"
  | "Location"
  | "Max-Forwards"
  | "Origin"
  | "Permissions-Policy"
  | "Priority"
  | "Proxy-Authenticate"
  | "Proxy-Authorization"
  | "Range"
  | "Referer"
  | "Referrer-Policy"
  | "Refresh"
  | "Repr-Digest"
  | "Retry-After"
  | "Sec-Fetch-Dest"
  | "Sec-Fetch-Mode"
  | "Sec-Fetch-Site"
  | "Sec-Fetch-User"
  | "Sec-Purpose"
  | "Sec-WebSocket-Accept"
  | "Sec-WebSocket-Extensions"
  | "Sec-WebSocket-Key"
  | "Sec-WebSocket-Protocol"
  | "Sec-WebSocket-Version"
  | "Server"
  | "Server-Timing"
  | "Service-Worker-Navigation-Preload"
  | "Set-Cookie"
  | "SourceMap"
  | "Strict-Transport-Security"
  | "TE"
  | "Timing-Allow-Origin"
  | "Trailer"
  | "Transfer-Encoding"
  | "Upgrade"
  | "Upgrade-Insecure-Requests"
  | "User-Agent"
  | "Vary"
  | "Via"
  | "Want-Content-Digest"
  | "Want-Repr-Digest"
  | "WWW-Authenticate"
  | "X-Content-Type-Options"
  | (string & {});

// https://developer.mozilla.org/zh-CN/docs/Web/HTTP/MIME_types
// https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST

type BuiltInContentType =
  | "application/json"
  | "multipart/form-data"
  | "text/plain"
  | "application/octet-stream"
  | "application/xml"
  | "application/x-www-form-urlencoded"
  | "application/pdf"
  | "application/zip"
  | "text/javascript"
  | "text/css"
  | "text/html"
  | "image/apng"
  | "image/avif"
  | "image/gif"
  | "image/jpeg"
  | "image/png"
  | "image/svg+xml"
  | "image/webp"
  | "audio/wave"
  | "audio/wav"
  | "audio/x-wav"
  | "audio/x-pn-wav"
  | "audio/webm"
  | "audio/ogg"
  | "video/webm"
  | "video/ogg"
  | "application/ogg"
  | "multipart/byteranges"
  | (string & {});
