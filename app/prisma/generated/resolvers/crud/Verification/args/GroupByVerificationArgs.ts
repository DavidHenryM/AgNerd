import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VerificationOrderByWithAggregationInput } from "../../../inputs/VerificationOrderByWithAggregationInput";
import { VerificationScalarWhereWithAggregatesInput } from "../../../inputs/VerificationScalarWhereWithAggregatesInput";
import { VerificationWhereInput } from "../../../inputs/VerificationWhereInput";
import { VerificationScalarFieldEnum } from "../../../../enums/VerificationScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByVerificationArgs {
  @TypeGraphQL.Field((_type) => VerificationWhereInput, {
    nullable: true,
  })
  where?: VerificationWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [VerificationOrderByWithAggregationInput], {
    nullable: true,
  })
  orderBy?: VerificationOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [VerificationScalarFieldEnum], {
    nullable: false,
  })
  by!: Array<
    "id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt"
  >;

  @TypeGraphQL.Field((_type) => VerificationScalarWhereWithAggregatesInput, {
    nullable: true,
  })
  having?: VerificationScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}
