export type User = {
  results: any;
  id: string;
  email: string;
  passwd: string;
  name: string;
  age: number;
  friends: User[];
  enemies: User[];
};
export type ServerResp = {
  results: User[];
};
