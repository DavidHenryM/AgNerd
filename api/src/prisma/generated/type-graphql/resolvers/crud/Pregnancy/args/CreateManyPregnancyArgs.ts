import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PregnancyCreateManyInput } from "../../../inputs/PregnancyCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyPregnancyArgs {
  @TypeGraphQL.Field(_type => [PregnancyCreateManyInput], {
    nullable: false
  })
  data!: PregnancyCreateManyInput[];
}
