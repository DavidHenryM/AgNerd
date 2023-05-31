import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PregnancyWhereUniqueInput } from "../../../inputs/PregnancyWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class DeleteOnePregnancyArgs {
  @TypeGraphQL.Field((_type) => PregnancyWhereUniqueInput, {
    nullable: false,
  })
  where!: PregnancyWhereUniqueInput;
}
