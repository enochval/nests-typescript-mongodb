import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {

    @Prop({ type: mongoose.Schema.Types.String, required: true })
    email: string

    @Prop({ type: mongoose.Schema.Types.String, required: true })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)