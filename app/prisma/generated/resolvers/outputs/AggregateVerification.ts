import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { VerificationCountAggregate } from "../outputs/VerificationCountAggregate";
import { VerificationMaxAggregate } from "../outputs/VerificationMaxAggregate";
import { VerificationMinAggregate } from "../outputs/VerificationMinAggregate";

@TypeGraphQL.ObjectType("AggregateVerification", {})
export class AggregateVerification {
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
