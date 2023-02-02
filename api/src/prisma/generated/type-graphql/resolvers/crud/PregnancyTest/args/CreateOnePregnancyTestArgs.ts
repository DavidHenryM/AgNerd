import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PregnancyTestCreateInput } from "../../../inputs/PregnancyTestCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOnePregnancyTestArgs {
  @TypeGraphQL.Field(_type => PregnancyTestCreateInput, {
    nullable: false
  })
  data!: PregnancyTestCreateInput;
}
