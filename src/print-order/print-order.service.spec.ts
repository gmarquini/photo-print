import { Test, TestingModule } from '@nestjs/testing';
import { PrintOrderService } from './print-order.service';

describe('PrintOrderService', () => {
  let service: PrintOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrintOrderService],
    }).compile();

    service = module.get<PrintOrderService>(PrintOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
