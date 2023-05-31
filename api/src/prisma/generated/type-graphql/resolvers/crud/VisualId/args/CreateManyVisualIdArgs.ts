import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VisualIdCreateManyInput } from "../../../inputs/VisualIdCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyVisualIdArgs {
  @TypeGraphQL.Field((_type) => [VisualIdCreateManyInput], {
    nullable: false,
  })
  data!: VisualIdCreateManyInput[];
}
