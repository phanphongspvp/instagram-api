import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './model/category.model';
import { Model } from 'mongoose';
import { CategoryInput } from './dto/category.input';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

    async findAll(): Promise<Category[]> {
        const categories = await this.categoryModel.find().exec();
        return categories;
    }

    async findOne(id: string): Promise<Category> {
        const category = await this.categoryModel.findById(id).exec();
        return category;
    }

    create(category: CategoryInput): Promise<Category> {
        const categoryNew = new this.categoryModel(category);
        return categoryNew.save();
    }

    async update(id: string, category: CategoryInput): Promise<Category> {
        const categoryUpdate = await this.categoryModel.findByIdAndUpdate(id, category, { new: true });
        return categoryUpdate;
    }

    async delete(id: string): Promise<Category> {
        const category = await this.categoryModel.findByIdAndDelete(id);
        return category;
    }
}
