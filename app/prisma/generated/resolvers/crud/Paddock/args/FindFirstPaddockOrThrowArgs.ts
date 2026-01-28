import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PaddockOrderByWithRelationInput } from "../../../inputs/PaddockOrderByWithRelationInput";
import { PaddockWhereInput } from "../../../inputs/PaddockWhereInput";
import { PaddockWhereUniqueInput } from "../../../inputs/PaddockWhereUniqueInput";
import { PaddockScalarFieldEnum } from "../../../../enums/PaddockScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstPaddockOrThrowArgs {
  @TypeGraphQL.Field((_type) => PaddockWhereInput, {
    nullable: true,
  })
  where?: PaddockWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [PaddockOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: PaddockOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => PaddockWhereUniqueInput, {
    nullable: true,
  })
  cursor?: PaddockWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;

  @TypeGraphQL.Field((_type) => [PaddockScalarFieldEnum], {
    nullable: true,
  })
  distinct?:
    | Array<"id" | "name" | "areaHa" | "livestockUnitPositionId">
    | undefined;
}
