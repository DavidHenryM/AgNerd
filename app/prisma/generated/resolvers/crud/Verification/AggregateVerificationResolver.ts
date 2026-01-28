import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateVerificationArgs } from "./args/AggregateVerificationArgs";
import { Verification } from "../../../models/Verification";
import { AggregateVerification } from "../../outputs/AggregateVerification";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Verification)
export class AggregateVerificationResolver {
  @TypeGraphQL.Query((_returns) => AggregateVerification, {
    nullable: false,
  })
  async aggregateVerification(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateVerificationArgs,
  ): Promise<AggregateVerification> {
    return getPrismaFromContext(ctx).verification.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
