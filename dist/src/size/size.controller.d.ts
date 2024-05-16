import { SizeService } from './size.service';
export declare class SizeController {
    private sizeService;
    constructor(sizeService: SizeService);
    getAll(): Promise<{
        id: string;
        name: string;
    }[]>;
}
