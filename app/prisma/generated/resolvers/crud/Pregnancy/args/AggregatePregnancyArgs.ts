import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PregnancyOrderByWithRelationInput } from "../../../inputs/PregnancyOrderByWithRelationInput";
import { PregnancyWhereInput } from "../../../inputs/PregnancyWhereInput";
import { PregnancyWhereUniqueInput } from "../../../inputs/PregnancyWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregatePregnancyArgs {
  @TypeGraphQL.Field((_type) => PregnancyWhereInput, {
    nullable: true,
  })
  where?: PregnancyWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: PregnancyOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => PregnancyWhereUniqueInput, {
    nullable: true,
  })
  cursor?: PregnancyWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}
