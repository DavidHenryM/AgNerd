import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LivestockUnitWhereInput } from "../../../inputs/LivestockUnitWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyLivestockUnitArgs {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereInput, {
    nullable: true,
  })
  where?: LivestockUnitWhereInput | undefined;
}
