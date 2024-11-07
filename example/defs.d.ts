// https://editor-next.swagger.io/
type Status = "placed" | "approved" | "delivered";

class Order {
  id: int64;
  petId: int64;
  quantity: int32;
  shipDate: datetime;
  status: Status;
  complete: boolean;
}

class Customer {
  id: int64;
  username: string;
  address: Address;
}

class Address {
  street: string;
  city: string;
  state: string;
  zip: number;
}

class Category {
  id: int64;
  name: string;
}

class User {
  id: int64;
  username: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: int32;
}

class Tag {
  id: int64;
  name: string;
}

class Pet {
  /** Pet's id */
  id: int64 = 0;
  // getJsDocs() cannot see me
  category: Category; // but getLeadingCommentRanges/getTrailingCommentRanges can do it!
  // name with default
  name: string = "hi";
  /** photos */
  photoUrls: string[];
  tags: Tag[];
  status: Status;
}
