import { ClassType } from "type-graphql";
import * as tslib from "tslib";
import * as crudResolvers from "./resolvers/crud/resolvers-crud.index";
import * as argsTypes from "./resolvers/crud/args.index";
import * as actionResolvers from "./resolvers/crud/resolvers-actions.index";
import * as relationResolvers from "./resolvers/relations/resolvers.index";
import * as models from "./models";
import * as outputTypes from "./resolvers/outputs";
import * as inputTypes from "./resolvers/inputs";

const crudResolversMap = {
  User: crudResolvers.UserCrudResolver,
  Graze: crudResolvers.GrazeCrudResolver,
  Breed: crudResolvers.BreedCrudResolver,
  Mob: crudResolvers.MobCrudResolver,
  LivestockUnit: crudResolvers.LivestockUnitCrudResolver,
  Paddock: crudResolvers.PaddockCrudResolver,
  GeoPoint: crudResolvers.GeoPointCrudResolver,
  WeightRecord: crudResolvers.WeightRecordCrudResolver
};
const actionResolversMap = {
  User: {
    aggregateUser: actionResolvers.AggregateUserResolver,
    createManyUser: actionResolvers.CreateManyUserResolver,
    createOneUser: actionResolvers.CreateOneUserResolver,
    deleteManyUser: actionResolvers.DeleteManyUserResolver,
    deleteOneUser: actionResolvers.DeleteOneUserResolver,
    findFirstUser: actionResolvers.FindFirstUserResolver,
    users: actionResolvers.FindManyUserResolver,
    user: actionResolvers.FindUniqueUserResolver,
    groupByUser: actionResolvers.GroupByUserResolver,
    updateManyUser: actionResolvers.UpdateManyUserResolver,
    updateOneUser: actionResolvers.UpdateOneUserResolver,
    upsertOneUser: actionResolvers.UpsertOneUserResolver
  },
  Graze: {
    aggregateGraze: actionResolvers.AggregateGrazeResolver,
    createManyGraze: actionResolvers.CreateManyGrazeResolver,
    createOneGraze: actionResolvers.CreateOneGrazeResolver,
    deleteManyGraze: actionResolvers.DeleteManyGrazeResolver,
    deleteOneGraze: actionResolvers.DeleteOneGrazeResolver,
    findFirstGraze: actionResolvers.FindFirstGrazeResolver,
    grazes: actionResolvers.FindManyGrazeResolver,
    graze: actionResolvers.FindUniqueGrazeResolver,
    groupByGraze: actionResolvers.GroupByGrazeResolver,
    updateManyGraze: actionResolvers.UpdateManyGrazeResolver,
    updateOneGraze: actionResolvers.UpdateOneGrazeResolver,
    upsertOneGraze: actionResolvers.UpsertOneGrazeResolver
  },
  Breed: {
    aggregateBreed: actionResolvers.AggregateBreedResolver,
    createManyBreed: actionResolvers.CreateManyBreedResolver,
    createOneBreed: actionResolvers.CreateOneBreedResolver,
    deleteManyBreed: actionResolvers.DeleteManyBreedResolver,
    deleteOneBreed: actionResolvers.DeleteOneBreedResolver,
    findFirstBreed: actionResolvers.FindFirstBreedResolver,
    breeds: actionResolvers.FindManyBreedResolver,
    breed: actionResolvers.FindUniqueBreedResolver,
    groupByBreed: actionResolvers.GroupByBreedResolver,
    updateManyBreed: actionResolvers.UpdateManyBreedResolver,
    updateOneBreed: actionResolvers.UpdateOneBreedResolver,
    upsertOneBreed: actionResolvers.UpsertOneBreedResolver
  },
  Mob: {
    aggregateMob: actionResolvers.AggregateMobResolver,
    createManyMob: actionResolvers.CreateManyMobResolver,
    createOneMob: actionResolvers.CreateOneMobResolver,
    deleteManyMob: actionResolvers.DeleteManyMobResolver,
    deleteOneMob: actionResolvers.DeleteOneMobResolver,
    findFirstMob: actionResolvers.FindFirstMobResolver,
    mobs: actionResolvers.FindManyMobResolver,
    mob: actionResolvers.FindUniqueMobResolver,
    groupByMob: actionResolvers.GroupByMobResolver,
    updateManyMob: actionResolvers.UpdateManyMobResolver,
    updateOneMob: actionResolvers.UpdateOneMobResolver,
    upsertOneMob: actionResolvers.UpsertOneMobResolver
  },
  LivestockUnit: {
    aggregateLivestockUnit: actionResolvers.AggregateLivestockUnitResolver,
    createManyLivestockUnit: actionResolvers.CreateManyLivestockUnitResolver,
    createOneLivestockUnit: actionResolvers.CreateOneLivestockUnitResolver,
    deleteManyLivestockUnit: actionResolvers.DeleteManyLivestockUnitResolver,
    deleteOneLivestockUnit: actionResolvers.DeleteOneLivestockUnitResolver,
    findFirstLivestockUnit: actionResolvers.FindFirstLivestockUnitResolver,
    livestockUnits: actionResolvers.FindManyLivestockUnitResolver,
    livestockUnit: actionResolvers.FindUniqueLivestockUnitResolver,
    groupByLivestockUnit: actionResolvers.GroupByLivestockUnitResolver,
    updateManyLivestockUnit: actionResolvers.UpdateManyLivestockUnitResolver,
    updateOneLivestockUnit: actionResolvers.UpdateOneLivestockUnitResolver,
    upsertOneLivestockUnit: actionResolvers.UpsertOneLivestockUnitResolver
  },
  Paddock: {
    aggregatePaddock: actionResolvers.AggregatePaddockResolver,
    createManyPaddock: actionResolvers.CreateManyPaddockResolver,
    createOnePaddock: actionResolvers.CreateOnePaddockResolver,
    deleteManyPaddock: actionResolvers.DeleteManyPaddockResolver,
    deleteOnePaddock: actionResolvers.DeleteOnePaddockResolver,
    findFirstPaddock: actionResolvers.FindFirstPaddockResolver,
    paddocks: actionResolvers.FindManyPaddockResolver,
    paddock: actionResolvers.FindUniquePaddockResolver,
    groupByPaddock: actionResolvers.GroupByPaddockResolver,
    updateManyPaddock: actionResolvers.UpdateManyPaddockResolver,
    updateOnePaddock: actionResolvers.UpdateOnePaddockResolver,
    upsertOnePaddock: actionResolvers.UpsertOnePaddockResolver
  },
  GeoPoint: {
    aggregateGeoPoint: actionResolvers.AggregateGeoPointResolver,
    createManyGeoPoint: actionResolvers.CreateManyGeoPointResolver,
    createOneGeoPoint: actionResolvers.CreateOneGeoPointResolver,
    deleteManyGeoPoint: actionResolvers.DeleteManyGeoPointResolver,
    deleteOneGeoPoint: actionResolvers.DeleteOneGeoPointResolver,
    findFirstGeoPoint: actionResolvers.FindFirstGeoPointResolver,
    geoPoints: actionResolvers.FindManyGeoPointResolver,
    geoPoint: actionResolvers.FindUniqueGeoPointResolver,
    groupByGeoPoint: actionResolvers.GroupByGeoPointResolver,
    updateManyGeoPoint: actionResolvers.UpdateManyGeoPointResolver,
    updateOneGeoPoint: actionResolvers.UpdateOneGeoPointResolver,
    upsertOneGeoPoint: actionResolvers.UpsertOneGeoPointResolver
  },
  WeightRecord: {
    aggregateWeightRecord: actionResolvers.AggregateWeightRecordResolver,
    createManyWeightRecord: actionResolvers.CreateManyWeightRecordResolver,
    createOneWeightRecord: actionResolvers.CreateOneWeightRecordResolver,
    deleteManyWeightRecord: actionResolvers.DeleteManyWeightRecordResolver,
    deleteOneWeightRecord: actionResolvers.DeleteOneWeightRecordResolver,
    findFirstWeightRecord: actionResolvers.FindFirstWeightRecordResolver,
    weightRecords: actionResolvers.FindManyWeightRecordResolver,
    weightRecord: actionResolvers.FindUniqueWeightRecordResolver,
    groupByWeightRecord: actionResolvers.GroupByWeightRecordResolver,
    updateManyWeightRecord: actionResolvers.UpdateManyWeightRecordResolver,
    updateOneWeightRecord: actionResolvers.UpdateOneWeightRecordResolver,
    upsertOneWeightRecord: actionResolvers.UpsertOneWeightRecordResolver
  }
};
const crudResolversInfo = {
  User: ["aggregateUser", "createManyUser", "createOneUser", "deleteManyUser", "deleteOneUser", "findFirstUser", "users", "user", "groupByUser", "updateManyUser", "updateOneUser", "upsertOneUser"],
  Graze: ["aggregateGraze", "createManyGraze", "createOneGraze", "deleteManyGraze", "deleteOneGraze", "findFirstGraze", "grazes", "graze", "groupByGraze", "updateManyGraze", "updateOneGraze", "upsertOneGraze"],
  Breed: ["aggregateBreed", "createManyBreed", "createOneBreed", "deleteManyBreed", "deleteOneBreed", "findFirstBreed", "breeds", "breed", "groupByBreed", "updateManyBreed", "updateOneBreed", "upsertOneBreed"],
  Mob: ["aggregateMob", "createManyMob", "createOneMob", "deleteManyMob", "deleteOneMob", "findFirstMob", "mobs", "mob", "groupByMob", "updateManyMob", "updateOneMob", "upsertOneMob"],
  LivestockUnit: ["aggregateLivestockUnit", "createManyLivestockUnit", "createOneLivestockUnit", "deleteManyLivestockUnit", "deleteOneLivestockUnit", "findFirstLivestockUnit", "livestockUnits", "livestockUnit", "groupByLivestockUnit", "updateManyLivestockUnit", "updateOneLivestockUnit", "upsertOneLivestockUnit"],
  Paddock: ["aggregatePaddock", "createManyPaddock", "createOnePaddock", "deleteManyPaddock", "deleteOnePaddock", "findFirstPaddock", "paddocks", "paddock", "groupByPaddock", "updateManyPaddock", "updateOnePaddock", "upsertOnePaddock"],
  GeoPoint: ["aggregateGeoPoint", "createManyGeoPoint", "createOneGeoPoint", "deleteManyGeoPoint", "deleteOneGeoPoint", "findFirstGeoPoint", "geoPoints", "geoPoint", "groupByGeoPoint", "updateManyGeoPoint", "updateOneGeoPoint", "upsertOneGeoPoint"],
  WeightRecord: ["aggregateWeightRecord", "createManyWeightRecord", "createOneWeightRecord", "deleteManyWeightRecord", "deleteOneWeightRecord", "findFirstWeightRecord", "weightRecords", "weightRecord", "groupByWeightRecord", "updateManyWeightRecord", "updateOneWeightRecord", "upsertOneWeightRecord"]
};
const argsInfo = {
  AggregateUserArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyUserArgs: ["data"],
  CreateOneUserArgs: ["data"],
  DeleteManyUserArgs: ["where"],
  DeleteOneUserArgs: ["where"],
  FindFirstUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueUserArgs: ["where"],
  GroupByUserArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyUserArgs: ["data", "where"],
  UpdateOneUserArgs: ["data", "where"],
  UpsertOneUserArgs: ["where", "create", "update"],
  AggregateGrazeArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyGrazeArgs: ["data"],
  CreateOneGrazeArgs: ["data"],
  DeleteManyGrazeArgs: ["where"],
  DeleteOneGrazeArgs: ["where"],
  FindFirstGrazeArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyGrazeArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueGrazeArgs: ["where"],
  GroupByGrazeArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyGrazeArgs: ["data", "where"],
  UpdateOneGrazeArgs: ["data", "where"],
  UpsertOneGrazeArgs: ["where", "create", "update"],
  AggregateBreedArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyBreedArgs: ["data"],
  CreateOneBreedArgs: ["data"],
  DeleteManyBreedArgs: ["where"],
  DeleteOneBreedArgs: ["where"],
  FindFirstBreedArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyBreedArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueBreedArgs: ["where"],
  GroupByBreedArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyBreedArgs: ["data", "where"],
  UpdateOneBreedArgs: ["data", "where"],
  UpsertOneBreedArgs: ["where", "create", "update"],
  AggregateMobArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyMobArgs: ["data"],
  CreateOneMobArgs: ["data"],
  DeleteManyMobArgs: ["where"],
  DeleteOneMobArgs: ["where"],
  FindFirstMobArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyMobArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueMobArgs: ["where"],
  GroupByMobArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyMobArgs: ["data", "where"],
  UpdateOneMobArgs: ["data", "where"],
  UpsertOneMobArgs: ["where", "create", "update"],
  AggregateLivestockUnitArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyLivestockUnitArgs: ["data"],
  CreateOneLivestockUnitArgs: ["data"],
  DeleteManyLivestockUnitArgs: ["where"],
  DeleteOneLivestockUnitArgs: ["where"],
  FindFirstLivestockUnitArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyLivestockUnitArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueLivestockUnitArgs: ["where"],
  GroupByLivestockUnitArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyLivestockUnitArgs: ["data", "where"],
  UpdateOneLivestockUnitArgs: ["data", "where"],
  UpsertOneLivestockUnitArgs: ["where", "create", "update"],
  AggregatePaddockArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyPaddockArgs: ["data"],
  CreateOnePaddockArgs: ["data"],
  DeleteManyPaddockArgs: ["where"],
  DeleteOnePaddockArgs: ["where"],
  FindFirstPaddockArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyPaddockArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniquePaddockArgs: ["where"],
  GroupByPaddockArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyPaddockArgs: ["data", "where"],
  UpdateOnePaddockArgs: ["data", "where"],
  UpsertOnePaddockArgs: ["where", "create", "update"],
  AggregateGeoPointArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyGeoPointArgs: ["data"],
  CreateOneGeoPointArgs: ["data"],
  DeleteManyGeoPointArgs: ["where"],
  DeleteOneGeoPointArgs: ["where"],
  FindFirstGeoPointArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyGeoPointArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueGeoPointArgs: ["where"],
  GroupByGeoPointArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyGeoPointArgs: ["data", "where"],
  UpdateOneGeoPointArgs: ["data", "where"],
  UpsertOneGeoPointArgs: ["where", "create", "update"],
  AggregateWeightRecordArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyWeightRecordArgs: ["data"],
  CreateOneWeightRecordArgs: ["data"],
  DeleteManyWeightRecordArgs: ["where"],
  DeleteOneWeightRecordArgs: ["where"],
  FindFirstWeightRecordArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyWeightRecordArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueWeightRecordArgs: ["where"],
  GroupByWeightRecordArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyWeightRecordArgs: ["data", "where"],
  UpdateOneWeightRecordArgs: ["data", "where"],
  UpsertOneWeightRecordArgs: ["where", "create", "update"]
};

