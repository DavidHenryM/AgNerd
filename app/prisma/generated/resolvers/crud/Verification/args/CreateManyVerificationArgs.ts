import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VerificationCreateManyInput } from "../../../inputs/VerificationCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyVerificationArgs {
  @TypeGraphQL.Field((_type) => [VerificationCreateManyInput], {
    nullable: false,
  })
  data!: VerificationCreateManyInput[];
}
