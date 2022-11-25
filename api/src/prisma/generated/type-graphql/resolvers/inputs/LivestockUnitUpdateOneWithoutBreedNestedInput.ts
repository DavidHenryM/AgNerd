import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutBreedInput } from "../inputs/LivestockUnitCreateOrConnectWithoutBreedInput";
import { LivestockUnitCreateWithoutBreedInput } from "../inputs/LivestockUnitCreateWithoutBreedInput";
import { LivestockUnitUpdateWithoutBreedInput } from "../inputs/LivestockUnitUpdateWithoutBreedInput";
import { LivestockUnitUpsertWithoutBreedInput } from "../inputs/LivestockUnitUpsertWithoutBreedInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitUpdateOneWithoutBreedNestedInput", {
  isAbstract: true
})
export class LivestockUnitUpdateOneWithoutBreedNestedInput {
  @TypeGraphQL.Field(_type => LivestockUnitCreateWithoutBreedInput, {
    nullable: true
  })
  create?: LivestockUnitCreateWithoutBreedInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitCreateOrConnectWithoutBreedInput, {
    nullable: true
  })
  connectOrCreate?: LivestockUnitCreateOrConnectWithoutBreedInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitUpsertWithoutBreedInput, {
    nullable: true
  })
  upsert?: LivestockUnitUpsertWithoutBreedInput | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  delete?: boolean | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitWhereUniqueInput, {
    nullable: true
  })
  connect?: LivestockUnitWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitUpdateWithoutBreedInput, {
    nullable: true
  })
  update?: LivestockUnitUpdateWithoutBreedInput | undefined;
}
