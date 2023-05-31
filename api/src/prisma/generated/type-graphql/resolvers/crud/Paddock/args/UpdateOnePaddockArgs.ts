import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PaddockUpdateInput } from "../../../inputs/PaddockUpdateInput";
import { PaddockWhereUniqueInput } from "../../../inputs/PaddockWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOnePaddockArgs {
  @TypeGraphQL.Field((_type) => PaddockUpdateInput, {
    nullable: false,
  })
  data!: PaddockUpdateInput;

  @TypeGraphQL.Field((_type) => PaddockWhereUniqueInput, {
    nullable: false,
  })
  where!: PaddockWhereUniqueInput;
}
