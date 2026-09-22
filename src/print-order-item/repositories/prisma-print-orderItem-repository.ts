import { PrismaService } from '@/prisma/prisma.service';
import { PrintOrderItem } from '../domain/print-order-item.entity';
import { PrintOrderItemRepository } from '../domain/print-order-item.repository';
import { PrismaPrintOrderMapper } from '../mappers/print-order-item.mapper';

export class PrismaPrintOrderItemRepository extends PrintOrderItemRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  async create(printOrderItem: PrintOrderItem): Promise<PrintOrderItem> {
    const data = await this.prisma.printOrderItem.create({
      data: {
        id: printOrderItem.id,
        photoId: printOrderItem.photoId,
        size: printOrderItem.size,
        quantity: printOrderItem.quantity,
        paperType: printOrderItem.paperType,
        showDate: printOrderItem.showDate,
      },
    });
    return PrismaPrintOrderMapper.toDomain(data);
  }
  async findById(printOrderItemId: string): Promise<PrintOrderItem | null> {
    const data = await this.prisma.printOrderItem.findUnique({
      where: { id: printOrderItemId },
    });

    if (!data) return null;

    return PrismaPrintOrderMapper.toDomain(data);
  }
  async delete(printOrderItemId: string): Promise<void> {
    await this.prisma.printOrderItem.delete({
      where: { id: printOrderItemId },
    });
  }
}
