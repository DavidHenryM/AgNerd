import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VisualIdOrderByWithRelationInput } from "../../../inputs/VisualIdOrderByWithRelationInput";
import { VisualIdWhereInput } from "../../../inputs/VisualIdWhereInput";
import { VisualIdWhereUniqueInput } from "../../../inputs/VisualIdWhereUniqueInput";
import { VisualIdScalarFieldEnum } from "../../../../enums/VisualIdScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstVisualIdArgs {
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

  @TypeGraphQL.Field((_type) => [VisualIdScalarFieldEnum], {
    nullable: true,
  })
  distinct?: Array<"id" | "livestockUnitId" | "colour" | "number"> | undefined;
}
