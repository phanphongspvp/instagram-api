import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category, CategoryModel } from './model/category.model';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Category.name, schema: CategoryModel }]) ],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
