import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VerificationWhereUniqueInput } from "../../../inputs/VerificationWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueVerificationArgs {
  @TypeGraphQL.Field((_type) => VerificationWhereUniqueInput, {
    nullable: false,
  })
  where!: VerificationWhereUniqueInput;
}
