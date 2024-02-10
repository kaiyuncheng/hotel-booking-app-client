type ImageUrl = string;

export type Info = {
  title: string;
  isProvide: boolean;
};

export interface IRoom {
  _id: string;
  name: string;
  description: string;
  imageUrl: ImageUrl;
  imageUrlList: ImageUrl[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  status: number;
  layoutInfo: Info[];
  facilityInfo: Info[];
  amenityInfo: Info[];
  createdAt: string;
  updatedAt: string;
}
