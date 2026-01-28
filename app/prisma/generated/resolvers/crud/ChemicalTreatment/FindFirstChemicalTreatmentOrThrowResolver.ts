import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstChemicalTreatmentOrThrowArgs } from "./args/FindFirstChemicalTreatmentOrThrowArgs";
import { ChemicalTreatment } from "../../../models/ChemicalTreatment";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => ChemicalTreatment)
export class FindFirstChemicalTreatmentOrThrowResolver {
  @TypeGraphQL.Query((_returns) => ChemicalTreatment, {
    nullable: true,
  })
  async findFirstChemicalTreatmentOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstChemicalTreatmentOrThrowArgs,
  ): Promise<ChemicalTreatment | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).chemicalTreatment.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
