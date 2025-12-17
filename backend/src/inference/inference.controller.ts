import { Controller, Post, Body } from "@nestjs/common";
import { InferenceService } from "./inference.service";

@Controller('inference')
export class InferenceController{
    constructor(
        private readonly inferenceService: InferenceService
    ){}

    @Post('frames')
    async handleFrames(@Body() body: {frames: string[]}){
        return await this.inferenceService.processFrames(body.frames)
    }
}