type ResolverModelNames = keyof typeof crudResolversMap;

type ModelResolverActionNames<
  TModel extends ResolverModelNames
  > = keyof typeof crudResolversMap[TModel]["prototype"];

export type ResolverActionsConfig<
  TModel extends ResolverModelNames
  > = Partial<Record<ModelResolverActionNames<TModel> | "_all", MethodDecorator[]>>;

export type ResolversEnhanceMap = {
  [TModel in ResolverModelNames]?: ResolverActionsConfig<TModel>;
};

export function applyResolversEnhanceMap(
  resolversEnhanceMap: ResolversEnhanceMap,
) {
  for (const resolversEnhanceMapKey of Object.keys(resolversEnhanceMap)) {
    const modelName = resolversEnhanceMapKey as keyof typeof resolversEnhanceMap;
    const crudTarget = crudResolversMap[modelName].prototype;
    const resolverActionsConfig = resolversEnhanceMap[modelName]!;
    const actionResolversConfig = actionResolversMap[modelName];
    if (resolverActionsConfig._all) {
      const allActionsDecorators = resolverActionsConfig._all;
      const resolverActionNames = crudResolversInfo[modelName as keyof typeof crudResolversInfo];
      for (const resolverActionName of resolverActionNames) {
        const actionTarget = (actionResolversConfig[
          resolverActionName as keyof typeof actionResolversConfig
        ] as Function).prototype;
        tslib.__decorate(allActionsDecorators, crudTarget, resolverActionName, null);
        tslib.__decorate(allActionsDecorators, actionTarget, resolverActionName, null);
      }
    }
    const resolverActionsToApply = Object.keys(resolverActionsConfig).filter(
      it => it !== "_all"
    );
    for (const resolverActionName of resolverActionsToApply) {
      const decorators = resolverActionsConfig[
        resolverActionName as keyof typeof resolverActionsConfig
      ] as MethodDecorator[];
      const actionTarget = (actionResolversConfig[
        resolverActionName as keyof typeof actionResolversConfig
      ] as Function).prototype;
      tslib.__decorate(decorators, crudTarget, resolverActionName, null);
      tslib.__decorate(decorators, actionTarget, resolverActionName, null);
    }
  }
}

