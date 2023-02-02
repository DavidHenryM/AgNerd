import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LivestockUnitPositionUpdateManyMutationInput } from "../../../inputs/LivestockUnitPositionUpdateManyMutationInput";
import { LivestockUnitPositionWhereInput } from "../../../inputs/LivestockUnitPositionWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyLivestockUnitPositionArgs {
  @TypeGraphQL.Field(_type => LivestockUnitPositionUpdateManyMutationInput, {
    nullable: false
  })
  data!: LivestockUnitPositionUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => LivestockUnitPositionWhereInput, {
    nullable: true
  })
  where?: LivestockUnitPositionWhereInput | undefined;
}
