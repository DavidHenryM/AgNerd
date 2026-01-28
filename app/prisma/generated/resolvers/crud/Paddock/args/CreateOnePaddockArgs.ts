import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PaddockCreateInput } from "../../../inputs/PaddockCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOnePaddockArgs {
  @TypeGraphQL.Field((_type) => PaddockCreateInput, {
    nullable: false,
  })
  data!: PaddockCreateInput;
}
