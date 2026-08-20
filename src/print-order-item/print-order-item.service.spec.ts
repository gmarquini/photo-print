import { Test, TestingModule } from '@nestjs/testing';
import { PrintOrderItemService } from './print-order-item.service';

describe('PrintOrderItemService', () => {
  let service: PrintOrderItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrintOrderItemService],
    }).compile();

    service = module.get<PrintOrderItemService>(PrintOrderItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
