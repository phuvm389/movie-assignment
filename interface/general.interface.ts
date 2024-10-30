export interface IImage {
  src: string;
  alt?: string;
  title?: string;
  width: number;
  height: number;
  className?: string;
}

export interface ILink {
  text: string;
  url: string;
  className?: string;
}
