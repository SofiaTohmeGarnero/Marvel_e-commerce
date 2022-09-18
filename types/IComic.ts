export interface IItem {
  name: string;
  resourceURI: string;
}
export default interface IComic {
  id: number;
  characters:{
    items: IItem[]
  };
  description: string;
  format: string;
  oldPrice: number;
  price: number;
  stock: number;
  title: string;
  thumbnail: {
    extension:  string,
    path: string
  };
} 
