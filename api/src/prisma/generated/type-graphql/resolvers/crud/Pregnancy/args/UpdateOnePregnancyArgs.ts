import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PregnancyUpdateInput } from "../../../inputs/PregnancyUpdateInput";
import { PregnancyWhereUniqueInput } from "../../../inputs/PregnancyWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOnePregnancyArgs {
  @TypeGraphQL.Field(_type => PregnancyUpdateInput, {
    nullable: false
  })
  data!: PregnancyUpdateInput;

  @TypeGraphQL.Field(_type => PregnancyWhereUniqueInput, {
    nullable: false
  })
  where!: PregnancyWhereUniqueInput;
}
