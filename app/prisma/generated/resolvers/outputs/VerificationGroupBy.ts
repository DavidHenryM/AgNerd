import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { VerificationCountAggregate } from "../outputs/VerificationCountAggregate";
import { VerificationMaxAggregate } from "../outputs/VerificationMaxAggregate";
import { VerificationMinAggregate } from "../outputs/VerificationMinAggregate";

@TypeGraphQL.ObjectType("VerificationGroupBy", {})
export class VerificationGroupBy {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  identifier!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  value!: string;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  expiresAt!: Date;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  createdAt!: Date;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  updatedAt!: Date;

  @TypeGraphQL.Field((_type) => VerificationCountAggregate, {
    nullable: true,
  })
  _count!: VerificationCountAggregate | null;

  @TypeGraphQL.Field((_type) => VerificationMinAggregate, {
    nullable: true,
  })
  _min!: VerificationMinAggregate | null;

  @TypeGraphQL.Field((_type) => VerificationMaxAggregate, {
    nullable: true,
  })
  _max!: VerificationMaxAggregate | null;
}
