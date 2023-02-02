import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PregnancyTestWhereUniqueInput } from "../../../inputs/PregnancyTestWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniquePregnancyTestArgs {
  @TypeGraphQL.Field(_type => PregnancyTestWhereUniqueInput, {
    nullable: false
  })
  where!: PregnancyTestWhereUniqueInput;
}
