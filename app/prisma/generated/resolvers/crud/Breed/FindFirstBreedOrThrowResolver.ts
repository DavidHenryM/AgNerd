import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstBreedOrThrowArgs } from "./args/FindFirstBreedOrThrowArgs";
import { Breed } from "../../../models/Breed";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Breed)
export class FindFirstBreedOrThrowResolver {
  @TypeGraphQL.Query((_returns) => Breed, {
    nullable: true,
  })
  async findFirstBreedOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstBreedOrThrowArgs,
  ): Promise<Breed | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).breed.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
