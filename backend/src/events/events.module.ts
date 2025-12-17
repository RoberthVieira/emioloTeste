import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Event, EventSchema } from "./events.schema";
import { EventsService } from "./events.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Event.name, schema: EventSchema}
        ]),
    ],
    providers: [EventsService],
    exports: [EventsService], //Linha que permite que outros módulos usem esse service
})

export class EventsModule {}