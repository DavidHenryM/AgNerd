import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstChemicalTreatmentArgs } from "./args/FindFirstChemicalTreatmentArgs";
import { ChemicalTreatment } from "../../../models/ChemicalTreatment";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => ChemicalTreatment)
export class FindFirstChemicalTreatmentResolver {
  @TypeGraphQL.Query((_returns) => ChemicalTreatment, {
    nullable: true,
  })
  async findFirstChemicalTreatment(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstChemicalTreatmentArgs,
  ): Promise<ChemicalTreatment | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).chemicalTreatment.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
