import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PregnancyTestUpdateInput } from "../../../inputs/PregnancyTestUpdateInput";
import { PregnancyTestWhereUniqueInput } from "../../../inputs/PregnancyTestWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOnePregnancyTestArgs {
  @TypeGraphQL.Field(_type => PregnancyTestUpdateInput, {
    nullable: false
  })
  data!: PregnancyTestUpdateInput;

  @TypeGraphQL.Field(_type => PregnancyTestWhereUniqueInput, {
    nullable: false
  })
  where!: PregnancyTestWhereUniqueInput;
}
