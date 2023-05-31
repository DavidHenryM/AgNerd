import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { MobUpdateInput } from "../../../inputs/MobUpdateInput";
import { MobWhereUniqueInput } from "../../../inputs/MobWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneMobArgs {
  @TypeGraphQL.Field((_type) => MobUpdateInput, {
    nullable: false,
  })
  data!: MobUpdateInput;

  @TypeGraphQL.Field((_type) => MobWhereUniqueInput, {
    nullable: false,
  })
  where!: MobWhereUniqueInput;
}
