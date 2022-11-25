import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LivestockUnitOrderByWithRelationInput } from "../../../inputs/LivestockUnitOrderByWithRelationInput";
import { LivestockUnitWhereInput } from "../../../inputs/LivestockUnitWhereInput";
import { LivestockUnitWhereUniqueInput } from "../../../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateLivestockUnitArgs {
  @TypeGraphQL.Field(_type => LivestockUnitWhereInput, {
    nullable: true
  })
  where?: LivestockUnitWhereInput | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: LivestockUnitOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitWhereUniqueInput, {
    nullable: true
  })
  cursor?: LivestockUnitWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
