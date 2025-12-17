import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Event } from "./events.schema";


@Injectable()
export class EventsService {
    constructor(
        @InjectModel(Event.name)  //Conecta esse service à coleção events do MongoDB
        private readonly eventModel:  Model<Event>
    ) {}

    async saveEvent(data: {
        requestId: string;
        label: string;
        confidence: number;
    }) {
        return this.eventModel.create(data);
    }

    async countByLabel() {
        return this.eventModel.aggregate([
            {
                $group:{
                    _id: '$label',
                    total: {$sum: 1}
                },
            },
        ]);
    }
}