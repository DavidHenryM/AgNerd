import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GrazeCreateInput } from "../../../inputs/GrazeCreateInput";
import { GrazeUpdateInput } from "../../../inputs/GrazeUpdateInput";
import { GrazeWhereUniqueInput } from "../../../inputs/GrazeWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneGrazeArgs {
  @TypeGraphQL.Field((_type) => GrazeWhereUniqueInput, {
    nullable: false,
  })
  where!: GrazeWhereUniqueInput;

  @TypeGraphQL.Field((_type) => GrazeCreateInput, {
    nullable: false,
  })
  create!: GrazeCreateInput;

  @TypeGraphQL.Field((_type) => GrazeUpdateInput, {
    nullable: false,
  })
  update!: GrazeUpdateInput;
}
