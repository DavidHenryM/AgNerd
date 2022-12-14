import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LivestockUnitWhereUniqueInput } from "../../../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class DeleteOneLivestockUnitArgs {
  @TypeGraphQL.Field(_type => LivestockUnitWhereUniqueInput, {
    nullable: false
  })
  where!: LivestockUnitWhereUniqueInput;
}
