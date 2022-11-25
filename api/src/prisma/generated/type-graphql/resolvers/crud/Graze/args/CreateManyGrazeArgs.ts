import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GrazeCreateManyInput } from "../../../inputs/GrazeCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyGrazeArgs {
  @TypeGraphQL.Field(_type => [GrazeCreateManyInput], {
    nullable: false
  })
  data!: GrazeCreateManyInput[];
}
