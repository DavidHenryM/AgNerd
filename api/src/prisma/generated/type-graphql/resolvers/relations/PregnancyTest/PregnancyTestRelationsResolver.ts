import * as TypeGraphQL from "type-graphql";
import { Pregnancy } from "../../../models/Pregnancy";
import { PregnancyTest } from "../../../models/PregnancyTest";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => PregnancyTest)
export class PregnancyTestRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Pregnancy, {
    nullable: false
  })
  async pregnancy(@TypeGraphQL.Root() pregnancyTest: PregnancyTest, @TypeGraphQL.Ctx() ctx: any): Promise<Pregnancy> {
    return getPrismaFromContext(ctx).pregnancyTest.findUnique({
      where: {
        id: pregnancyTest.id,
      },
    }).pregnancy({});
  }
}
