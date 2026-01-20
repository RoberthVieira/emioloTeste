import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

import { InferenceService } from "./inference.service";
import { randomUUID } from "crypto";

@Controller('inference')
export class InferenceController {
    constructor(
        private readonly inferenceService: InferenceService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('frames')
    async handleFrames(@Body() body: { frames: string[] }) {
        const requestId = randomUUID();

        return this.inferenceService.processFrames(
            body.frames,
            requestId
        );
    }
}