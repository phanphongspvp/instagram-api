import { Module } from '@nestjs/common';
import { SlidersController } from './sliders.controller';
import { SlidersService } from './sliders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Slider, SliderModel } from './model/slider.model';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Slider.name, schema: SliderModel }]) ],
  controllers: [SlidersController],
  providers: [SlidersService]
})
export class SlidersModule {}
