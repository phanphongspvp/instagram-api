import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Slider } from './model/slider.model';
import { Model } from 'mongoose';
import { SliderInput } from './dto/slider.input';

@Injectable()
export class SlidersService {
    constructor(@InjectModel(Slider.name) private sliderModel: Model<Slider>) {}

    async findAll(): Promise<Slider[]> {
        const sliders = await this.sliderModel.find().exec();
        return sliders;
    }

    async findOne(id: string): Promise<Slider> {
        const slider = await this.sliderModel.findById(id).exec();
        return slider;
    }

    create(slider: SliderInput): Promise<Slider> {
        const sliderNew = new this.sliderModel(slider);
        return sliderNew.save();
    }

    async update(id: string, slider: SliderInput): Promise<Slider> {
        const sliderUpdate = await this.sliderModel.findByIdAndUpdate(id, slider, { new: true });
        return sliderUpdate;
    }

    async delete(id: string): Promise<Slider> {
        const slider = await this.sliderModel.findByIdAndDelete(id);
        return slider;
    }
}