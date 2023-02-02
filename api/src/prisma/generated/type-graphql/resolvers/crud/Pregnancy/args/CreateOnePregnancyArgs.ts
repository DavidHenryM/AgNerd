import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PregnancyCreateInput } from "../../../inputs/PregnancyCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOnePregnancyArgs {
  @TypeGraphQL.Field(_type => PregnancyCreateInput, {
    nullable: false
  })
  data!: PregnancyCreateInput;
}
