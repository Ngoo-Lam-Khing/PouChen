export interface Metadata {
  material: string;
  weight: string;
}
export interface Item {
  id: string;
  name: string;
  category: string;
  color: string;
  basePrice: number;
  multiplier: number;
  metadata: Metadata;
}
export type List = Array<Item>;
