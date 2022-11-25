import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { MobCreateManyInput } from "../../../inputs/MobCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyMobArgs {
  @TypeGraphQL.Field(_type => [MobCreateManyInput], {
    nullable: false
  })
  data!: MobCreateManyInput[];
}
