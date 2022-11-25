import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointCreateNestedManyWithoutPaddockInput } from "../inputs/GeoPointCreateNestedManyWithoutPaddockInput";

@TypeGraphQL.InputType("PaddockCreateWithoutGrazeInput", {
  isAbstract: true
})
export class PaddockCreateWithoutGrazeInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => GeoPointCreateNestedManyWithoutPaddockInput, {
    nullable: true
  })
  polygon?: GeoPointCreateNestedManyWithoutPaddockInput | undefined;
}
