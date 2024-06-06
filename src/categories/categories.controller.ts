import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryInput } from './dto/category.input';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) {}

    @Get()
    getAll() {
        return this.categoryService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.categoryService.findOne(id);
    }

    @Post()
    create(@Body() category: CategoryInput) {
        return this.categoryService.create(category);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() category: CategoryInput) {
        return this.categoryService.update(id, category);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.categoryService.delete(id);
    }
}