type ArgsTypesNames = keyof typeof argsTypes;

type ArgFieldNames<TArgsType extends ArgsTypesNames> = Exclude<
  keyof typeof argsTypes[TArgsType]["prototype"],
  number | symbol
>;

type ArgFieldsConfig<
  TArgsType extends ArgsTypesNames
  > = FieldsConfig<ArgFieldNames<TArgsType>>;

export type ArgConfig<TArgsType extends ArgsTypesNames> = {
  class?: ClassDecorator[];
  fields?: ArgFieldsConfig<TArgsType>;
};

export type ArgsTypesEnhanceMap = {
  [TArgsType in ArgsTypesNames]?: ArgConfig<TArgsType>;
};

export function applyArgsTypesEnhanceMap(
  argsTypesEnhanceMap: ArgsTypesEnhanceMap,
) {
  for (const argsTypesEnhanceMapKey of Object.keys(argsTypesEnhanceMap)) {
    const argsTypeName = argsTypesEnhanceMapKey as keyof typeof argsTypesEnhanceMap;
    const typeConfig = argsTypesEnhanceMap[argsTypeName]!;
    const typeClass = argsTypes[argsTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      argsInfo[argsTypeName as keyof typeof argsInfo],
    );
  }
}

const relationResolversMap = {
  Graze: relationResolvers.GrazeRelationsResolver,
  Breed: relationResolvers.BreedRelationsResolver,
  Mob: relationResolvers.MobRelationsResolver,
  LivestockUnit: relationResolvers.LivestockUnitRelationsResolver,
  Paddock: relationResolvers.PaddockRelationsResolver,
  GeoPoint: relationResolvers.GeoPointRelationsResolver,
  WeightRecord: relationResolvers.WeightRecordRelationsResolver
};
const relationResolversInfo = {
  Graze: ["paddock", "mob"],
  Breed: ["members"],
  Mob: ["members", "graze"],
  LivestockUnit: ["breed", "sire", "dam", "mob", "weights"],
  Paddock: ["polygon", "graze"],
  GeoPoint: ["paddock"],
  WeightRecord: ["livestockUnit"]
};

type RelationResolverModelNames = keyof typeof relationResolversMap;

type RelationResolverActionNames<
  TModel extends RelationResolverModelNames
  > = keyof typeof relationResolversMap[TModel]["prototype"];

export type RelationResolverActionsConfig<TModel extends RelationResolverModelNames>
  = Partial<Record<RelationResolverActionNames<TModel> | "_all", MethodDecorator[]>>;

export type RelationResolversEnhanceMap = {
  [TModel in RelationResolverModelNames]?: RelationResolverActionsConfig<TModel>;
};

