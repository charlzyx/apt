// ------type helper -------

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
type Resp<T> = {
  code: number;
  data: T;
};
type Reason<Tip = never> = {
  code: number;
  reason: string;
  type: string;
};
// ------defs--------------------

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

class Order {
  id: number;
  petId: number;
  quantity: number;
  shipDate: string;
  status: Status;
}

class Tag {
  id: number;
  name: string;
}

class Pet {
  id: number;
  category: Category;
  name: string;
  photoUrls: string[];
  tags: Tag[];
  status: Status;
}

class Category {
  id: number;
  name: string;
}

// ---------- pet

type UploadAnImage = {
  POST: "pet/:petId/uploadImage";
  path: {
    petId: Pet["id"];
  };
  formData: {
    additionalMetadata: string;
    file: File;
  };
  resp: Reason;
};

type AddaNewPetToTheStore = {
  POST: "/pet";
  body: OmitThenRequired<Pet, "id", "name" | "photoUrls">;
  resp: Resp<Pet>;
  reason: {
    405: Reason<"Invalid Input">;
  };
};

type UpdateAnExistingPet = {
  POST: "/pet";
  body: OmitThenRequired<Pet, never, "id" | "name" | "photoUrls">;
  resp: Resp<Pet>;
  reason: {
    400: Reason<"Invalid ID supplied">;
    404: Reason<"Pet not Found">;
    405: Reason<"Validation exception">;
  };
};

type FindsPetsByStatus = {
  GET: "/pet/findByStatus";
  query: {
    status: Status[];
  };
  resp: Resp<Pet[]>;
  reason: {
    400: Reason<"Invalid status value">;
  };
};

/** @deprecated */
type FindsPetsByTags = {
  GET: "/pet/findByTags";
  query: {
    tags: Status[];
  };
  resp: Resp<Pet[]>;
  reason: {
    400: Reason<"Invalid tag value">;
  };
};

type FindPetById = {
  GET: "/pet/:petId";
  path: {
    petId: Pet["id"];
  };
  resp: Resp<Pet>;
  reason: {
    400: Reason<"Invalid ID supplied">;
    404: Reason<"Pet not found">;
  };
};

type UpdatesAPetInTheStoreWithFormData = {
  GET: "/pet/:petId";
  path: {
    petId: Pet["id"];
  };
  formData: {
    name: Pet["name"];
    status: Pet["status"];
  };
  resp: Resp<Pet>;
  reason: {
    405: Reason<"Invalid input">;
  };
};

type DeletesAPet = {
  DELETE: "/pet/:petId";
  headrs: {
    api_key: string;
  };
  path: {
    petId: Pet["id"];
  };
  resp: {
    405: Reason<"Invalid input">;
    400: Reason<"Pet not found">;
  };
};

// store

type ReturnsPetInventoriesbyStatus = {
  GET: "/store/inventory";
  resp: Resp<Record<string, number>>;
};

type PlaceAnOrderForAPet = {
  GET: "/store/order";
  body: Order;
  resp: Resp<Order>;
  reason: Reason<"Invalid Order">;
};

type FindPurchaseOrderById = {
  GET: "/store/order/:orderId";
  path: {
    orderId: Order["id"];
  };
  resp: Resp<Order>;
  reason: {
    400: Reason<"Invalid ID supplied">;
    404: Reason<"Order not found">;
  };
};

type DeletePurchaseOrderById = {
  DELETE: "/store/order/:orderId";
  path: {
    orderId: Order["id"];
  };
  reason: {
    400: Reason<"Invalid ID supplied">;
    404: Reason<"Order not found">;
  };
};

// ----user

type CreateListOfUsersWithGivenInputArray = {
  GET: "/user/createWithList";
  body: User[];
};

type GetUserByUserName = {
  GET: "/user/:username";
  path: {
    username: User["username"];
  };
  resp: User;
  reason: {
    400: Reason<"Invalid username supplied">;
    404: Reason<"User Not Found">;
  };
};

type UpdateUser = {
  PUT: "/user/:username";
  path: {
    username: User["username"];
  };
  body: Pick<User, "username"> & OmitThenOptional<User, "username", never>;
  reason: {
    400: Reason<"Invalid username supplied">;
    404: Reason<"User not found">;
  };
};

type DeleteUser = {
  DELETE: "/user/:username";
  path: { username: User["username"] };
  reason: {
    400: Reason<"Invalid username supplied">;
    404: Reason<"User not found">;
  };
};

type LogsUserIntoTheSystem = {
  GET: "/user/login";
  query: Pick<User, "username" | "password">;
  resp: {
    200: Resp<string>;
    headers: {
      "X-Expires-After": string;
      "X-Rate-Limit": number;
    };
  };
  reason: {
    400: Reason<"Invalid username/password supplied">;
  };
};

type LogsoutCurrentLoggedInUserSession = {
  GET: "/user/logout";
};

type CreatesListOfUsersWithGivenInputArray = {
  POST: "/user/createWithArray";
  body: User[];
};

type CreateUser = {
  POST: "/user";
  body: User;
};
