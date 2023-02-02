import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VisualIdCreateInput } from "../../../inputs/VisualIdCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneVisualIdArgs {
  @TypeGraphQL.Field(_type => VisualIdCreateInput, {
    nullable: false
  })
  data!: VisualIdCreateInput;
}
