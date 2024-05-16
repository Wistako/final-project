import { CategoryService } from './category.service';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    getAll(): Promise<{
        id: string;
        name: string;
    }[]>;
}
