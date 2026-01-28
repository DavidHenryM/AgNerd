import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindUniqueChemicalTreatmentOrThrowArgs } from "./args/FindUniqueChemicalTreatmentOrThrowArgs";
import { ChemicalTreatment } from "../../../models/ChemicalTreatment";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => ChemicalTreatment)
export class FindUniqueChemicalTreatmentOrThrowResolver {
  @TypeGraphQL.Query((_returns) => ChemicalTreatment, {
    nullable: true,
  })
  async getChemicalTreatment(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueChemicalTreatmentOrThrowArgs,
  ): Promise<ChemicalTreatment | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).chemicalTreatment.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
