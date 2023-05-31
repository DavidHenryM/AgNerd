import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VisualIdOrderByWithRelationInput } from "../../../inputs/VisualIdOrderByWithRelationInput";
import { VisualIdWhereInput } from "../../../inputs/VisualIdWhereInput";
import { VisualIdWhereUniqueInput } from "../../../inputs/VisualIdWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateVisualIdArgs {
  @TypeGraphQL.Field((_type) => VisualIdWhereInput, {
    nullable: true,
  })
  where?: VisualIdWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [VisualIdOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: VisualIdOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => VisualIdWhereUniqueInput, {
    nullable: true,
  })
  cursor?: VisualIdWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}
