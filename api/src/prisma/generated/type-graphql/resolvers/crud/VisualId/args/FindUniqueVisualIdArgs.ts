import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VisualIdWhereUniqueInput } from "../../../inputs/VisualIdWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueVisualIdArgs {
  @TypeGraphQL.Field((_type) => VisualIdWhereUniqueInput, {
    nullable: false,
  })
  where!: VisualIdWhereUniqueInput;
}
