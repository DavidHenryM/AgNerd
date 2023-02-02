import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PregnancyTestOrderByWithRelationInput } from "../../../inputs/PregnancyTestOrderByWithRelationInput";
import { PregnancyTestWhereInput } from "../../../inputs/PregnancyTestWhereInput";
import { PregnancyTestWhereUniqueInput } from "../../../inputs/PregnancyTestWhereUniqueInput";
import { PregnancyTestScalarFieldEnum } from "../../../../enums/PregnancyTestScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class PregnancyPregnancyTestArgs {
  @TypeGraphQL.Field(_type => PregnancyTestWhereInput, {
    nullable: true
  })
  where?: PregnancyTestWhereInput | undefined;

  @TypeGraphQL.Field(_type => [PregnancyTestOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: PregnancyTestOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => PregnancyTestWhereUniqueInput, {
    nullable: true
  })
  cursor?: PregnancyTestWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [PregnancyTestScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "testDate" | "testType" | "resultDate" | "result" | "pregnancyId" | "cost"> | undefined;
}
