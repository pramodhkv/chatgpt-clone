type Message = {
  text: string;
  createdAt: FieldValue;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
};
