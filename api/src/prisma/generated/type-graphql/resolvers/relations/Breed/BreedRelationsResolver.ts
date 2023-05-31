import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { Breed } from "../../../models/Breed";
import { LivestockUnit } from "../../../models/LivestockUnit";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Breed)
export class BreedRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => LivestockUnit, {
    nullable: true,
  })
  async members(
    @TypeGraphQL.Root() breed: Breed,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo
  ): Promise<LivestockUnit | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .breed.findUniqueOrThrow({
        where: {
          id: breed.id,
        },
      })
      .members({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}
