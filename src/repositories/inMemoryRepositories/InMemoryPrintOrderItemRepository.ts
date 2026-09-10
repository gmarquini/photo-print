import { PrintOrderItem } from '@/print-order-item/entities/PrintOrderItem';
import { PrintOrderItemRepository } from '../PrintOrderItemRepository';
import { AppError } from '@/errors/AppError';

export class InMemoryPrintOrderItemRepository implements PrintOrderItemRepository {
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
