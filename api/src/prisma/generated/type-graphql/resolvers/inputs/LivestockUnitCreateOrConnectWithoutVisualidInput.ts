import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutVisualidInput } from "../inputs/LivestockUnitCreateWithoutVisualidInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitCreateOrConnectWithoutVisualidInput", {
  isAbstract: true,
})
export class LivestockUnitCreateOrConnectWithoutVisualidInput {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: false,
  })
  where!: LivestockUnitWhereUniqueInput;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutVisualidInput, {
    nullable: false,
  })
  create!: LivestockUnitCreateWithoutVisualidInput;
}
