//Ferramentas do Nest para transformar uma classe em schema do MongoDB
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Event extends Document {

    @Prop({ required: true })
    requestId: string;

    @Prop({ required: true })
    frameId: string;

    @Prop({ required: true })
    label: string;

    @Prop({ required: true })
    confidence: number;

    @Prop({ required: true })
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';

    @Prop({ required: true })
    timestamp: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event); //Converte a classe em algo que o MongoDB vai entender