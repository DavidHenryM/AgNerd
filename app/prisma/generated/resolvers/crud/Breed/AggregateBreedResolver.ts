import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateBreedArgs } from "./args/AggregateBreedArgs";
import { Breed } from "../../../models/Breed";
import { AggregateBreed } from "../../outputs/AggregateBreed";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Breed)
export class AggregateBreedResolver {
  @TypeGraphQL.Query((_returns) => AggregateBreed, {
    nullable: false,
  })
  async aggregateBreed(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateBreedArgs,
  ): Promise<AggregateBreed> {
    return getPrismaFromContext(ctx).breed.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
