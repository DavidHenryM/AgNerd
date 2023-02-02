import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VisualIdUpdateInput } from "../../../inputs/VisualIdUpdateInput";
import { VisualIdWhereUniqueInput } from "../../../inputs/VisualIdWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneVisualIdArgs {
  @TypeGraphQL.Field(_type => VisualIdUpdateInput, {
    nullable: false
  })
  data!: VisualIdUpdateInput;

  @TypeGraphQL.Field(_type => VisualIdWhereUniqueInput, {
    nullable: false
  })
  where!: VisualIdWhereUniqueInput;
}
