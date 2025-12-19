import { Controller, Post, Body } from "@nestjs/common";
import { InferenceService } from "./inference.service";
import { randomUUID } from "crypto";

@Controller('inference')
export class InferenceController {
    constructor(
        private readonly inferenceService: InferenceService
    ) { }

    @Post('frames')
    async handleFrames(@Body() body: { frames: string[] }) {
        const requestId = randomUUID();

        return this.inferenceService.processFrames(
            body.frames,
            requestId
        );
    }
}