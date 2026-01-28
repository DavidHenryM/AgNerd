import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PaddockCreateInput } from "../../../inputs/PaddockCreateInput";
import { PaddockUpdateInput } from "../../../inputs/PaddockUpdateInput";
import { PaddockWhereUniqueInput } from "../../../inputs/PaddockWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOnePaddockArgs {
  @TypeGraphQL.Field((_type) => PaddockWhereUniqueInput, {
    nullable: false,
  })
  where!: PaddockWhereUniqueInput;

  @TypeGraphQL.Field((_type) => PaddockCreateInput, {
    nullable: false,
  })
  create!: PaddockCreateInput;

  @TypeGraphQL.Field((_type) => PaddockUpdateInput, {
    nullable: false,
  })
  update!: PaddockUpdateInput;
}
