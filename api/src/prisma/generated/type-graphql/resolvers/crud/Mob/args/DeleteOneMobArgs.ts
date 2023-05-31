import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { MobWhereUniqueInput } from "../../../inputs/MobWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class DeleteOneMobArgs {
  @TypeGraphQL.Field((_type) => MobWhereUniqueInput, {
    nullable: false,
  })
  where!: MobWhereUniqueInput;
}
