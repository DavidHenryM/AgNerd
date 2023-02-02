import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PregnancyTestCreateInput } from "../../../inputs/PregnancyTestCreateInput";
import { PregnancyTestUpdateInput } from "../../../inputs/PregnancyTestUpdateInput";
import { PregnancyTestWhereUniqueInput } from "../../../inputs/PregnancyTestWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOnePregnancyTestArgs {
  @TypeGraphQL.Field(_type => PregnancyTestWhereUniqueInput, {
    nullable: false
  })
  where!: PregnancyTestWhereUniqueInput;

  @TypeGraphQL.Field(_type => PregnancyTestCreateInput, {
    nullable: false
  })
  create!: PregnancyTestCreateInput;

  @TypeGraphQL.Field(_type => PregnancyTestUpdateInput, {
    nullable: false
  })
  update!: PregnancyTestUpdateInput;
}
