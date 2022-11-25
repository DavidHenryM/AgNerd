import * as TypeGraphQL from "type-graphql";
import { Breed } from "../../../models/Breed";
import { LivestockUnit } from "../../../models/LivestockUnit";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Breed)
export class BreedRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => LivestockUnit, {
    nullable: true
  })
  async members(@TypeGraphQL.Root() breed: Breed, @TypeGraphQL.Ctx() ctx: any): Promise<LivestockUnit | null> {
    return getPrismaFromContext(ctx).breed.findUnique({
      where: {
        id: breed.id,
      },
    }).members({});
  }
}
