export interface Store {
  id: string;
  name: string;
  description: string;
  link: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStore {

  name: string;
  description: string;
  link: string;
  isActive: boolean;

}
