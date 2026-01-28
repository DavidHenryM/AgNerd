import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { MobCreateInput } from "../../../inputs/MobCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneMobArgs {
  @TypeGraphQL.Field((_type) => MobCreateInput, {
    nullable: true,
  })
  data?: MobCreateInput | undefined;
}
