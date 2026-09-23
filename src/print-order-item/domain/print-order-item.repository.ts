import { PrintOrderItem } from '@/print-order-item/domain/print-order-item.entity';

export abstract class PrintOrderItemRepository {
  abstract create(printOrderItem: PrintOrderItem): Promise<PrintOrderItem>;
  abstract update(PrintOrderItem: PrintOrderItem): Promise<PrintOrderItem>;
  abstract findById(printOrderItemId: string): Promise<PrintOrderItem | null>;
  abstract findBySessionId(sessionId: string): Promise<PrintOrderItem[]>;
  abstract delete(printOrderItemId: string): Promise<void>;
}
