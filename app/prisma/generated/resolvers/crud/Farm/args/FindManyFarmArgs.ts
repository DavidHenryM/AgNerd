import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FarmOrderByWithRelationInput } from "../../../inputs/FarmOrderByWithRelationInput";
import { FarmWhereInput } from "../../../inputs/FarmWhereInput";
import { FarmWhereUniqueInput } from "../../../inputs/FarmWhereUniqueInput";
import { FarmScalarFieldEnum } from "../../../../enums/FarmScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindManyFarmArgs {
  @TypeGraphQL.Field((_type) => FarmWhereInput, {
    nullable: true,
  })
  where?: FarmWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [FarmOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: FarmOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => FarmWhereUniqueInput, {
    nullable: true,
  })
  cursor?: FarmWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;

  @TypeGraphQL.Field((_type) => [FarmScalarFieldEnum], {
    nullable: true,
  })
  distinct?:
    | Array<
        | "id"
        | "name"
        | "businessName"
        | "lotSectionPlan"
        | "abn"
        | "acn"
        | "pic"
      >
    | undefined;
}
