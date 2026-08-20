import { Test, TestingModule } from '@nestjs/testing';
import { PrintOrderItemController } from './print-order-item.controller';

describe('PrintOrderItemController', () => {
  let controller: PrintOrderItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrintOrderItemController],
    }).compile();

    controller = module.get<PrintOrderItemController>(PrintOrderItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
