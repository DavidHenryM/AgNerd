import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { MobOrderByWithRelationInput } from "../../../inputs/MobOrderByWithRelationInput";
import { MobWhereInput } from "../../../inputs/MobWhereInput";
import { MobWhereUniqueInput } from "../../../inputs/MobWhereUniqueInput";
import { MobScalarFieldEnum } from "../../../../enums/MobScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GrazeMobArgs {
  @TypeGraphQL.Field(_type => MobWhereInput, {
    nullable: true
  })
  where?: MobWhereInput | undefined;

  @TypeGraphQL.Field(_type => [MobOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: MobOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => MobWhereUniqueInput, {
    nullable: true
  })
  cursor?: MobWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [MobScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "name" | "comment" | "grazeIds"> | undefined;
}
