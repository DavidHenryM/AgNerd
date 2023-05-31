import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { MobUpdateManyMutationInput } from "../../../inputs/MobUpdateManyMutationInput";
import { MobWhereInput } from "../../../inputs/MobWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyMobArgs {
  @TypeGraphQL.Field((_type) => MobUpdateManyMutationInput, {
    nullable: false,
  })
  data!: MobUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => MobWhereInput, {
    nullable: true,
  })
  where?: MobWhereInput | undefined;
}
