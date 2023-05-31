import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { Pregnancy } from "../../../models/Pregnancy";
import { PregnancyTest } from "../../../models/PregnancyTest";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => PregnancyTest)
export class PregnancyTestRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => Pregnancy, {
    nullable: false,
  })
  async pregnancy(
    @TypeGraphQL.Root() pregnancyTest: PregnancyTest,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo
  ): Promise<Pregnancy> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .pregnancyTest.findUniqueOrThrow({
        where: {
          id: pregnancyTest.id,
        },
      })
      .pregnancy({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}
