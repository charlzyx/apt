type Status = "placed" | "approved" | "delivered";

class User {
  id: number;
  username: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number;
}

declare class Order {
  id: number;
  petId: number;
  quantity: number;
  shipDate: string;
  status: Status;
}

declare class Tag {
  id: number;
  name: string;
}

declare class Pet {
  id: number;
  category: Category;
  name: string;
  photoUrls: string[];
  tags: Tag[];
  status: Status;
}

declare class Category {
  id: number;
  name: string;
}
