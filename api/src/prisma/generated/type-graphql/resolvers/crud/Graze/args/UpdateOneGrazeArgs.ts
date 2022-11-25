import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GrazeUpdateInput } from "../../../inputs/GrazeUpdateInput";
import { GrazeWhereUniqueInput } from "../../../inputs/GrazeWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneGrazeArgs {
  @TypeGraphQL.Field(_type => GrazeUpdateInput, {
    nullable: false
  })
  data!: GrazeUpdateInput;

  @TypeGraphQL.Field(_type => GrazeWhereUniqueInput, {
    nullable: false
  })
  where!: GrazeWhereUniqueInput;
}
