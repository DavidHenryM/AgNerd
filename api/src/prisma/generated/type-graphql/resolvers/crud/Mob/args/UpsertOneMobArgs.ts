import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { MobCreateInput } from "../../../inputs/MobCreateInput";
import { MobUpdateInput } from "../../../inputs/MobUpdateInput";
import { MobWhereUniqueInput } from "../../../inputs/MobWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneMobArgs {
  @TypeGraphQL.Field(_type => MobWhereUniqueInput, {
    nullable: false
  })
  where!: MobWhereUniqueInput;

  @TypeGraphQL.Field(_type => MobCreateInput, {
    nullable: false
  })
  create!: MobCreateInput;

  @TypeGraphQL.Field(_type => MobUpdateInput, {
    nullable: false
  })
  update!: MobUpdateInput;
}
