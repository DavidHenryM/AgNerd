import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VisualIdUpdateManyMutationInput } from "../../../inputs/VisualIdUpdateManyMutationInput";
import { VisualIdWhereInput } from "../../../inputs/VisualIdWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyVisualIdArgs {
  @TypeGraphQL.Field((_type) => VisualIdUpdateManyMutationInput, {
    nullable: false,
  })
  data!: VisualIdUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => VisualIdWhereInput, {
    nullable: true,
  })
  where?: VisualIdWhereInput | undefined;
}
