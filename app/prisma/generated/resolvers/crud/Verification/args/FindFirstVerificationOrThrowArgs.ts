import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VerificationOrderByWithRelationInput } from "../../../inputs/VerificationOrderByWithRelationInput";
import { VerificationWhereInput } from "../../../inputs/VerificationWhereInput";
import { VerificationWhereUniqueInput } from "../../../inputs/VerificationWhereUniqueInput";
import { VerificationScalarFieldEnum } from "../../../../enums/VerificationScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstVerificationOrThrowArgs {
  @TypeGraphQL.Field((_type) => VerificationWhereInput, {
    nullable: true,
  })
  where?: VerificationWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [VerificationOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: VerificationOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => VerificationWhereUniqueInput, {
    nullable: true,
  })
  cursor?: VerificationWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;

  @TypeGraphQL.Field((_type) => [VerificationScalarFieldEnum], {
    nullable: true,
  })
  distinct?:
    | Array<
        "id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt"
      >
    | undefined;
}
