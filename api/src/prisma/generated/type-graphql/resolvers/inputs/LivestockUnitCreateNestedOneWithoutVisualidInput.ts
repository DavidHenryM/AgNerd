import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutVisualidInput } from "../inputs/LivestockUnitCreateOrConnectWithoutVisualidInput";
import { LivestockUnitCreateWithoutVisualidInput } from "../inputs/LivestockUnitCreateWithoutVisualidInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitCreateNestedOneWithoutVisualidInput", {
  isAbstract: true,
})
export class LivestockUnitCreateNestedOneWithoutVisualidInput {
  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutVisualidInput, {
    nullable: true,
  })
  create?: LivestockUnitCreateWithoutVisualidInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitCreateOrConnectWithoutVisualidInput,
    {
      nullable: true,
    }
  )
  connectOrCreate?:
    | LivestockUnitCreateOrConnectWithoutVisualidInput
    | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: true,
  })
  connect?: LivestockUnitWhereUniqueInput | undefined;
}
