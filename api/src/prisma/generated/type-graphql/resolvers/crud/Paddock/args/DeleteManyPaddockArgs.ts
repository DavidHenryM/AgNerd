import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PaddockWhereInput } from "../../../inputs/PaddockWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyPaddockArgs {
  @TypeGraphQL.Field((_type) => PaddockWhereInput, {
    nullable: true,
  })
  where?: PaddockWhereInput | undefined;
}
