import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PaddockCreateManyInput } from "../../../inputs/PaddockCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyPaddockArgs {
  @TypeGraphQL.Field((_type) => [PaddockCreateManyInput], {
    nullable: false,
  })
  data!: PaddockCreateManyInput[];
}
