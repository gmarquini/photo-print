import { PrintOrderItem } from '@/print-order-item/domain/print-order-item.entity';

export abstract class PrintOrderItemRepository {
  abstract create(printOrderItem: PrintOrderItem): Promise<PrintOrderItem>;
  abstract findById(printOrderItemId: string): Promise<PrintOrderItem | null>;
  abstract delete(printOrderItemId: string): Promise<void>;
}
