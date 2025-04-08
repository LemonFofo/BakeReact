export type DeliveryType = 'pickup' | 'delivery';

export interface Order {
  id: string;
  clientName: string;
  item: string;
  quantity: number;
  deliveryType: DeliveryType;
  deliveryTime: string; // ISO string
  date: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}

export interface BakingStep {
  time: string; // ISO string
  description: string;
  orderId: string;
} 