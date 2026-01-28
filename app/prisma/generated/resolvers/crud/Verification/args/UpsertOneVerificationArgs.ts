import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VerificationCreateInput } from "../../../inputs/VerificationCreateInput";
import { VerificationUpdateInput } from "../../../inputs/VerificationUpdateInput";
import { VerificationWhereUniqueInput } from "../../../inputs/VerificationWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneVerificationArgs {
  @TypeGraphQL.Field((_type) => VerificationWhereUniqueInput, {
    nullable: false,
  })
  where!: VerificationWhereUniqueInput;

  @TypeGraphQL.Field((_type) => VerificationCreateInput, {
    nullable: false,
  })
  create!: VerificationCreateInput;

  @TypeGraphQL.Field((_type) => VerificationUpdateInput, {
    nullable: false,
  })
  update!: VerificationUpdateInput;
}
