import { ILink } from "@/interface/general.interface";

export interface ICards {
  title?: string;
  items?: ICardsItem[] | any[];
  link?: ILink;
}

export interface ICardsItem {
  title?: string;
  description?: string;
}
