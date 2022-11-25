import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LivestockUnitUpdateManyMutationInput } from "../../../inputs/LivestockUnitUpdateManyMutationInput";
import { LivestockUnitWhereInput } from "../../../inputs/LivestockUnitWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyLivestockUnitArgs {
  @TypeGraphQL.Field(_type => LivestockUnitUpdateManyMutationInput, {
    nullable: false
  })
  data!: LivestockUnitUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => LivestockUnitWhereInput, {
    nullable: true
  })
  where?: LivestockUnitWhereInput | undefined;
}
