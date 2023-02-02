import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { BreedOrderByWithRelationInput } from "../../../inputs/BreedOrderByWithRelationInput";
import { BreedWhereInput } from "../../../inputs/BreedWhereInput";
import { BreedWhereUniqueInput } from "../../../inputs/BreedWhereUniqueInput";
import { BreedScalarFieldEnum } from "../../../../enums/BreedScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindManyBreedArgs {
  @TypeGraphQL.Field(_type => BreedWhereInput, {
    nullable: true
  })
  where?: BreedWhereInput | undefined;

  @TypeGraphQL.Field(_type => [BreedOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: BreedOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => BreedWhereUniqueInput, {
    nullable: true
  })
  cursor?: BreedWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [BreedScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "name" | "class" | "livestockUnitId"> | undefined;
}
