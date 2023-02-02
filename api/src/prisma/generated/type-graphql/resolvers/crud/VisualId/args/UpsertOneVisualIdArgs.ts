import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VisualIdCreateInput } from "../../../inputs/VisualIdCreateInput";
import { VisualIdUpdateInput } from "../../../inputs/VisualIdUpdateInput";
import { VisualIdWhereUniqueInput } from "../../../inputs/VisualIdWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneVisualIdArgs {
  @TypeGraphQL.Field(_type => VisualIdWhereUniqueInput, {
    nullable: false
  })
  where!: VisualIdWhereUniqueInput;

  @TypeGraphQL.Field(_type => VisualIdCreateInput, {
    nullable: false
  })
  create!: VisualIdCreateInput;

  @TypeGraphQL.Field(_type => VisualIdUpdateInput, {
    nullable: false
  })
  update!: VisualIdUpdateInput;
}
