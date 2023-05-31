import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LivestockUnitPositionWhereUniqueInput } from "../../../inputs/LivestockUnitPositionWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueLivestockUnitPositionArgs {
  @TypeGraphQL.Field((_type) => LivestockUnitPositionWhereUniqueInput, {
    nullable: false,
  })
  where!: LivestockUnitPositionWhereUniqueInput;
}
