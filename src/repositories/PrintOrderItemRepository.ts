import { PrintOrderItem } from '@/print-order-item/entities/PrintOrderItem';

export abstract class PrintOrderItemRepository {
  abstract create(printOrderItem: PrintOrderItem): Promise<PrintOrderItem>;
  abstract findById(printOrderItemId: string): Promise<PrintOrderItem | null>;
  abstract delete(printOrderItemId: string): Promise<void>;
}
