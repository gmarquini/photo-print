import { PrintOrderItem } from '@/print-order-item/domain/print-order-item.entity';
import { PrintOrderItemRepository } from '@/print-order-item/domain/print-order-item.repository';
import { AppError } from '@/errors/AppError';

export class InMemoryPrintOrderItemRepository implements PrintOrderItemRepository {
  findBySessionId(sessionId: string): Promise<PrintOrderItem[]> {
    throw new Error('Method not implemented.');
  }
  update(PrintOrderItem: PrintOrderItem): Promise<PrintOrderItem> {
    throw new Error('Method not implemented.');
  }
  private printOrderItems: PrintOrderItem[] = [];

  async create(printOrderItem: PrintOrderItem): Promise<PrintOrderItem> {
    this.printOrderItems.push(printOrderItem);

    return Promise.resolve(printOrderItem);
  }
  async findById(printOrderItemId: string): Promise<PrintOrderItem | null> {
    const printOrderItem = this.printOrderItems.find(
      (printOrderItem) => printOrderItem.id === printOrderItemId,
    );

    if (!printOrderItem) {
      return null;
    }

    return printOrderItem;
  }
  async delete(printOrderItemId: string): Promise<void> {
    const printOrderItemIndex = this.printOrderItems.findIndex(
      (printOrderItem) => printOrderItem.id === printOrderItemId,
    );

    if (printOrderItemIndex === -1) {
      throw new AppError('Item de ordem não encontrado');
    }

    this.printOrderItems.splice(printOrderItemIndex, 1);
  }
}
