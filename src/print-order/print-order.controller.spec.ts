import { Test, TestingModule } from '@nestjs/testing';
import { PrintOrderController } from './print-order.controller';

describe('PrintOrderController', () => {
  let controller: PrintOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrintOrderController],
    }).compile();

    controller = module.get<PrintOrderController>(PrintOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
