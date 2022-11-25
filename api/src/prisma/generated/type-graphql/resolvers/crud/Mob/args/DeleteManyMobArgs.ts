import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { MobWhereInput } from "../../../inputs/MobWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyMobArgs {
  @TypeGraphQL.Field(_type => MobWhereInput, {
    nullable: true
  })
  where?: MobWhereInput | undefined;
}
