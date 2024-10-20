export interface Product {
  id: number;
  name: string;
  description: string;
  stock: string;
  price: number;
  creationDate: string;
  lastUpdate: string;
};

export interface ResProducts {
  pageSize: number;
  pageNumber: number;
  totalRecords: number;
  totalPages: number;
  products: Product[];
};

