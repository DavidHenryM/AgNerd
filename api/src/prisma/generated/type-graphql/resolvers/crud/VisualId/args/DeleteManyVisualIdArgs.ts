import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VisualIdWhereInput } from "../../../inputs/VisualIdWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyVisualIdArgs {
  @TypeGraphQL.Field(_type => VisualIdWhereInput, {
    nullable: true
  })
  where?: VisualIdWhereInput | undefined;
}
