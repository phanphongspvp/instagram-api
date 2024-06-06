import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SlidersService } from './sliders.service';
import { SliderInput } from './dto/slider.input';

@Controller('sliders')
export class SlidersController {
    constructor(private readonly sliderService: SlidersService) {}

    @Get()
    findAll() {
        return this.sliderService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.sliderService.findOne(id);
    }

    @Post()
    create(@Body() slider: SliderInput) {
        return this.sliderService.create(slider);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() slider: SliderInput) {
        return this.sliderService.update(id, slider);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.sliderService.delete(id);
    }
}
