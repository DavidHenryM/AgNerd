import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutBreedInput } from "../inputs/LivestockUnitCreateOrConnectWithoutBreedInput";
import { LivestockUnitCreateWithoutBreedInput } from "../inputs/LivestockUnitCreateWithoutBreedInput";
import { LivestockUnitUpdateToOneWithWhereWithoutBreedInput } from "../inputs/LivestockUnitUpdateToOneWithWhereWithoutBreedInput";
import { LivestockUnitUpsertWithoutBreedInput } from "../inputs/LivestockUnitUpsertWithoutBreedInput";
import { LivestockUnitWhereInput } from "../inputs/LivestockUnitWhereInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitUpdateOneWithoutBreedNestedInput", {})
export class LivestockUnitUpdateOneWithoutBreedNestedInput {
  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutBreedInput, {
    nullable: true,
  })
  create?: LivestockUnitCreateWithoutBreedInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateOrConnectWithoutBreedInput, {
    nullable: true,
  })
  connectOrCreate?: LivestockUnitCreateOrConnectWithoutBreedInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitUpsertWithoutBreedInput, {
    nullable: true,
  })
  upsert?: LivestockUnitUpsertWithoutBreedInput | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereInput, {
    nullable: true,
  })
  delete?: LivestockUnitWhereInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: true,
  })
  connect?: LivestockUnitWhereUniqueInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitUpdateToOneWithWhereWithoutBreedInput,
    {
      nullable: true,
    },
  )
  update?: LivestockUnitUpdateToOneWithWhereWithoutBreedInput | undefined;
}
