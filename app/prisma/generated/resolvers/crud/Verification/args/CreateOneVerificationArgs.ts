import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VerificationCreateInput } from "../../../inputs/VerificationCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneVerificationArgs {
  @TypeGraphQL.Field((_type) => VerificationCreateInput, {
    nullable: false,
  })
  data!: VerificationCreateInput;
}
