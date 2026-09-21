import { PrintOrderItem } from '../domain/print-order-item.entity';
import { PrintOrderItemRepository } from '../domain/print-order-item.repository';

export class PrismaPrintOrderItemRepository implements PrintOrderItemRepository {
  create(printOrderItem: PrintOrderItem): Promise<PrintOrderItem> {
    throw new Error('Method not implemented.');
  }
  findById(printOrderItemId: string): Promise<PrintOrderItem | null> {
    throw new Error('Method not implemented.');
  }
  delete(printOrderItemId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
