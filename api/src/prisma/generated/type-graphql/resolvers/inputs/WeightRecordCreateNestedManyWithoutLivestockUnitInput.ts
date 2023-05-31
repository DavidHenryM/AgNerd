import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { WeightRecordCreateManyLivestockUnitInputEnvelope } from "../inputs/WeightRecordCreateManyLivestockUnitInputEnvelope";
import { WeightRecordCreateOrConnectWithoutLivestockUnitInput } from "../inputs/WeightRecordCreateOrConnectWithoutLivestockUnitInput";
import { WeightRecordCreateWithoutLivestockUnitInput } from "../inputs/WeightRecordCreateWithoutLivestockUnitInput";
import { WeightRecordWhereUniqueInput } from "../inputs/WeightRecordWhereUniqueInput";

@TypeGraphQL.InputType(
  "WeightRecordCreateNestedManyWithoutLivestockUnitInput",
  {
    isAbstract: true,
  }
)
export class WeightRecordCreateNestedManyWithoutLivestockUnitInput {
  @TypeGraphQL.Field((_type) => [WeightRecordCreateWithoutLivestockUnitInput], {
    nullable: true,
  })
  create?: WeightRecordCreateWithoutLivestockUnitInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [WeightRecordCreateOrConnectWithoutLivestockUnitInput],
    {
      nullable: true,
    }
  )
  connectOrCreate?:
    | WeightRecordCreateOrConnectWithoutLivestockUnitInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => WeightRecordCreateManyLivestockUnitInputEnvelope,
    {
      nullable: true,
    }
  )
  createMany?: WeightRecordCreateManyLivestockUnitInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [WeightRecordWhereUniqueInput], {
    nullable: true,
  })
  connect?: WeightRecordWhereUniqueInput[] | undefined;
}
