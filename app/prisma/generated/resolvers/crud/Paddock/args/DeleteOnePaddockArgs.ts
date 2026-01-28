import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PaddockWhereUniqueInput } from "../../../inputs/PaddockWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class DeleteOnePaddockArgs {
  @TypeGraphQL.Field((_type) => PaddockWhereUniqueInput, {
    nullable: false,
  })
  where!: PaddockWhereUniqueInput;
}
