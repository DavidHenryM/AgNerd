import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointCreateManyPaddockInputEnvelope } from "../inputs/GeoPointCreateManyPaddockInputEnvelope";
import { GeoPointCreateOrConnectWithoutPaddockInput } from "../inputs/GeoPointCreateOrConnectWithoutPaddockInput";
import { GeoPointCreateWithoutPaddockInput } from "../inputs/GeoPointCreateWithoutPaddockInput";
import { GeoPointWhereUniqueInput } from "../inputs/GeoPointWhereUniqueInput";

@TypeGraphQL.InputType("GeoPointCreateNestedManyWithoutPaddockInput", {
  isAbstract: true,
})
export class GeoPointCreateNestedManyWithoutPaddockInput {
  @TypeGraphQL.Field((_type) => [GeoPointCreateWithoutPaddockInput], {
    nullable: true,
  })
  create?: GeoPointCreateWithoutPaddockInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GeoPointCreateOrConnectWithoutPaddockInput], {
    nullable: true,
  })
  connectOrCreate?: GeoPointCreateOrConnectWithoutPaddockInput[] | undefined;

  @TypeGraphQL.Field((_type) => GeoPointCreateManyPaddockInputEnvelope, {
    nullable: true,
  })
  createMany?: GeoPointCreateManyPaddockInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [GeoPointWhereUniqueInput], {
    nullable: true,
  })
  connect?: GeoPointWhereUniqueInput[] | undefined;
}
