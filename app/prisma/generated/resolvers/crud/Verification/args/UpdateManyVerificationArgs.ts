import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VerificationUpdateManyMutationInput } from "../../../inputs/VerificationUpdateManyMutationInput";
import { VerificationWhereInput } from "../../../inputs/VerificationWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyVerificationArgs {
  @TypeGraphQL.Field((_type) => VerificationUpdateManyMutationInput, {
    nullable: false,
  })
  data!: VerificationUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => VerificationWhereInput, {
    nullable: true,
  })
  where?: VerificationWhereInput | undefined;
}
