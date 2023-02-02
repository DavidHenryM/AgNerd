import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { CreateOneChemicalTreatmentArgs } from "./args/CreateOneChemicalTreatmentArgs";
import { ChemicalTreatment } from "../../../models/ChemicalTreatment";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ChemicalTreatment)
export class CreateOneChemicalTreatmentResolver {
  @TypeGraphQL.Mutation(_returns => ChemicalTreatment, {
    nullable: false
  })
  async createOneChemicalTreatment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateOneChemicalTreatmentArgs): Promise<ChemicalTreatment> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).chemicalTreatment.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
