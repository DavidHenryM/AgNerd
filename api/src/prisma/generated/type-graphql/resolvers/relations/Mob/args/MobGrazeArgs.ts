import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GrazeOrderByWithRelationInput } from "../../../inputs/GrazeOrderByWithRelationInput";
import { GrazeWhereInput } from "../../../inputs/GrazeWhereInput";
import { GrazeWhereUniqueInput } from "../../../inputs/GrazeWhereUniqueInput";
import { GrazeScalarFieldEnum } from "../../../../enums/GrazeScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class MobGrazeArgs {
  @TypeGraphQL.Field((_type) => GrazeWhereInput, {
    nullable: true,
  })
  where?: GrazeWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [GrazeOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: GrazeOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => GrazeWhereUniqueInput, {
    nullable: true,
  })
  cursor?: GrazeWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;

  @TypeGraphQL.Field((_type) => [GrazeScalarFieldEnum], {
    nullable: true,
  })
  distinct?:
    | Array<
        | "id"
        | "startDatetime"
        | "endDateTime"
        | "paddockId"
        | "mobIds"
        | "dseDaysPerHectare"
      >
    | undefined;
}
