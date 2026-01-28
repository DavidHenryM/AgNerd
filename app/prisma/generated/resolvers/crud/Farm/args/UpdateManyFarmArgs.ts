import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FarmUpdateManyMutationInput } from "../../../inputs/FarmUpdateManyMutationInput";
import { FarmWhereInput } from "../../../inputs/FarmWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyFarmArgs {
  @TypeGraphQL.Field((_type) => FarmUpdateManyMutationInput, {
    nullable: false,
  })
  data!: FarmUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => FarmWhereInput, {
    nullable: true,
  })
  where?: FarmWhereInput | undefined;
}
