import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VerificationUpdateInput } from "../../../inputs/VerificationUpdateInput";
import { VerificationWhereUniqueInput } from "../../../inputs/VerificationWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneVerificationArgs {
  @TypeGraphQL.Field((_type) => VerificationUpdateInput, {
    nullable: false,
  })
  data!: VerificationUpdateInput;

  @TypeGraphQL.Field((_type) => VerificationWhereUniqueInput, {
    nullable: false,
  })
  where!: VerificationWhereUniqueInput;
}
