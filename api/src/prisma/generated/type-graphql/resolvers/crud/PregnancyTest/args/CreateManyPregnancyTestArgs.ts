import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PregnancyTestCreateManyInput } from "../../../inputs/PregnancyTestCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyPregnancyTestArgs {
  @TypeGraphQL.Field(_type => [PregnancyTestCreateManyInput], {
    nullable: false
  })
  data!: PregnancyTestCreateManyInput[];
}
