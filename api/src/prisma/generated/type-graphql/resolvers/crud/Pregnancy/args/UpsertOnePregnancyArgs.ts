import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PregnancyCreateInput } from "../../../inputs/PregnancyCreateInput";
import { PregnancyUpdateInput } from "../../../inputs/PregnancyUpdateInput";
import { PregnancyWhereUniqueInput } from "../../../inputs/PregnancyWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOnePregnancyArgs {
  @TypeGraphQL.Field((_type) => PregnancyWhereUniqueInput, {
    nullable: false,
  })
  where!: PregnancyWhereUniqueInput;

  @TypeGraphQL.Field((_type) => PregnancyCreateInput, {
    nullable: false,
  })
  create!: PregnancyCreateInput;

  @TypeGraphQL.Field((_type) => PregnancyUpdateInput, {
    nullable: false,
  })
  update!: PregnancyUpdateInput;
}
