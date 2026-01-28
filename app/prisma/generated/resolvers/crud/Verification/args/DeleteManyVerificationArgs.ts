import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VerificationWhereInput } from "../../../inputs/VerificationWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyVerificationArgs {
  @TypeGraphQL.Field((_type) => VerificationWhereInput, {
    nullable: true,
  })
  where?: VerificationWhereInput | undefined;
}
