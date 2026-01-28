import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateChemicalTreatmentArgs } from "./args/AggregateChemicalTreatmentArgs";
import { ChemicalTreatment } from "../../../models/ChemicalTreatment";
import { AggregateChemicalTreatment } from "../../outputs/AggregateChemicalTreatment";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => ChemicalTreatment)
export class AggregateChemicalTreatmentResolver {
  @TypeGraphQL.Query((_returns) => AggregateChemicalTreatment, {
    nullable: false,
  })
  async aggregateChemicalTreatment(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateChemicalTreatmentArgs,
  ): Promise<AggregateChemicalTreatment> {
    return getPrismaFromContext(ctx).chemicalTreatment.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
