import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { SessionCreateInput } from "../../../inputs/SessionCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneSessionArgs {
  @TypeGraphQL.Field((_type) => SessionCreateInput, {
    nullable: false,
  })
  data!: SessionCreateInput;
}
