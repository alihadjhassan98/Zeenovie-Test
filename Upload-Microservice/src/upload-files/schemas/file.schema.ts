import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class File {
    @Prop()
    IdUser: string;
    @Prop()
    name: string;

    @Prop()
    data: string; // store the file as a base64 string

    @Prop()
    contentType: string;



    get filedata(): Buffer {
        return Buffer.from(this.data, 'base64');
    }

    static updateFile(file: File, newData: string) {
        file.data = newData;
    }
}

export type FileDocument = File & Document;

export const FileSchema = SchemaFactory.createForClass(File);