export function applyRelationResolversEnhanceMap(
  relationResolversEnhanceMap: RelationResolversEnhanceMap,
) {
  for (const relationResolversEnhanceMapKey of Object.keys(relationResolversEnhanceMap)) {
    const modelName = relationResolversEnhanceMapKey as keyof typeof relationResolversEnhanceMap;
    const relationResolverTarget = relationResolversMap[modelName].prototype;
    const relationResolverActionsConfig = relationResolversEnhanceMap[modelName]!;
    if (relationResolverActionsConfig._all) {
      const allActionsDecorators = relationResolverActionsConfig._all;
      const relationResolverActionNames = relationResolversInfo[modelName as keyof typeof relationResolversInfo];
      for (const relationResolverActionName of relationResolverActionNames) {
        tslib.__decorate(allActionsDecorators, relationResolverTarget, relationResolverActionName, null);
      }
    }
    const relationResolverActionsToApply = Object.keys(relationResolverActionsConfig).filter(
      it => it !== "_all"
    );
    for (const relationResolverActionName of relationResolverActionsToApply) {
      const decorators = relationResolverActionsConfig[
        relationResolverActionName as keyof typeof relationResolverActionsConfig
      ] as MethodDecorator[];
      tslib.__decorate(decorators, relationResolverTarget, relationResolverActionName, null);
    }
  }
}

type TypeConfig = {
  class?: ClassDecorator[];
  fields?: FieldsConfig;
};

type FieldsConfig<TTypeKeys extends string = string> = Partial<
  Record<TTypeKeys | "_all", PropertyDecorator[]>
>;

function applyTypeClassEnhanceConfig<
  TEnhanceConfig extends TypeConfig,
  TType extends object
>(
  enhanceConfig: TEnhanceConfig,
  typeClass: ClassType<TType>,
  typePrototype: TType,
  typeFieldNames: string[]
) {
  if (enhanceConfig.class) {
    tslib.__decorate(enhanceConfig.class, typeClass);
  }
  if (enhanceConfig.fields) {
    if (enhanceConfig.fields._all) {
      const allFieldsDecorators = enhanceConfig.fields._all;
      for (const typeFieldName of typeFieldNames) {
        tslib.__decorate(allFieldsDecorators, typePrototype, typeFieldName, void 0);
      }
    }
    const configFieldsToApply = Object.keys(enhanceConfig.fields).filter(
      it => it !== "_all"
    );
    for (const typeFieldName of configFieldsToApply) {
      const fieldDecorators = enhanceConfig.fields[typeFieldName]!;
      tslib.__decorate(fieldDecorators, typePrototype, typeFieldName, void 0);
    }
  }
}

const modelsInfo = {
  User: ["id", "name"],
  Graze: ["id", "startDatetime", "endDateTime", "paddockId", "mobIds"],
  Breed: ["id", "name", "class", "memberId"],
  Mob: ["id", "comment", "grazeIds"],
  LivestockUnit: ["id", "nlisid", "name", "comment", "sex", "birthdate", "desexed", "parentId", "livestockUnitId"],
  Paddock: ["id", "name"],
  GeoPoint: ["id", "latitude", "longitude", "paddockId"],
  WeightRecord: ["id", "weight", "dateMeasured", "method", "livestockunitId"]
};

type ModelNames = keyof typeof models;

type ModelFieldNames<TModel extends ModelNames> = Exclude<
  keyof typeof models[TModel]["prototype"],
  number | symbol
>;

type ModelFieldsConfig<TModel extends ModelNames> = FieldsConfig<
  ModelFieldNames<TModel>
>;

export type ModelConfig<TModel extends ModelNames> = {
  class?: ClassDecorator[];
  fields?: ModelFieldsConfig<TModel>;
};

export type ModelsEnhanceMap = {
  [TModel in ModelNames]?: ModelConfig<TModel>;
};

export function applyModelsEnhanceMap(modelsEnhanceMap: ModelsEnhanceMap) {
  for (const modelsEnhanceMapKey of Object.keys(modelsEnhanceMap)) {
    const modelName = modelsEnhanceMapKey as keyof typeof modelsEnhanceMap;
    const modelConfig = modelsEnhanceMap[modelName]!;
    const modelClass = models[modelName];
    const modelTarget = modelClass.prototype;
    applyTypeClassEnhanceConfig(
      modelConfig,
      modelClass,
      modelTarget,
      modelsInfo[modelName as keyof typeof modelsInfo],
    );
  }
}

