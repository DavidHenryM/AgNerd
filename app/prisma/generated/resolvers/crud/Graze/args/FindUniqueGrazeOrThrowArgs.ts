import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GrazeWhereUniqueInput } from "../../../inputs/GrazeWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueGrazeOrThrowArgs {
  @TypeGraphQL.Field((_type) => GrazeWhereUniqueInput, {
    nullable: false,
  })
  where!: GrazeWhereUniqueInput;
}
