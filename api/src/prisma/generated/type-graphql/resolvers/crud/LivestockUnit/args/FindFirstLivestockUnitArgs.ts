import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LivestockUnitOrderByWithRelationInput } from "../../../inputs/LivestockUnitOrderByWithRelationInput";
import { LivestockUnitWhereInput } from "../../../inputs/LivestockUnitWhereInput";
import { LivestockUnitWhereUniqueInput } from "../../../inputs/LivestockUnitWhereUniqueInput";
import { LivestockUnitScalarFieldEnum } from "../../../../enums/LivestockUnitScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstLivestockUnitArgs {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereInput, {
    nullable: true,
  })
  where?: LivestockUnitWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: LivestockUnitOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: true,
  })
  cursor?: LivestockUnitWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitScalarFieldEnum], {
    nullable: true,
  })
  distinct?:
    | Array<
        | "id"
        | "nlisid"
        | "class"
        | "name"
        | "comment"
        | "sex"
        | "birthdate"
        | "desexed"
        | "parentId"
        | "mobId"
        | "pregnancyId"
        | "drySheepEquivalent"
        | "purchasePrice"
        | "purchaseDate"
        | "angusTechId"
      >
    | undefined;
}