const outputsInfo = {
  AggregateUser: ["_count", "_min", "_max"],
  UserGroupBy: ["id", "name", "_count", "_min", "_max"],
  AggregateGraze: ["_count", "_min", "_max"],
  GrazeGroupBy: ["id", "startDatetime", "endDateTime", "paddockId", "mobIds", "_count", "_min", "_max"],
  AggregateBreed: ["_count", "_min", "_max"],
  BreedGroupBy: ["id", "name", "class", "memberId", "_count", "_min", "_max"],
  AggregateMob: ["_count", "_min", "_max"],
  MobGroupBy: ["id", "comment", "grazeIds", "_count", "_min", "_max"],
  AggregateLivestockUnit: ["_count", "_min", "_max"],
  LivestockUnitGroupBy: ["id", "nlisid", "name", "comment", "sex", "birthdate", "desexed", "parentId", "livestockUnitId", "_count", "_min", "_max"],
  AggregatePaddock: ["_count", "_min", "_max"],
  PaddockGroupBy: ["id", "name", "_count", "_min", "_max"],
  AggregateGeoPoint: ["_count", "_avg", "_sum", "_min", "_max"],
  GeoPointGroupBy: ["id", "latitude", "longitude", "paddockId", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateWeightRecord: ["_count", "_avg", "_sum", "_min", "_max"],
  WeightRecordGroupBy: ["id", "weight", "dateMeasured", "method", "livestockunitId", "_count", "_avg", "_sum", "_min", "_max"],
  AffectedRowsOutput: ["count"],
  UserCountAggregate: ["id", "name", "_all"],
  UserMinAggregate: ["id", "name"],
  UserMaxAggregate: ["id", "name"],
  GrazeCount: ["mob"],
  GrazeCountAggregate: ["id", "startDatetime", "endDateTime", "paddockId", "mobIds", "_all"],
  GrazeMinAggregate: ["id", "startDatetime", "endDateTime", "paddockId"],
  GrazeMaxAggregate: ["id", "startDatetime", "endDateTime", "paddockId"],
  BreedCountAggregate: ["id", "name", "class", "memberId", "_all"],
  BreedMinAggregate: ["id", "name", "class", "memberId"],
  BreedMaxAggregate: ["id", "name", "class", "memberId"],
  MobCount: ["members", "graze"],
  MobCountAggregate: ["id", "comment", "grazeIds", "_all"],
  MobMinAggregate: ["id", "comment"],
  MobMaxAggregate: ["id", "comment"],
  LivestockUnitCount: ["weights"],
  LivestockUnitCountAggregate: ["id", "nlisid", "name", "comment", "sex", "birthdate", "desexed", "parentId", "livestockUnitId", "_all"],
  LivestockUnitMinAggregate: ["id", "nlisid", "name", "comment", "sex", "birthdate", "desexed", "parentId", "livestockUnitId"],
  LivestockUnitMaxAggregate: ["id", "nlisid", "name", "comment", "sex", "birthdate", "desexed", "parentId", "livestockUnitId"],
  PaddockCount: ["polygon", "graze"],
  PaddockCountAggregate: ["id", "name", "_all"],
  PaddockMinAggregate: ["id", "name"],
  PaddockMaxAggregate: ["id", "name"],
  GeoPointCountAggregate: ["id", "latitude", "longitude", "paddockId", "_all"],
  GeoPointAvgAggregate: ["latitude", "longitude"],
  GeoPointSumAggregate: ["latitude", "longitude"],
  GeoPointMinAggregate: ["id", "latitude", "longitude", "paddockId"],
  GeoPointMaxAggregate: ["id", "latitude", "longitude", "paddockId"],
  WeightRecordCountAggregate: ["id", "weight", "dateMeasured", "method", "livestockunitId", "_all"],
  WeightRecordAvgAggregate: ["weight"],
  WeightRecordSumAggregate: ["weight"],
  WeightRecordMinAggregate: ["id", "weight", "dateMeasured", "method", "livestockunitId"],
  WeightRecordMaxAggregate: ["id", "weight", "dateMeasured", "method", "livestockunitId"]
};

type OutputTypesNames = keyof typeof outputTypes;

type OutputTypeFieldNames<TOutput extends OutputTypesNames> = Exclude<
  keyof typeof outputTypes[TOutput]["prototype"],
  number | symbol
>;

type OutputTypeFieldsConfig<
  TOutput extends OutputTypesNames
  > = FieldsConfig<OutputTypeFieldNames<TOutput>>;

export type OutputTypeConfig<TOutput extends OutputTypesNames> = {
  class?: ClassDecorator[];
  fields?: OutputTypeFieldsConfig<TOutput>;
};

export type OutputTypesEnhanceMap = {
  [TOutput in OutputTypesNames]?: OutputTypeConfig<TOutput>;
};

export function applyOutputTypesEnhanceMap(
  outputTypesEnhanceMap: OutputTypesEnhanceMap,
) {
  for (const outputTypeEnhanceMapKey of Object.keys(outputTypesEnhanceMap)) {
    const outputTypeName = outputTypeEnhanceMapKey as keyof typeof outputTypesEnhanceMap;
    const typeConfig = outputTypesEnhanceMap[outputTypeName]!;
    const typeClass = outputTypes[outputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      outputsInfo[outputTypeName as keyof typeof outputsInfo],
    );
  }
}

const inputsInfo = {
  UserWhereInput: ["AND", "OR", "NOT", "id", "name"],
  UserOrderByWithRelationInput: ["id", "name"],
  UserWhereUniqueInput: ["id"],
  UserOrderByWithAggregationInput: ["id", "name", "_count", "_max", "_min"],
  UserScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "name"],
  GrazeWhereInput: ["AND", "OR", "NOT", "id", "startDatetime", "endDateTime", "paddock", "paddockId", "mobIds", "mob"],
  GrazeOrderByWithRelationInput: ["id", "startDatetime", "endDateTime", "paddock", "paddockId", "mobIds", "mob"],
  GrazeWhereUniqueInput: ["id", "paddockId"],
  GrazeOrderByWithAggregationInput: ["id", "startDatetime", "endDateTime", "paddockId", "mobIds", "_count", "_max", "_min"],
  GrazeScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "startDatetime", "endDateTime", "paddockId", "mobIds"],
  BreedWhereInput: ["AND", "OR", "NOT", "id", "name", "class", "members", "memberId"],
  BreedOrderByWithRelationInput: ["id", "name", "class", "members", "memberId"],
  BreedWhereUniqueInput: ["id", "memberId"],
  BreedOrderByWithAggregationInput: ["id", "name", "class", "memberId", "_count", "_max", "_min"],
  BreedScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "name", "class", "memberId"],
  MobWhereInput: ["AND", "OR", "NOT", "id", "members", "comment", "grazeIds", "graze"],
  MobOrderByWithRelationInput: ["id", "members", "comment", "grazeIds", "graze"],
  MobWhereUniqueInput: ["id"],
  MobOrderByWithAggregationInput: ["id", "comment", "grazeIds", "_count", "_max", "_min"],
  MobScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "comment", "grazeIds"],
  LivestockUnitWhereInput: ["AND", "OR", "NOT", "id", "nlisid", "breed", "name", "comment", "sex", "birthdate", "desexed", "parentId", "sire", "dam", "mob", "livestockUnitId", "weights"],
  LivestockUnitOrderByWithRelationInput: ["id", "nlisid", "breed", "name", "comment", "sex", "birthdate", "desexed", "parentId", "sire", "dam", "mob", "livestockUnitId", "weights"],
  LivestockUnitWhereUniqueInput: ["id", "parentId", "livestockUnitId"],
  LivestockUnitOrderByWithAggregationInput: ["id", "nlisid", "name", "comment", "sex", "birthdate", "desexed", "parentId", "livestockUnitId", "_count", "_max", "_min"],
  LivestockUnitScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "nlisid", "name", "comment", "sex", "birthdate", "desexed", "parentId", "livestockUnitId"],
  PaddockWhereInput: ["AND", "OR", "NOT", "id", "name", "polygon", "graze"],
  PaddockOrderByWithRelationInput: ["id", "name", "polygon", "graze"],
  PaddockWhereUniqueInput: ["id"],
  PaddockOrderByWithAggregationInput: ["id", "name", "_count", "_max", "_min"],
  PaddockScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "name"],
  GeoPointWhereInput: ["AND", "OR", "NOT", "id", "latitude", "longitude", "paddock", "paddockId"],
  GeoPointOrderByWithRelationInput: ["id", "latitude", "longitude", "paddock", "paddockId"],
  GeoPointWhereUniqueInput: ["id", "paddockId"],
  GeoPointOrderByWithAggregationInput: ["id", "latitude", "longitude", "paddockId", "_count", "_avg", "_max", "_min", "_sum"],
  GeoPointScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "latitude", "longitude", "paddockId"],
  WeightRecordWhereInput: ["AND", "OR", "NOT", "id", "weight", "dateMeasured", "method", "livestockunitId", "livestockUnit"],
  WeightRecordOrderByWithRelationInput: ["id", "weight", "dateMeasured", "method", "livestockunitId", "livestockUnit"],
  WeightRecordWhereUniqueInput: ["id"],
  WeightRecordOrderByWithAggregationInput: ["id", "weight", "dateMeasured", "method", "livestockunitId", "_count", "_avg", "_max", "_min", "_sum"],
  WeightRecordScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "weight", "dateMeasured", "method", "livestockunitId"],
  UserCreateInput: ["id", "name"],
  UserUpdateInput: ["name"],
  UserCreateManyInput: ["id", "name"],
  UserUpdateManyMutationInput: ["name"],
  GrazeCreateInput: ["id", "startDatetime", "endDateTime", "paddock", "mobIds", "mob"],
  GrazeUpdateInput: ["startDatetime", "endDateTime", "paddock", "mobIds", "mob"],
  GrazeCreateManyInput: ["id", "startDatetime", "endDateTime", "paddockId", "mobIds"],
  GrazeUpdateManyMutationInput: ["startDatetime", "endDateTime", "mobIds"],
  BreedCreateInput: ["id", "name", "class", "members"],
  BreedUpdateInput: ["name", "class", "members"],
  BreedCreateManyInput: ["id", "name", "class", "memberId"],
  BreedUpdateManyMutationInput: ["name", "class"],
  MobCreateInput: ["id", "members", "comment", "grazeIds", "graze"],
  MobUpdateInput: ["members", "comment", "grazeIds", "graze"],
  MobCreateManyInput: ["id", "comment", "grazeIds"],
  MobUpdateManyMutationInput: ["comment", "grazeIds"],
  LivestockUnitCreateInput: ["id", "nlisid", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "mob", "weights"],
  LivestockUnitUpdateInput: ["nlisid", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "mob", "weights"],
  LivestockUnitCreateManyInput: ["id", "nlisid", "name", "comment", "sex", "birthdate", "desexed", "parentId", "livestockUnitId"],
  LivestockUnitUpdateManyMutationInput: ["nlisid", "name", "comment", "sex", "birthdate", "desexed"],
  PaddockCreateInput: ["id", "name", "polygon", "graze"],
  PaddockUpdateInput: ["name", "polygon", "graze"],
  PaddockCreateManyInput: ["id", "name"],
  PaddockUpdateManyMutationInput: ["name"],
  GeoPointCreateInput: ["id", "latitude", "longitude", "paddock"],
  GeoPointUpdateInput: ["latitude", "longitude", "paddock"],
  GeoPointCreateManyInput: ["id", "latitude", "longitude", "paddockId"],
  GeoPointUpdateManyMutationInput: ["latitude", "longitude"],
  WeightRecordCreateInput: ["id", "weight", "dateMeasured", "method", "livestockUnit"],
  WeightRecordUpdateInput: ["weight", "dateMeasured", "method", "livestockUnit"],
  WeightRecordCreateManyInput: ["id", "weight", "dateMeasured", "method", "livestockunitId"],
  WeightRecordUpdateManyMutationInput: ["weight", "dateMeasured", "method"],
  StringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not"],
  StringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not", "isSet"],
  UserCountOrderByAggregateInput: ["id", "name"],
  UserMaxOrderByAggregateInput: ["id", "name"],
  UserMinOrderByAggregateInput: ["id", "name"],
  StringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not", "_count", "_min", "_max"],
  StringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not", "_count", "_min", "_max", "isSet"],
  DateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  DateTimeNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "isSet"],
  PaddockRelationFilter: ["is", "isNot"],
  StringNullableListFilter: ["equals", "has", "hasEvery", "hasSome", "isEmpty"],
  MobListRelationFilter: ["every", "some", "none"],
  MobOrderByRelationAggregateInput: ["_count"],
  GrazeCountOrderByAggregateInput: ["id", "startDatetime", "endDateTime", "paddockId", "mobIds"],
  GrazeMaxOrderByAggregateInput: ["id", "startDatetime", "endDateTime", "paddockId"],
  GrazeMinOrderByAggregateInput: ["id", "startDatetime", "endDateTime", "paddockId"],
  DateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  DateTimeNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max", "isSet"],
  EnumStockClassFilter: ["equals", "in", "notIn", "not"],
  LivestockUnitRelationFilter: ["is", "isNot"],
  BreedCountOrderByAggregateInput: ["id", "name", "class", "memberId"],
  BreedMaxOrderByAggregateInput: ["id", "name", "class", "memberId"],
  BreedMinOrderByAggregateInput: ["id", "name", "class", "memberId"],
  EnumStockClassWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  LivestockUnitListRelationFilter: ["every", "some", "none"],
  GrazeListRelationFilter: ["every", "some", "none"],
  LivestockUnitOrderByRelationAggregateInput: ["_count"],
  GrazeOrderByRelationAggregateInput: ["_count"],
  MobCountOrderByAggregateInput: ["id", "comment", "grazeIds"],
  MobMaxOrderByAggregateInput: ["id", "comment"],
  MobMinOrderByAggregateInput: ["id", "comment"],
  BreedRelationFilter: ["is", "isNot"],
  EnumSexFilter: ["equals", "in", "notIn", "not"],
  BoolFilter: ["equals", "not"],
  MobRelationFilter: ["is", "isNot"],
  WeightRecordListRelationFilter: ["every", "some", "none"],
  WeightRecordOrderByRelationAggregateInput: ["_count"],
  LivestockUnitCountOrderByAggregateInput: ["id", "nlisid", "name", "comment", "sex", "birthdate", "desexed", "parentId", "livestockUnitId"],
  LivestockUnitMaxOrderByAggregateInput: ["id", "nlisid", "name", "comment", "sex", "birthdate", "desexed", "parentId", "livestockUnitId"],
  LivestockUnitMinOrderByAggregateInput: ["id", "nlisid", "name", "comment", "sex", "birthdate", "desexed", "parentId", "livestockUnitId"],
  EnumSexWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  BoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
  GeoPointListRelationFilter: ["every", "some", "none"],
  GeoPointOrderByRelationAggregateInput: ["_count"],
  PaddockCountOrderByAggregateInput: ["id", "name"],
  PaddockMaxOrderByAggregateInput: ["id", "name"],
  PaddockMinOrderByAggregateInput: ["id", "name"],
  FloatFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  GeoPointCountOrderByAggregateInput: ["id", "latitude", "longitude", "paddockId"],
  GeoPointAvgOrderByAggregateInput: ["latitude", "longitude"],
  GeoPointMaxOrderByAggregateInput: ["id", "latitude", "longitude", "paddockId"],
  GeoPointMinOrderByAggregateInput: ["id", "latitude", "longitude", "paddockId"],
  GeoPointSumOrderByAggregateInput: ["latitude", "longitude"],
  FloatWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  EnumWeighMethodFilter: ["equals", "in", "notIn", "not"],
  WeightRecordCountOrderByAggregateInput: ["id", "weight", "dateMeasured", "method", "livestockunitId"],
  WeightRecordAvgOrderByAggregateInput: ["weight"],
  WeightRecordMaxOrderByAggregateInput: ["id", "weight", "dateMeasured", "method", "livestockunitId"],
  WeightRecordMinOrderByAggregateInput: ["id", "weight", "dateMeasured", "method", "livestockunitId"],
  WeightRecordSumOrderByAggregateInput: ["weight"],
  EnumWeighMethodWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  NullableStringFieldUpdateOperationsInput: ["set", "unset"],
  PaddockCreateNestedOneWithoutGrazeInput: ["create", "connectOrCreate", "connect"],
  GrazeCreatemobIdsInput: ["set"],
  MobCreateNestedManyWithoutGrazeInput: ["create", "connectOrCreate", "connect"],
  DateTimeFieldUpdateOperationsInput: ["set"],
  NullableDateTimeFieldUpdateOperationsInput: ["set", "unset"],
  PaddockUpdateOneRequiredWithoutGrazeNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  GrazeUpdatemobIdsInput: ["set", "push"],
  MobUpdateManyWithoutGrazeNestedInput: ["create", "connectOrCreate", "upsert", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  StringFieldUpdateOperationsInput: ["set"],
  LivestockUnitCreateNestedOneWithoutBreedInput: ["create", "connectOrCreate", "connect"],
  EnumStockClassFieldUpdateOperationsInput: ["set"],
  LivestockUnitUpdateOneWithoutBreedNestedInput: ["create", "connectOrCreate", "upsert", "disconnect", "delete", "connect", "update"],
  LivestockUnitCreateNestedManyWithoutMobInput: ["create", "connectOrCreate", "createMany", "connect"],
  MobCreategrazeIdsInput: ["set"],
  GrazeCreateNestedManyWithoutMobInput: ["create", "connectOrCreate", "connect"],
  LivestockUnitUpdateManyWithoutMobNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  MobUpdategrazeIdsInput: ["set", "push"],
  GrazeUpdateManyWithoutMobNestedInput: ["create", "connectOrCreate", "upsert", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  BreedCreateNestedOneWithoutMembersInput: ["create", "connectOrCreate", "connect"],
  LivestockUnitCreateNestedOneWithoutDamInput: ["create", "connectOrCreate", "connect"],
  LivestockUnitCreateNestedOneWithoutSireInput: ["create", "connectOrCreate", "connect"],
  MobCreateNestedOneWithoutMembersInput: ["create", "connectOrCreate", "connect"],
  WeightRecordCreateNestedManyWithoutLivestockUnitInput: ["create", "connectOrCreate", "createMany", "connect"],
  BreedUpdateOneWithoutMembersNestedInput: ["create", "connectOrCreate", "upsert", "disconnect", "delete", "connect", "update"],
  EnumSexFieldUpdateOperationsInput: ["set"],
  BoolFieldUpdateOperationsInput: ["set"],
  LivestockUnitUpdateOneWithoutDamNestedInput: ["create", "connectOrCreate", "upsert", "disconnect", "delete", "connect", "update"],
  LivestockUnitUpdateOneWithoutSireNestedInput: ["create", "connectOrCreate", "upsert", "disconnect", "delete", "connect", "update"],
  MobUpdateOneRequiredWithoutMembersNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  WeightRecordUpdateManyWithoutLivestockUnitNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  GeoPointCreateNestedManyWithoutPaddockInput: ["create", "connectOrCreate", "createMany", "connect"],
  GrazeCreateNestedManyWithoutPaddockInput: ["create", "connectOrCreate", "createMany", "connect"],
  GeoPointUpdateManyWithoutPaddockNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  GrazeUpdateManyWithoutPaddockNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  PaddockCreateNestedOneWithoutPolygonInput: ["create", "connectOrCreate", "connect"],
  FloatFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  PaddockUpdateOneRequiredWithoutPolygonNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  LivestockUnitCreateNestedOneWithoutWeightsInput: ["create", "connectOrCreate", "connect"],
  EnumWeighMethodFieldUpdateOperationsInput: ["set"],
  LivestockUnitUpdateOneRequiredWithoutWeightsNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  NestedStringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  NestedStringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "isSet"],
  NestedStringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  NestedIntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedStringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max", "isSet"],
  NestedIntNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "isSet"],
  NestedDateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedDateTimeNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "isSet"],
  NestedDateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  NestedDateTimeNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max", "isSet"],
  NestedEnumStockClassFilter: ["equals", "in", "notIn", "not"],
  NestedEnumStockClassWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  NestedEnumSexFilter: ["equals", "in", "notIn", "not"],
  NestedBoolFilter: ["equals", "not"],
  NestedEnumSexWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  NestedBoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
  NestedFloatFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedFloatWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  NestedEnumWeighMethodFilter: ["equals", "in", "notIn", "not"],
  NestedEnumWeighMethodWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  PaddockCreateWithoutGrazeInput: ["id", "name", "polygon"],
  PaddockCreateOrConnectWithoutGrazeInput: ["where", "create"],
  MobCreateWithoutGrazeInput: ["id", "members", "comment", "grazeIds"],
  MobCreateOrConnectWithoutGrazeInput: ["where", "create"],
  PaddockUpsertWithoutGrazeInput: ["update", "create"],
  PaddockUpdateWithoutGrazeInput: ["name", "polygon"],
  MobUpsertWithWhereUniqueWithoutGrazeInput: ["where", "update", "create"],
  MobUpdateWithWhereUniqueWithoutGrazeInput: ["where", "data"],
  MobUpdateManyWithWhereWithoutGrazeInput: ["where", "data"],
  MobScalarWhereInput: ["AND", "OR", "NOT", "id", "comment", "grazeIds"],
  LivestockUnitCreateWithoutBreedInput: ["id", "nlisid", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "mob", "weights"],
  LivestockUnitCreateOrConnectWithoutBreedInput: ["where", "create"],
  LivestockUnitUpsertWithoutBreedInput: ["update", "create"],
  LivestockUnitUpdateWithoutBreedInput: ["nlisid", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "mob", "weights"],
  LivestockUnitCreateWithoutMobInput: ["id", "nlisid", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "weights"],
  LivestockUnitCreateOrConnectWithoutMobInput: ["where", "create"],
  LivestockUnitCreateManyMobInputEnvelope: ["data"],
  GrazeCreateWithoutMobInput: ["id", "startDatetime", "endDateTime", "paddock", "mobIds"],
  GrazeCreateOrConnectWithoutMobInput: ["where", "create"],
  LivestockUnitUpsertWithWhereUniqueWithoutMobInput: ["where", "update", "create"],
  LivestockUnitUpdateWithWhereUniqueWithoutMobInput: ["where", "data"],
  LivestockUnitUpdateManyWithWhereWithoutMobInput: ["where", "data"],
  LivestockUnitScalarWhereInput: ["AND", "OR", "NOT", "id", "nlisid", "name", "comment", "sex", "birthdate", "desexed", "parentId", "livestockUnitId"],
  GrazeUpsertWithWhereUniqueWithoutMobInput: ["where", "update", "create"],
  GrazeUpdateWithWhereUniqueWithoutMobInput: ["where", "data"],
  GrazeUpdateManyWithWhereWithoutMobInput: ["where", "data"],
  GrazeScalarWhereInput: ["AND", "OR", "NOT", "id", "startDatetime", "endDateTime", "paddockId", "mobIds"],
  BreedCreateWithoutMembersInput: ["id", "name", "class"],
  BreedCreateOrConnectWithoutMembersInput: ["where", "create"],
  LivestockUnitCreateWithoutDamInput: ["id", "nlisid", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "mob", "weights"],
  LivestockUnitCreateOrConnectWithoutDamInput: ["where", "create"],
  LivestockUnitCreateWithoutSireInput: ["id", "nlisid", "breed", "name", "comment", "sex", "birthdate", "desexed", "dam", "mob", "weights"],
  LivestockUnitCreateOrConnectWithoutSireInput: ["where", "create"],
  MobCreateWithoutMembersInput: ["id", "comment", "grazeIds", "graze"],
  MobCreateOrConnectWithoutMembersInput: ["where", "create"],
  WeightRecordCreateWithoutLivestockUnitInput: ["id", "weight", "dateMeasured", "method"],
  WeightRecordCreateOrConnectWithoutLivestockUnitInput: ["where", "create"],
  WeightRecordCreateManyLivestockUnitInputEnvelope: ["data"],
  BreedUpsertWithoutMembersInput: ["update", "create"],
  BreedUpdateWithoutMembersInput: ["name", "class"],
  LivestockUnitUpsertWithoutDamInput: ["update", "create"],
  LivestockUnitUpdateWithoutDamInput: ["nlisid", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "mob", "weights"],
  LivestockUnitUpsertWithoutSireInput: ["update", "create"],
  LivestockUnitUpdateWithoutSireInput: ["nlisid", "breed", "name", "comment", "sex", "birthdate", "desexed", "dam", "mob", "weights"],
  MobUpsertWithoutMembersInput: ["update", "create"],
  MobUpdateWithoutMembersInput: ["comment", "grazeIds", "graze"],
  WeightRecordUpsertWithWhereUniqueWithoutLivestockUnitInput: ["where", "update", "create"],
  WeightRecordUpdateWithWhereUniqueWithoutLivestockUnitInput: ["where", "data"],
  WeightRecordUpdateManyWithWhereWithoutLivestockUnitInput: ["where", "data"],
  WeightRecordScalarWhereInput: ["AND", "OR", "NOT", "id", "weight", "dateMeasured", "method", "livestockunitId"],
  GeoPointCreateWithoutPaddockInput: ["id", "latitude", "longitude"],
  GeoPointCreateOrConnectWithoutPaddockInput: ["where", "create"],
  GeoPointCreateManyPaddockInputEnvelope: ["data"],
  GrazeCreateWithoutPaddockInput: ["id", "startDatetime", "endDateTime", "mobIds", "mob"],
  GrazeCreateOrConnectWithoutPaddockInput: ["where", "create"],
  GrazeCreateManyPaddockInputEnvelope: ["data"],
  GeoPointUpsertWithWhereUniqueWithoutPaddockInput: ["where", "update", "create"],
  GeoPointUpdateWithWhereUniqueWithoutPaddockInput: ["where", "data"],
  GeoPointUpdateManyWithWhereWithoutPaddockInput: ["where", "data"],
  GeoPointScalarWhereInput: ["AND", "OR", "NOT", "id", "latitude", "longitude", "paddockId"],
  GrazeUpsertWithWhereUniqueWithoutPaddockInput: ["where", "update", "create"],
  GrazeUpdateWithWhereUniqueWithoutPaddockInput: ["where", "data"],
  GrazeUpdateManyWithWhereWithoutPaddockInput: ["where", "data"],
  PaddockCreateWithoutPolygonInput: ["id", "name", "graze"],
  PaddockCreateOrConnectWithoutPolygonInput: ["where", "create"],
  PaddockUpsertWithoutPolygonInput: ["update", "create"],
  PaddockUpdateWithoutPolygonInput: ["name", "graze"],
  LivestockUnitCreateWithoutWeightsInput: ["id", "nlisid", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "mob"],
  LivestockUnitCreateOrConnectWithoutWeightsInput: ["where", "create"],
  LivestockUnitUpsertWithoutWeightsInput: ["update", "create"],
  LivestockUnitUpdateWithoutWeightsInput: ["nlisid", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "mob"],
  MobUpdateWithoutGrazeInput: ["members", "comment", "grazeIds"],
  LivestockUnitCreateManyMobInput: ["id", "nlisid", "name", "comment", "sex", "birthdate", "desexed", "parentId"],
  LivestockUnitUpdateWithoutMobInput: ["nlisid", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "weights"],
  GrazeUpdateWithoutMobInput: ["startDatetime", "endDateTime", "paddock", "mobIds"],
  WeightRecordCreateManyLivestockUnitInput: ["id", "weight", "dateMeasured", "method"],
  WeightRecordUpdateWithoutLivestockUnitInput: ["weight", "dateMeasured", "method"],
  GeoPointCreateManyPaddockInput: ["id", "latitude", "longitude"],
  GrazeCreateManyPaddockInput: ["id", "startDatetime", "endDateTime", "mobIds"],
  GeoPointUpdateWithoutPaddockInput: ["latitude", "longitude"],
  GrazeUpdateWithoutPaddockInput: ["startDatetime", "endDateTime", "mobIds", "mob"]
};

type InputTypesNames = keyof typeof inputTypes;

type InputTypeFieldNames<TInput extends InputTypesNames> = Exclude<
  keyof typeof inputTypes[TInput]["prototype"],
  number | symbol
>;

type InputTypeFieldsConfig<
  TInput extends InputTypesNames
  > = FieldsConfig<InputTypeFieldNames<TInput>>;

export type InputTypeConfig<TInput extends InputTypesNames> = {
  class?: ClassDecorator[];
  fields?: InputTypeFieldsConfig<TInput>;
};

export type InputTypesEnhanceMap = {
  [TInput in InputTypesNames]?: InputTypeConfig<TInput>;
};

export function applyInputTypesEnhanceMap(
  inputTypesEnhanceMap: InputTypesEnhanceMap,
) {
  for (const inputTypeEnhanceMapKey of Object.keys(inputTypesEnhanceMap)) {
    const inputTypeName = inputTypeEnhanceMapKey as keyof typeof inputTypesEnhanceMap;
    const typeConfig = inputTypesEnhanceMap[inputTypeName]!;
    const typeClass = inputTypes[inputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      inputsInfo[inputTypeName as keyof typeof inputsInfo],
    );
  }
}

