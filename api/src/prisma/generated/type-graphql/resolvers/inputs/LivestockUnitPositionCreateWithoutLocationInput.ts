import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockCreateNestedOneWithoutLivestockUnitPositionInput } from "../inputs/PaddockCreateNestedOneWithoutLivestockUnitPositionInput";

@TypeGraphQL.InputType("LivestockUnitPositionCreateWithoutLocationInput", {
  isAbstract: true,
})
export class LivestockUnitPositionCreateWithoutLocationInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  date!: Date;

  @TypeGraphQL.Field(
    (_type) => PaddockCreateNestedOneWithoutLivestockUnitPositionInput,
    {
      nullable: true,
    }
  )
  paddock?: PaddockCreateNestedOneWithoutLivestockUnitPositionInput | undefined;
}
