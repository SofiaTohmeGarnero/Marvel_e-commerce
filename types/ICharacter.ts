export default interface ICharacter {
  id: number;
  description: string;
  name: string;
  thumbnail: {
    extension: string;
    path: string;
  };
}

