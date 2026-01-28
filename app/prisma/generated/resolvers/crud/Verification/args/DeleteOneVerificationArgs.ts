import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VerificationWhereUniqueInput } from "../../../inputs/VerificationWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class DeleteOneVerificationArgs {
  @TypeGraphQL.Field((_type) => VerificationWhereUniqueInput, {
    nullable: false,
  })
  where!: VerificationWhereUniqueInput;
}
