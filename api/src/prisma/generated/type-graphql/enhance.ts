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
  VisualId: crudResolvers.VisualIdCrudResolver,
  Pregnancy: crudResolvers.PregnancyCrudResolver,
  PregnancyTest: crudResolvers.PregnancyTestCrudResolver,
  ChemicalTreatment: crudResolvers.ChemicalTreatmentCrudResolver,
  ChemicalProduct: crudResolvers.ChemicalProductCrudResolver,
  Paddock: crudResolvers.PaddockCrudResolver,
  LivestockUnitPosition: crudResolvers.LivestockUnitPositionCrudResolver,
  GeoPoint: crudResolvers.GeoPointCrudResolver,
  WeightRecord: crudResolvers.WeightRecordCrudResolver,
  LoraDevice: crudResolvers.LoraDeviceCrudResolver
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
  VisualId: {
    aggregateVisualId: actionResolvers.AggregateVisualIdResolver,
    createManyVisualId: actionResolvers.CreateManyVisualIdResolver,
    createOneVisualId: actionResolvers.CreateOneVisualIdResolver,
    deleteManyVisualId: actionResolvers.DeleteManyVisualIdResolver,
    deleteOneVisualId: actionResolvers.DeleteOneVisualIdResolver,
    findFirstVisualId: actionResolvers.FindFirstVisualIdResolver,
    visualIds: actionResolvers.FindManyVisualIdResolver,
    visualId: actionResolvers.FindUniqueVisualIdResolver,
    groupByVisualId: actionResolvers.GroupByVisualIdResolver,
    updateManyVisualId: actionResolvers.UpdateManyVisualIdResolver,
    updateOneVisualId: actionResolvers.UpdateOneVisualIdResolver,
    upsertOneVisualId: actionResolvers.UpsertOneVisualIdResolver
  },
  Pregnancy: {
    aggregatePregnancy: actionResolvers.AggregatePregnancyResolver,
    createManyPregnancy: actionResolvers.CreateManyPregnancyResolver,
    createOnePregnancy: actionResolvers.CreateOnePregnancyResolver,
    deleteManyPregnancy: actionResolvers.DeleteManyPregnancyResolver,
    deleteOnePregnancy: actionResolvers.DeleteOnePregnancyResolver,
    findFirstPregnancy: actionResolvers.FindFirstPregnancyResolver,
    pregnancies: actionResolvers.FindManyPregnancyResolver,
    pregnancy: actionResolvers.FindUniquePregnancyResolver,
    groupByPregnancy: actionResolvers.GroupByPregnancyResolver,
    updateManyPregnancy: actionResolvers.UpdateManyPregnancyResolver,
    updateOnePregnancy: actionResolvers.UpdateOnePregnancyResolver,
    upsertOnePregnancy: actionResolvers.UpsertOnePregnancyResolver
  },
  PregnancyTest: {
    aggregatePregnancyTest: actionResolvers.AggregatePregnancyTestResolver,
    createManyPregnancyTest: actionResolvers.CreateManyPregnancyTestResolver,
    createOnePregnancyTest: actionResolvers.CreateOnePregnancyTestResolver,
    deleteManyPregnancyTest: actionResolvers.DeleteManyPregnancyTestResolver,
    deleteOnePregnancyTest: actionResolvers.DeleteOnePregnancyTestResolver,
    findFirstPregnancyTest: actionResolvers.FindFirstPregnancyTestResolver,
    pregnancyTests: actionResolvers.FindManyPregnancyTestResolver,
    pregnancyTest: actionResolvers.FindUniquePregnancyTestResolver,
    groupByPregnancyTest: actionResolvers.GroupByPregnancyTestResolver,
    updateManyPregnancyTest: actionResolvers.UpdateManyPregnancyTestResolver,
    updateOnePregnancyTest: actionResolvers.UpdateOnePregnancyTestResolver,
    upsertOnePregnancyTest: actionResolvers.UpsertOnePregnancyTestResolver
  },
  ChemicalTreatment: {
    aggregateChemicalTreatment: actionResolvers.AggregateChemicalTreatmentResolver,
    createManyChemicalTreatment: actionResolvers.CreateManyChemicalTreatmentResolver,
    createOneChemicalTreatment: actionResolvers.CreateOneChemicalTreatmentResolver,
    deleteManyChemicalTreatment: actionResolvers.DeleteManyChemicalTreatmentResolver,
    deleteOneChemicalTreatment: actionResolvers.DeleteOneChemicalTreatmentResolver,
    findFirstChemicalTreatment: actionResolvers.FindFirstChemicalTreatmentResolver,
    chemicalTreatments: actionResolvers.FindManyChemicalTreatmentResolver,
    chemicalTreatment: actionResolvers.FindUniqueChemicalTreatmentResolver,
    groupByChemicalTreatment: actionResolvers.GroupByChemicalTreatmentResolver,
    updateManyChemicalTreatment: actionResolvers.UpdateManyChemicalTreatmentResolver,
    updateOneChemicalTreatment: actionResolvers.UpdateOneChemicalTreatmentResolver,
    upsertOneChemicalTreatment: actionResolvers.UpsertOneChemicalTreatmentResolver
  },
  ChemicalProduct: {
    aggregateChemicalProduct: actionResolvers.AggregateChemicalProductResolver,
    createManyChemicalProduct: actionResolvers.CreateManyChemicalProductResolver,
    createOneChemicalProduct: actionResolvers.CreateOneChemicalProductResolver,
    deleteManyChemicalProduct: actionResolvers.DeleteManyChemicalProductResolver,
    deleteOneChemicalProduct: actionResolvers.DeleteOneChemicalProductResolver,
    findFirstChemicalProduct: actionResolvers.FindFirstChemicalProductResolver,
    chemicalProducts: actionResolvers.FindManyChemicalProductResolver,
    chemicalProduct: actionResolvers.FindUniqueChemicalProductResolver,
    groupByChemicalProduct: actionResolvers.GroupByChemicalProductResolver,
    updateManyChemicalProduct: actionResolvers.UpdateManyChemicalProductResolver,
    updateOneChemicalProduct: actionResolvers.UpdateOneChemicalProductResolver,
    upsertOneChemicalProduct: actionResolvers.UpsertOneChemicalProductResolver
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
  LivestockUnitPosition: {
    aggregateLivestockUnitPosition: actionResolvers.AggregateLivestockUnitPositionResolver,
    createManyLivestockUnitPosition: actionResolvers.CreateManyLivestockUnitPositionResolver,
    createOneLivestockUnitPosition: actionResolvers.CreateOneLivestockUnitPositionResolver,
    deleteManyLivestockUnitPosition: actionResolvers.DeleteManyLivestockUnitPositionResolver,
    deleteOneLivestockUnitPosition: actionResolvers.DeleteOneLivestockUnitPositionResolver,
    findFirstLivestockUnitPosition: actionResolvers.FindFirstLivestockUnitPositionResolver,
    livestockUnitPositions: actionResolvers.FindManyLivestockUnitPositionResolver,
    livestockUnitPosition: actionResolvers.FindUniqueLivestockUnitPositionResolver,
    groupByLivestockUnitPosition: actionResolvers.GroupByLivestockUnitPositionResolver,
    updateManyLivestockUnitPosition: actionResolvers.UpdateManyLivestockUnitPositionResolver,
    updateOneLivestockUnitPosition: actionResolvers.UpdateOneLivestockUnitPositionResolver,
    upsertOneLivestockUnitPosition: actionResolvers.UpsertOneLivestockUnitPositionResolver
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
  },
  LoraDevice: {
    aggregateLoraDevice: actionResolvers.AggregateLoraDeviceResolver,
    createManyLoraDevice: actionResolvers.CreateManyLoraDeviceResolver,
    createOneLoraDevice: actionResolvers.CreateOneLoraDeviceResolver,
    deleteManyLoraDevice: actionResolvers.DeleteManyLoraDeviceResolver,
    deleteOneLoraDevice: actionResolvers.DeleteOneLoraDeviceResolver,
    findFirstLoraDevice: actionResolvers.FindFirstLoraDeviceResolver,
    loraDevices: actionResolvers.FindManyLoraDeviceResolver,
    loraDevice: actionResolvers.FindUniqueLoraDeviceResolver,
    groupByLoraDevice: actionResolvers.GroupByLoraDeviceResolver,
    updateManyLoraDevice: actionResolvers.UpdateManyLoraDeviceResolver,
    updateOneLoraDevice: actionResolvers.UpdateOneLoraDeviceResolver,
    upsertOneLoraDevice: actionResolvers.UpsertOneLoraDeviceResolver
  }
};
const crudResolversInfo = {
  User: ["aggregateUser", "createManyUser", "createOneUser", "deleteManyUser", "deleteOneUser", "findFirstUser", "users", "user", "groupByUser", "updateManyUser", "updateOneUser", "upsertOneUser"],
  Graze: ["aggregateGraze", "createManyGraze", "createOneGraze", "deleteManyGraze", "deleteOneGraze", "findFirstGraze", "grazes", "graze", "groupByGraze", "updateManyGraze", "updateOneGraze", "upsertOneGraze"],
  Breed: ["aggregateBreed", "createManyBreed", "createOneBreed", "deleteManyBreed", "deleteOneBreed", "findFirstBreed", "breeds", "breed", "groupByBreed", "updateManyBreed", "updateOneBreed", "upsertOneBreed"],
  Mob: ["aggregateMob", "createManyMob", "createOneMob", "deleteManyMob", "deleteOneMob", "findFirstMob", "mobs", "mob", "groupByMob", "updateManyMob", "updateOneMob", "upsertOneMob"],
  LivestockUnit: ["aggregateLivestockUnit", "createManyLivestockUnit", "createOneLivestockUnit", "deleteManyLivestockUnit", "deleteOneLivestockUnit", "findFirstLivestockUnit", "livestockUnits", "livestockUnit", "groupByLivestockUnit", "updateManyLivestockUnit", "updateOneLivestockUnit", "upsertOneLivestockUnit"],
  VisualId: ["aggregateVisualId", "createManyVisualId", "createOneVisualId", "deleteManyVisualId", "deleteOneVisualId", "findFirstVisualId", "visualIds", "visualId", "groupByVisualId", "updateManyVisualId", "updateOneVisualId", "upsertOneVisualId"],
  Pregnancy: ["aggregatePregnancy", "createManyPregnancy", "createOnePregnancy", "deleteManyPregnancy", "deleteOnePregnancy", "findFirstPregnancy", "pregnancies", "pregnancy", "groupByPregnancy", "updateManyPregnancy", "updateOnePregnancy", "upsertOnePregnancy"],
  PregnancyTest: ["aggregatePregnancyTest", "createManyPregnancyTest", "createOnePregnancyTest", "deleteManyPregnancyTest", "deleteOnePregnancyTest", "findFirstPregnancyTest", "pregnancyTests", "pregnancyTest", "groupByPregnancyTest", "updateManyPregnancyTest", "updateOnePregnancyTest", "upsertOnePregnancyTest"],
  ChemicalTreatment: ["aggregateChemicalTreatment", "createManyChemicalTreatment", "createOneChemicalTreatment", "deleteManyChemicalTreatment", "deleteOneChemicalTreatment", "findFirstChemicalTreatment", "chemicalTreatments", "chemicalTreatment", "groupByChemicalTreatment", "updateManyChemicalTreatment", "updateOneChemicalTreatment", "upsertOneChemicalTreatment"],
  ChemicalProduct: ["aggregateChemicalProduct", "createManyChemicalProduct", "createOneChemicalProduct", "deleteManyChemicalProduct", "deleteOneChemicalProduct", "findFirstChemicalProduct", "chemicalProducts", "chemicalProduct", "groupByChemicalProduct", "updateManyChemicalProduct", "updateOneChemicalProduct", "upsertOneChemicalProduct"],
  Paddock: ["aggregatePaddock", "createManyPaddock", "createOnePaddock", "deleteManyPaddock", "deleteOnePaddock", "findFirstPaddock", "paddocks", "paddock", "groupByPaddock", "updateManyPaddock", "updateOnePaddock", "upsertOnePaddock"],
  LivestockUnitPosition: ["aggregateLivestockUnitPosition", "createManyLivestockUnitPosition", "createOneLivestockUnitPosition", "deleteManyLivestockUnitPosition", "deleteOneLivestockUnitPosition", "findFirstLivestockUnitPosition", "livestockUnitPositions", "livestockUnitPosition", "groupByLivestockUnitPosition", "updateManyLivestockUnitPosition", "updateOneLivestockUnitPosition", "upsertOneLivestockUnitPosition"],
  GeoPoint: ["aggregateGeoPoint", "createManyGeoPoint", "createOneGeoPoint", "deleteManyGeoPoint", "deleteOneGeoPoint", "findFirstGeoPoint", "geoPoints", "geoPoint", "groupByGeoPoint", "updateManyGeoPoint", "updateOneGeoPoint", "upsertOneGeoPoint"],
  WeightRecord: ["aggregateWeightRecord", "createManyWeightRecord", "createOneWeightRecord", "deleteManyWeightRecord", "deleteOneWeightRecord", "findFirstWeightRecord", "weightRecords", "weightRecord", "groupByWeightRecord", "updateManyWeightRecord", "updateOneWeightRecord", "upsertOneWeightRecord"],
  LoraDevice: ["aggregateLoraDevice", "createManyLoraDevice", "createOneLoraDevice", "deleteManyLoraDevice", "deleteOneLoraDevice", "findFirstLoraDevice", "loraDevices", "loraDevice", "groupByLoraDevice", "updateManyLoraDevice", "updateOneLoraDevice", "upsertOneLoraDevice"]
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
  AggregateVisualIdArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyVisualIdArgs: ["data"],
  CreateOneVisualIdArgs: ["data"],
  DeleteManyVisualIdArgs: ["where"],
  DeleteOneVisualIdArgs: ["where"],
  FindFirstVisualIdArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyVisualIdArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueVisualIdArgs: ["where"],
  GroupByVisualIdArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyVisualIdArgs: ["data", "where"],
  UpdateOneVisualIdArgs: ["data", "where"],
  UpsertOneVisualIdArgs: ["where", "create", "update"],
  AggregatePregnancyArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyPregnancyArgs: ["data"],
  CreateOnePregnancyArgs: ["data"],
  DeleteManyPregnancyArgs: ["where"],
  DeleteOnePregnancyArgs: ["where"],
  FindFirstPregnancyArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyPregnancyArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniquePregnancyArgs: ["where"],
  GroupByPregnancyArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyPregnancyArgs: ["data", "where"],
  UpdateOnePregnancyArgs: ["data", "where"],
  UpsertOnePregnancyArgs: ["where", "create", "update"],
  AggregatePregnancyTestArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyPregnancyTestArgs: ["data"],
  CreateOnePregnancyTestArgs: ["data"],
  DeleteManyPregnancyTestArgs: ["where"],
  DeleteOnePregnancyTestArgs: ["where"],
  FindFirstPregnancyTestArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyPregnancyTestArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniquePregnancyTestArgs: ["where"],
  GroupByPregnancyTestArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyPregnancyTestArgs: ["data", "where"],
  UpdateOnePregnancyTestArgs: ["data", "where"],
  UpsertOnePregnancyTestArgs: ["where", "create", "update"],
  AggregateChemicalTreatmentArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyChemicalTreatmentArgs: ["data"],
  CreateOneChemicalTreatmentArgs: ["data"],
  DeleteManyChemicalTreatmentArgs: ["where"],
  DeleteOneChemicalTreatmentArgs: ["where"],
  FindFirstChemicalTreatmentArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyChemicalTreatmentArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueChemicalTreatmentArgs: ["where"],
  GroupByChemicalTreatmentArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyChemicalTreatmentArgs: ["data", "where"],
  UpdateOneChemicalTreatmentArgs: ["data", "where"],
  UpsertOneChemicalTreatmentArgs: ["where", "create", "update"],
  AggregateChemicalProductArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyChemicalProductArgs: ["data"],
  CreateOneChemicalProductArgs: ["data"],
  DeleteManyChemicalProductArgs: ["where"],
  DeleteOneChemicalProductArgs: ["where"],
  FindFirstChemicalProductArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyChemicalProductArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueChemicalProductArgs: ["where"],
  GroupByChemicalProductArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyChemicalProductArgs: ["data", "where"],
  UpdateOneChemicalProductArgs: ["data", "where"],
  UpsertOneChemicalProductArgs: ["where", "create", "update"],
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
  AggregateLivestockUnitPositionArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyLivestockUnitPositionArgs: ["data"],
  CreateOneLivestockUnitPositionArgs: ["data"],
  DeleteManyLivestockUnitPositionArgs: ["where"],
  DeleteOneLivestockUnitPositionArgs: ["where"],
  FindFirstLivestockUnitPositionArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyLivestockUnitPositionArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueLivestockUnitPositionArgs: ["where"],
  GroupByLivestockUnitPositionArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyLivestockUnitPositionArgs: ["data", "where"],
  UpdateOneLivestockUnitPositionArgs: ["data", "where"],
  UpsertOneLivestockUnitPositionArgs: ["where", "create", "update"],
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
  UpsertOneWeightRecordArgs: ["where", "create", "update"],
  AggregateLoraDeviceArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyLoraDeviceArgs: ["data"],
  CreateOneLoraDeviceArgs: ["data"],
  DeleteManyLoraDeviceArgs: ["where"],
  DeleteOneLoraDeviceArgs: ["where"],
  FindFirstLoraDeviceArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyLoraDeviceArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueLoraDeviceArgs: ["where"],
  GroupByLoraDeviceArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyLoraDeviceArgs: ["data", "where"],
  UpdateOneLoraDeviceArgs: ["data", "where"],
  UpsertOneLoraDeviceArgs: ["where", "create", "update"]
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
  VisualId: relationResolvers.VisualIdRelationsResolver,
  Pregnancy: relationResolvers.PregnancyRelationsResolver,
  PregnancyTest: relationResolvers.PregnancyTestRelationsResolver,
  ChemicalTreatment: relationResolvers.ChemicalTreatmentRelationsResolver,
  ChemicalProduct: relationResolvers.ChemicalProductRelationsResolver,
  Paddock: relationResolvers.PaddockRelationsResolver,
  LivestockUnitPosition: relationResolvers.LivestockUnitPositionRelationsResolver,
  GeoPoint: relationResolvers.GeoPointRelationsResolver,
  WeightRecord: relationResolvers.WeightRecordRelationsResolver
};
const relationResolversInfo = {
  Graze: ["paddock", "mob"],
  Breed: ["members"],
  Mob: ["members", "graze"],
  LivestockUnit: ["visualid", "breed", "sire", "dam", "mob", "pregnancy", "weights", "treatments"],
  VisualId: ["livestockUnit"],
  Pregnancy: ["parents", "pregnancyTest"],
  PregnancyTest: ["pregnancy"],
  ChemicalTreatment: ["liveStockUnit", "product"],
  ChemicalProduct: ["treatment"],
  Paddock: ["polygon", "graze", "livestockUnitPosition"],
  LivestockUnitPosition: ["location", "paddock"],
  GeoPoint: ["paddock", "livestockUnitPosition"],
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
  Graze: ["id", "startDatetime", "endDateTime", "paddockId", "mobIds", "dseDaysPerHectare"],
  Breed: ["id", "name", "class", "livestockUnitId"],
  Mob: ["id", "name", "comment", "grazeIds"],
  LivestockUnit: ["id", "nlisid", "class", "name", "comment", "sex", "birthdate", "desexed", "parentId", "mobId", "pregnancyId", "drySheepEquivalent", "purchasePrice"],
  VisualId: ["id", "livestockUnitId", "colour", "number"],
  Pregnancy: ["id", "earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "parentId", "pregnancySireId"],
  PregnancyTest: ["id", "testDate", "testType", "resultDate", "result", "pregnancyId", "cost"],
  ChemicalTreatment: ["id", "livestockUnitId", "treatmentDate", "applicationMethod", "volume_ml", "witholdingPeriodDays"],
  ChemicalProduct: ["id", "chemicalTreatmentId", "manufacturer", "product_name", "serial_number", "volume_ml", "cost"],
  Paddock: ["id", "name", "areaHa", "livestockUnitPositionId"],
  LivestockUnitPosition: ["id", "date"],
  GeoPoint: ["id", "latitude", "longitude", "paddockId", "livestockUnitPositionId"],
  WeightRecord: ["id", "weight", "dateMeasured", "method", "livestockUnitId"],
  LoraDevice: ["id", "name", "deviceId", "deviceEui", "appEui", "appKey", "manufacturer", "partNumber", "activationMethod"]
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
  AggregateGraze: ["_count", "_avg", "_sum", "_min", "_max"],
  GrazeGroupBy: ["id", "startDatetime", "endDateTime", "paddockId", "mobIds", "dseDaysPerHectare", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateBreed: ["_count", "_min", "_max"],
  BreedGroupBy: ["id", "name", "class", "livestockUnitId", "_count", "_min", "_max"],
  AggregateMob: ["_count", "_min", "_max"],
  MobGroupBy: ["id", "name", "comment", "grazeIds", "_count", "_min", "_max"],
  AggregateLivestockUnit: ["_count", "_avg", "_sum", "_min", "_max"],
  LivestockUnitGroupBy: ["id", "nlisid", "class", "name", "comment", "sex", "birthdate", "desexed", "parentId", "mobId", "pregnancyId", "drySheepEquivalent", "purchasePrice", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateVisualId: ["_count", "_avg", "_sum", "_min", "_max"],
  VisualIdGroupBy: ["id", "livestockUnitId", "colour", "number", "_count", "_avg", "_sum", "_min", "_max"],
  AggregatePregnancy: ["_count", "_min", "_max"],
  PregnancyGroupBy: ["id", "earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "parentId", "pregnancySireId", "_count", "_min", "_max"],
  AggregatePregnancyTest: ["_count", "_avg", "_sum", "_min", "_max"],
  PregnancyTestGroupBy: ["id", "testDate", "testType", "resultDate", "result", "pregnancyId", "cost", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateChemicalTreatment: ["_count", "_avg", "_sum", "_min", "_max"],
  ChemicalTreatmentGroupBy: ["id", "livestockUnitId", "treatmentDate", "applicationMethod", "volume_ml", "witholdingPeriodDays", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateChemicalProduct: ["_count", "_avg", "_sum", "_min", "_max"],
  ChemicalProductGroupBy: ["id", "chemicalTreatmentId", "manufacturer", "product_name", "serial_number", "volume_ml", "cost", "_count", "_avg", "_sum", "_min", "_max"],
  AggregatePaddock: ["_count", "_avg", "_sum", "_min", "_max"],
  PaddockGroupBy: ["id", "name", "areaHa", "livestockUnitPositionId", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateLivestockUnitPosition: ["_count", "_min", "_max"],
  LivestockUnitPositionGroupBy: ["id", "date", "_count", "_min", "_max"],
  AggregateGeoPoint: ["_count", "_avg", "_sum", "_min", "_max"],
  GeoPointGroupBy: ["id", "latitude", "longitude", "paddockId", "livestockUnitPositionId", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateWeightRecord: ["_count", "_avg", "_sum", "_min", "_max"],
  WeightRecordGroupBy: ["id", "weight", "dateMeasured", "method", "livestockUnitId", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateLoraDevice: ["_count", "_min", "_max"],
  LoraDeviceGroupBy: ["id", "name", "deviceId", "deviceEui", "appEui", "appKey", "manufacturer", "partNumber", "activationMethod", "_count", "_min", "_max"],
  AffectedRowsOutput: ["count"],
  UserCountAggregate: ["id", "name", "_all"],
  UserMinAggregate: ["id", "name"],
  UserMaxAggregate: ["id", "name"],
  GrazeCount: ["mob"],
  GrazeCountAggregate: ["id", "startDatetime", "endDateTime", "paddockId", "mobIds", "dseDaysPerHectare", "_all"],
  GrazeAvgAggregate: ["dseDaysPerHectare"],
  GrazeSumAggregate: ["dseDaysPerHectare"],
  GrazeMinAggregate: ["id", "startDatetime", "endDateTime", "paddockId", "dseDaysPerHectare"],
  GrazeMaxAggregate: ["id", "startDatetime", "endDateTime", "paddockId", "dseDaysPerHectare"],
  BreedCountAggregate: ["id", "name", "class", "livestockUnitId", "_all"],
  BreedMinAggregate: ["id", "name", "class", "livestockUnitId"],
  BreedMaxAggregate: ["id", "name", "class", "livestockUnitId"],
  MobCount: ["members", "graze"],
  MobCountAggregate: ["id", "name", "comment", "grazeIds", "_all"],
  MobMinAggregate: ["id", "name", "comment"],
  MobMaxAggregate: ["id", "name", "comment"],
  LivestockUnitCount: ["pregnancy", "weights", "treatments"],
  LivestockUnitCountAggregate: ["id", "nlisid", "class", "name", "comment", "sex", "birthdate", "desexed", "parentId", "mobId", "pregnancyId", "drySheepEquivalent", "purchasePrice", "_all"],
  LivestockUnitAvgAggregate: ["drySheepEquivalent", "purchasePrice"],
  LivestockUnitSumAggregate: ["drySheepEquivalent", "purchasePrice"],
  LivestockUnitMinAggregate: ["id", "nlisid", "class", "name", "comment", "sex", "birthdate", "desexed", "parentId", "mobId", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitMaxAggregate: ["id", "nlisid", "class", "name", "comment", "sex", "birthdate", "desexed", "parentId", "mobId", "drySheepEquivalent", "purchasePrice"],
  VisualIdCountAggregate: ["id", "livestockUnitId", "colour", "number", "_all"],
  VisualIdAvgAggregate: ["number"],
  VisualIdSumAggregate: ["number"],
  VisualIdMinAggregate: ["id", "livestockUnitId", "colour", "number"],
  VisualIdMaxAggregate: ["id", "livestockUnitId", "colour", "number"],
  PregnancyCount: ["parents", "pregnancyTest"],
  PregnancyCountAggregate: ["id", "earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "parentId", "pregnancySireId", "_all"],
  PregnancyMinAggregate: ["id", "earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "pregnancySireId"],
  PregnancyMaxAggregate: ["id", "earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "pregnancySireId"],
  PregnancyTestCountAggregate: ["id", "testDate", "testType", "resultDate", "result", "pregnancyId", "cost", "_all"],
  PregnancyTestAvgAggregate: ["cost"],
  PregnancyTestSumAggregate: ["cost"],
  PregnancyTestMinAggregate: ["id", "testDate", "testType", "resultDate", "result", "pregnancyId", "cost"],
  PregnancyTestMaxAggregate: ["id", "testDate", "testType", "resultDate", "result", "pregnancyId", "cost"],
  ChemicalTreatmentCountAggregate: ["id", "livestockUnitId", "treatmentDate", "applicationMethod", "volume_ml", "witholdingPeriodDays", "_all"],
  ChemicalTreatmentAvgAggregate: ["volume_ml", "witholdingPeriodDays"],
  ChemicalTreatmentSumAggregate: ["volume_ml", "witholdingPeriodDays"],
  ChemicalTreatmentMinAggregate: ["id", "livestockUnitId", "treatmentDate", "applicationMethod", "volume_ml", "witholdingPeriodDays"],
  ChemicalTreatmentMaxAggregate: ["id", "livestockUnitId", "treatmentDate", "applicationMethod", "volume_ml", "witholdingPeriodDays"],
  ChemicalProductCountAggregate: ["id", "chemicalTreatmentId", "manufacturer", "product_name", "serial_number", "volume_ml", "cost", "_all"],
  ChemicalProductAvgAggregate: ["volume_ml", "cost"],
  ChemicalProductSumAggregate: ["volume_ml", "cost"],
  ChemicalProductMinAggregate: ["id", "chemicalTreatmentId", "manufacturer", "product_name", "serial_number", "volume_ml", "cost"],
  ChemicalProductMaxAggregate: ["id", "chemicalTreatmentId", "manufacturer", "product_name", "serial_number", "volume_ml", "cost"],
  PaddockCount: ["polygon", "graze"],
  PaddockCountAggregate: ["id", "name", "areaHa", "livestockUnitPositionId", "_all"],
  PaddockAvgAggregate: ["areaHa"],
  PaddockSumAggregate: ["areaHa"],
  PaddockMinAggregate: ["id", "name", "areaHa", "livestockUnitPositionId"],
  PaddockMaxAggregate: ["id", "name", "areaHa", "livestockUnitPositionId"],
  LivestockUnitPositionCountAggregate: ["id", "date", "_all"],
  LivestockUnitPositionMinAggregate: ["id", "date"],
  LivestockUnitPositionMaxAggregate: ["id", "date"],
  GeoPointCountAggregate: ["id", "latitude", "longitude", "paddockId", "livestockUnitPositionId", "_all"],
  GeoPointAvgAggregate: ["latitude", "longitude"],
  GeoPointSumAggregate: ["latitude", "longitude"],
  GeoPointMinAggregate: ["id", "latitude", "longitude", "paddockId", "livestockUnitPositionId"],
  GeoPointMaxAggregate: ["id", "latitude", "longitude", "paddockId", "livestockUnitPositionId"],
  WeightRecordCountAggregate: ["id", "weight", "dateMeasured", "method", "livestockUnitId", "_all"],
  WeightRecordAvgAggregate: ["weight"],
  WeightRecordSumAggregate: ["weight"],
  WeightRecordMinAggregate: ["id", "weight", "dateMeasured", "method", "livestockUnitId"],
  WeightRecordMaxAggregate: ["id", "weight", "dateMeasured", "method", "livestockUnitId"],
  LoraDeviceCountAggregate: ["id", "name", "deviceId", "deviceEui", "appEui", "appKey", "manufacturer", "partNumber", "activationMethod", "_all"],
  LoraDeviceMinAggregate: ["id", "name", "deviceId", "deviceEui", "appEui", "appKey", "manufacturer", "partNumber", "activationMethod"],
  LoraDeviceMaxAggregate: ["id", "name", "deviceId", "deviceEui", "appEui", "appKey", "manufacturer", "partNumber", "activationMethod"]
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
  GrazeWhereInput: ["AND", "OR", "NOT", "id", "startDatetime", "endDateTime", "paddock", "paddockId", "mobIds", "mob", "dseDaysPerHectare"],
  GrazeOrderByWithRelationInput: ["id", "startDatetime", "endDateTime", "paddock", "paddockId", "mobIds", "mob", "dseDaysPerHectare"],
  GrazeWhereUniqueInput: ["id", "paddockId"],
  GrazeOrderByWithAggregationInput: ["id", "startDatetime", "endDateTime", "paddockId", "mobIds", "dseDaysPerHectare", "_count", "_avg", "_max", "_min", "_sum"],
  GrazeScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "startDatetime", "endDateTime", "paddockId", "mobIds", "dseDaysPerHectare"],
  BreedWhereInput: ["AND", "OR", "NOT", "id", "name", "class", "members", "livestockUnitId"],
  BreedOrderByWithRelationInput: ["id", "name", "class", "members", "livestockUnitId"],
  BreedWhereUniqueInput: ["id", "livestockUnitId"],
  BreedOrderByWithAggregationInput: ["id", "name", "class", "livestockUnitId", "_count", "_max", "_min"],
  BreedScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "name", "class", "livestockUnitId"],
  MobWhereInput: ["AND", "OR", "NOT", "id", "name", "members", "comment", "grazeIds", "graze"],
  MobOrderByWithRelationInput: ["id", "name", "members", "comment", "grazeIds", "graze"],
  MobWhereUniqueInput: ["id"],
  MobOrderByWithAggregationInput: ["id", "name", "comment", "grazeIds", "_count", "_max", "_min"],
  MobScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "name", "comment", "grazeIds"],
  LivestockUnitWhereInput: ["AND", "OR", "NOT", "id", "nlisid", "visualid", "class", "breed", "name", "comment", "sex", "birthdate", "desexed", "parentId", "sire", "dam", "mob", "mobId", "pregnancy", "pregnancyId", "weights", "treatments", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitOrderByWithRelationInput: ["id", "nlisid", "visualid", "class", "breed", "name", "comment", "sex", "birthdate", "desexed", "parentId", "sire", "dam", "mob", "mobId", "pregnancy", "pregnancyId", "weights", "treatments", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitWhereUniqueInput: ["id", "parentId"],
  LivestockUnitOrderByWithAggregationInput: ["id", "nlisid", "class", "name", "comment", "sex", "birthdate", "desexed", "parentId", "mobId", "pregnancyId", "drySheepEquivalent", "purchasePrice", "_count", "_avg", "_max", "_min", "_sum"],
  LivestockUnitScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "nlisid", "class", "name", "comment", "sex", "birthdate", "desexed", "parentId", "mobId", "pregnancyId", "drySheepEquivalent", "purchasePrice"],
  VisualIdWhereInput: ["AND", "OR", "NOT", "id", "livestockUnit", "livestockUnitId", "colour", "number"],
  VisualIdOrderByWithRelationInput: ["id", "livestockUnit", "livestockUnitId", "colour", "number"],
  VisualIdWhereUniqueInput: ["id", "livestockUnitId"],
  VisualIdOrderByWithAggregationInput: ["id", "livestockUnitId", "colour", "number", "_count", "_avg", "_max", "_min", "_sum"],
  VisualIdScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "livestockUnitId", "colour", "number"],
  PregnancyWhereInput: ["AND", "OR", "NOT", "id", "earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "parentId", "parents", "pregnancySireId", "pregnancyTest"],
  PregnancyOrderByWithRelationInput: ["id", "earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "parentId", "parents", "pregnancySireId", "pregnancyTest"],
  PregnancyWhereUniqueInput: ["id", "parentId"],
  PregnancyOrderByWithAggregationInput: ["id", "earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "parentId", "pregnancySireId", "_count", "_max", "_min"],
  PregnancyScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "parentId", "pregnancySireId"],
  PregnancyTestWhereInput: ["AND", "OR", "NOT", "id", "testDate", "testType", "resultDate", "result", "pregnancyId", "pregnancy", "cost"],
  PregnancyTestOrderByWithRelationInput: ["id", "testDate", "testType", "resultDate", "result", "pregnancyId", "pregnancy", "cost"],
  PregnancyTestWhereUniqueInput: ["id", "pregnancyId"],
  PregnancyTestOrderByWithAggregationInput: ["id", "testDate", "testType", "resultDate", "result", "pregnancyId", "cost", "_count", "_avg", "_max", "_min", "_sum"],
  PregnancyTestScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "testDate", "testType", "resultDate", "result", "pregnancyId", "cost"],
  ChemicalTreatmentWhereInput: ["AND", "OR", "NOT", "id", "liveStockUnit", "livestockUnitId", "treatmentDate", "applicationMethod", "product", "volume_ml", "witholdingPeriodDays"],
  ChemicalTreatmentOrderByWithRelationInput: ["id", "liveStockUnit", "livestockUnitId", "treatmentDate", "applicationMethod", "product", "volume_ml", "witholdingPeriodDays"],
  ChemicalTreatmentWhereUniqueInput: ["id", "livestockUnitId"],
  ChemicalTreatmentOrderByWithAggregationInput: ["id", "livestockUnitId", "treatmentDate", "applicationMethod", "volume_ml", "witholdingPeriodDays", "_count", "_avg", "_max", "_min", "_sum"],
  ChemicalTreatmentScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "livestockUnitId", "treatmentDate", "applicationMethod", "volume_ml", "witholdingPeriodDays"],
  ChemicalProductWhereInput: ["AND", "OR", "NOT", "id", "treatment", "chemicalTreatmentId", "manufacturer", "product_name", "serial_number", "volume_ml", "cost"],
  ChemicalProductOrderByWithRelationInput: ["id", "treatment", "chemicalTreatmentId", "manufacturer", "product_name", "serial_number", "volume_ml", "cost"],
  ChemicalProductWhereUniqueInput: ["id", "chemicalTreatmentId", "serial_number"],
  ChemicalProductOrderByWithAggregationInput: ["id", "chemicalTreatmentId", "manufacturer", "product_name", "serial_number", "volume_ml", "cost", "_count", "_avg", "_max", "_min", "_sum"],
  ChemicalProductScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "chemicalTreatmentId", "manufacturer", "product_name", "serial_number", "volume_ml", "cost"],
  PaddockWhereInput: ["AND", "OR", "NOT", "id", "name", "polygon", "areaHa", "graze", "livestockUnitPosition", "livestockUnitPositionId"],
  PaddockOrderByWithRelationInput: ["id", "name", "polygon", "areaHa", "graze", "livestockUnitPosition", "livestockUnitPositionId"],
  PaddockWhereUniqueInput: ["id", "livestockUnitPositionId"],
  PaddockOrderByWithAggregationInput: ["id", "name", "areaHa", "livestockUnitPositionId", "_count", "_avg", "_max", "_min", "_sum"],
  PaddockScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "name", "areaHa", "livestockUnitPositionId"],
  LivestockUnitPositionWhereInput: ["AND", "OR", "NOT", "id", "date", "location", "paddock"],
  LivestockUnitPositionOrderByWithRelationInput: ["id", "date", "location", "paddock"],
  LivestockUnitPositionWhereUniqueInput: ["id"],
  LivestockUnitPositionOrderByWithAggregationInput: ["id", "date", "_count", "_max", "_min"],
  LivestockUnitPositionScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "date"],
  GeoPointWhereInput: ["AND", "OR", "NOT", "id", "latitude", "longitude", "paddock", "paddockId", "livestockUnitPosition", "livestockUnitPositionId"],
  GeoPointOrderByWithRelationInput: ["id", "latitude", "longitude", "paddock", "paddockId", "livestockUnitPosition", "livestockUnitPositionId"],
  GeoPointWhereUniqueInput: ["id", "paddockId", "livestockUnitPositionId"],
  GeoPointOrderByWithAggregationInput: ["id", "latitude", "longitude", "paddockId", "livestockUnitPositionId", "_count", "_avg", "_max", "_min", "_sum"],
  GeoPointScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "latitude", "longitude", "paddockId", "livestockUnitPositionId"],
  WeightRecordWhereInput: ["AND", "OR", "NOT", "id", "weight", "dateMeasured", "method", "livestockUnit", "livestockUnitId"],
  WeightRecordOrderByWithRelationInput: ["id", "weight", "dateMeasured", "method", "livestockUnit", "livestockUnitId"],
  WeightRecordWhereUniqueInput: ["id", "livestockUnitId"],
  WeightRecordOrderByWithAggregationInput: ["id", "weight", "dateMeasured", "method", "livestockUnitId", "_count", "_avg", "_max", "_min", "_sum"],
  WeightRecordScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "weight", "dateMeasured", "method", "livestockUnitId"],
  LoraDeviceWhereInput: ["AND", "OR", "NOT", "id", "name", "deviceId", "deviceEui", "appEui", "appKey", "manufacturer", "partNumber", "activationMethod"],
  LoraDeviceOrderByWithRelationInput: ["id", "name", "deviceId", "deviceEui", "appEui", "appKey", "manufacturer", "partNumber", "activationMethod"],
  LoraDeviceWhereUniqueInput: ["id"],
  LoraDeviceOrderByWithAggregationInput: ["id", "name", "deviceId", "deviceEui", "appEui", "appKey", "manufacturer", "partNumber", "activationMethod", "_count", "_max", "_min"],
  LoraDeviceScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "name", "deviceId", "deviceEui", "appEui", "appKey", "manufacturer", "partNumber", "activationMethod"],
  UserCreateInput: ["id", "name"],
  UserUpdateInput: ["name"],
  UserCreateManyInput: ["id", "name"],
  UserUpdateManyMutationInput: ["name"],
  GrazeCreateInput: ["id", "startDatetime", "endDateTime", "paddock", "mobIds", "mob", "dseDaysPerHectare"],
  GrazeUpdateInput: ["startDatetime", "endDateTime", "paddock", "mobIds", "mob", "dseDaysPerHectare"],
  GrazeCreateManyInput: ["id", "startDatetime", "endDateTime", "paddockId", "mobIds", "dseDaysPerHectare"],
  GrazeUpdateManyMutationInput: ["startDatetime", "endDateTime", "mobIds", "dseDaysPerHectare"],
  BreedCreateInput: ["id", "name", "class", "members"],
  BreedUpdateInput: ["name", "class", "members"],
  BreedCreateManyInput: ["id", "name", "class", "livestockUnitId"],
  BreedUpdateManyMutationInput: ["name", "class"],
  MobCreateInput: ["id", "name", "members", "comment", "grazeIds", "graze"],
  MobUpdateInput: ["name", "members", "comment", "grazeIds", "graze"],
  MobCreateManyInput: ["id", "name", "comment", "grazeIds"],
  MobUpdateManyMutationInput: ["name", "comment", "grazeIds"],
  LivestockUnitCreateInput: ["id", "nlisid", "visualid", "class", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "mob", "pregnancy", "pregnancyId", "weights", "treatments", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitUpdateInput: ["nlisid", "visualid", "class", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "mob", "pregnancy", "pregnancyId", "weights", "treatments", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitCreateManyInput: ["id", "nlisid", "class", "name", "comment", "sex", "birthdate", "desexed", "parentId", "mobId", "pregnancyId", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitUpdateManyMutationInput: ["nlisid", "class", "name", "comment", "sex", "birthdate", "desexed", "pregnancyId", "drySheepEquivalent", "purchasePrice"],
  VisualIdCreateInput: ["id", "livestockUnit", "colour", "number"],
  VisualIdUpdateInput: ["livestockUnit", "colour", "number"],
  VisualIdCreateManyInput: ["id", "livestockUnitId", "colour", "number"],
  VisualIdUpdateManyMutationInput: ["colour", "number"],
  PregnancyCreateInput: ["id", "earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "parentId", "parents", "pregnancySireId", "pregnancyTest"],
  PregnancyUpdateInput: ["earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "parentId", "parents", "pregnancySireId", "pregnancyTest"],
  PregnancyCreateManyInput: ["id", "earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "parentId", "pregnancySireId"],
  PregnancyUpdateManyMutationInput: ["earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "parentId", "pregnancySireId"],
  PregnancyTestCreateInput: ["id", "testDate", "testType", "resultDate", "result", "pregnancy", "cost"],
  PregnancyTestUpdateInput: ["testDate", "testType", "resultDate", "result", "pregnancy", "cost"],
  PregnancyTestCreateManyInput: ["id", "testDate", "testType", "resultDate", "result", "pregnancyId", "cost"],
  PregnancyTestUpdateManyMutationInput: ["testDate", "testType", "resultDate", "result", "cost"],
  ChemicalTreatmentCreateInput: ["id", "liveStockUnit", "treatmentDate", "applicationMethod", "product", "volume_ml", "witholdingPeriodDays"],
  ChemicalTreatmentUpdateInput: ["liveStockUnit", "treatmentDate", "applicationMethod", "product", "volume_ml", "witholdingPeriodDays"],
  ChemicalTreatmentCreateManyInput: ["id", "livestockUnitId", "treatmentDate", "applicationMethod", "volume_ml", "witholdingPeriodDays"],
  ChemicalTreatmentUpdateManyMutationInput: ["treatmentDate", "applicationMethod", "volume_ml", "witholdingPeriodDays"],
  ChemicalProductCreateInput: ["id", "treatment", "manufacturer", "product_name", "serial_number", "volume_ml", "cost"],
  ChemicalProductUpdateInput: ["treatment", "manufacturer", "product_name", "serial_number", "volume_ml", "cost"],
  ChemicalProductCreateManyInput: ["id", "chemicalTreatmentId", "manufacturer", "product_name", "serial_number", "volume_ml", "cost"],
  ChemicalProductUpdateManyMutationInput: ["manufacturer", "product_name", "serial_number", "volume_ml", "cost"],
  PaddockCreateInput: ["id", "name", "polygon", "areaHa", "graze", "livestockUnitPosition"],
  PaddockUpdateInput: ["name", "polygon", "areaHa", "graze", "livestockUnitPosition"],
  PaddockCreateManyInput: ["id", "name", "areaHa", "livestockUnitPositionId"],
  PaddockUpdateManyMutationInput: ["name", "areaHa"],
  LivestockUnitPositionCreateInput: ["id", "date", "location", "paddock"],
  LivestockUnitPositionUpdateInput: ["date", "location", "paddock"],
  LivestockUnitPositionCreateManyInput: ["id", "date"],
  LivestockUnitPositionUpdateManyMutationInput: ["date"],
  GeoPointCreateInput: ["id", "latitude", "longitude", "paddock", "livestockUnitPosition"],
  GeoPointUpdateInput: ["latitude", "longitude", "paddock", "livestockUnitPosition"],
  GeoPointCreateManyInput: ["id", "latitude", "longitude", "paddockId", "livestockUnitPositionId"],
  GeoPointUpdateManyMutationInput: ["latitude", "longitude"],
  WeightRecordCreateInput: ["id", "weight", "dateMeasured", "method", "livestockUnit"],
  WeightRecordUpdateInput: ["weight", "dateMeasured", "method", "livestockUnit"],
  WeightRecordCreateManyInput: ["id", "weight", "dateMeasured", "method", "livestockUnitId"],
  WeightRecordUpdateManyMutationInput: ["weight", "dateMeasured", "method"],
  LoraDeviceCreateInput: ["id", "name", "deviceId", "deviceEui", "appEui", "appKey", "manufacturer", "partNumber", "activationMethod"],
  LoraDeviceUpdateInput: ["name", "deviceId", "deviceEui", "appEui", "appKey", "manufacturer", "partNumber", "activationMethod"],
  LoraDeviceCreateManyInput: ["id", "name", "deviceId", "deviceEui", "appEui", "appKey", "manufacturer", "partNumber", "activationMethod"],
  LoraDeviceUpdateManyMutationInput: ["name", "deviceId", "deviceEui", "appEui", "appKey", "manufacturer", "partNumber", "activationMethod"],
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
  FloatNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "isSet"],
  MobOrderByRelationAggregateInput: ["_count"],
  GrazeCountOrderByAggregateInput: ["id", "startDatetime", "endDateTime", "paddockId", "mobIds", "dseDaysPerHectare"],
  GrazeAvgOrderByAggregateInput: ["dseDaysPerHectare"],
  GrazeMaxOrderByAggregateInput: ["id", "startDatetime", "endDateTime", "paddockId", "dseDaysPerHectare"],
  GrazeMinOrderByAggregateInput: ["id", "startDatetime", "endDateTime", "paddockId", "dseDaysPerHectare"],
  GrazeSumOrderByAggregateInput: ["dseDaysPerHectare"],
  DateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  DateTimeNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max", "isSet"],
  FloatNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max", "isSet"],
  EnumStockClassFilter: ["equals", "in", "notIn", "not"],
  LivestockUnitRelationFilter: ["is", "isNot"],
  BreedCountOrderByAggregateInput: ["id", "name", "class", "livestockUnitId"],
  BreedMaxOrderByAggregateInput: ["id", "name", "class", "livestockUnitId"],
  BreedMinOrderByAggregateInput: ["id", "name", "class", "livestockUnitId"],
  EnumStockClassWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  LivestockUnitListRelationFilter: ["every", "some", "none"],
  GrazeListRelationFilter: ["every", "some", "none"],
  LivestockUnitOrderByRelationAggregateInput: ["_count"],
  GrazeOrderByRelationAggregateInput: ["_count"],
  MobCountOrderByAggregateInput: ["id", "name", "comment", "grazeIds"],
  MobMaxOrderByAggregateInput: ["id", "name", "comment"],
  MobMinOrderByAggregateInput: ["id", "name", "comment"],
  VisualIdRelationFilter: ["is", "isNot"],
  BreedRelationFilter: ["is", "isNot"],
  EnumSexFilter: ["equals", "in", "notIn", "not"],
  BoolFilter: ["equals", "not"],
  MobRelationFilter: ["is", "isNot"],
  PregnancyListRelationFilter: ["every", "some", "none"],
  WeightRecordListRelationFilter: ["every", "some", "none"],
  ChemicalTreatmentListRelationFilter: ["every", "some", "none"],
  IntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  FloatFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  PregnancyOrderByRelationAggregateInput: ["_count"],
  WeightRecordOrderByRelationAggregateInput: ["_count"],
  ChemicalTreatmentOrderByRelationAggregateInput: ["_count"],
  LivestockUnitCountOrderByAggregateInput: ["id", "nlisid", "class", "name", "comment", "sex", "birthdate", "desexed", "parentId", "mobId", "pregnancyId", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitAvgOrderByAggregateInput: ["drySheepEquivalent", "purchasePrice"],
  LivestockUnitMaxOrderByAggregateInput: ["id", "nlisid", "class", "name", "comment", "sex", "birthdate", "desexed", "parentId", "mobId", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitMinOrderByAggregateInput: ["id", "nlisid", "class", "name", "comment", "sex", "birthdate", "desexed", "parentId", "mobId", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitSumOrderByAggregateInput: ["drySheepEquivalent", "purchasePrice"],
  EnumSexWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  BoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
  IntWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  FloatWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  EnumVisualIdColourNullableFilter: ["equals", "in", "notIn", "not", "isSet"],
  IntNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "isSet"],
  VisualIdCountOrderByAggregateInput: ["id", "livestockUnitId", "colour", "number"],
  VisualIdAvgOrderByAggregateInput: ["number"],
  VisualIdMaxOrderByAggregateInput: ["id", "livestockUnitId", "colour", "number"],
  VisualIdMinOrderByAggregateInput: ["id", "livestockUnitId", "colour", "number"],
  VisualIdSumOrderByAggregateInput: ["number"],
  EnumVisualIdColourNullableWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max", "isSet"],
  IntNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max", "isSet"],
  PregnancyTestListRelationFilter: ["every", "some", "none"],
  PregnancyTestOrderByRelationAggregateInput: ["_count"],
  PregnancyCountOrderByAggregateInput: ["id", "earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "parentId", "pregnancySireId"],
  PregnancyMaxOrderByAggregateInput: ["id", "earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "pregnancySireId"],
  PregnancyMinOrderByAggregateInput: ["id", "earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "pregnancySireId"],
  EnumPregnancyTestTypeFilter: ["equals", "in", "notIn", "not"],
  EnumPregnancyTestResultFilter: ["equals", "in", "notIn", "not"],
  PregnancyRelationFilter: ["is", "isNot"],
  PregnancyTestCountOrderByAggregateInput: ["id", "testDate", "testType", "resultDate", "result", "pregnancyId", "cost"],
  PregnancyTestAvgOrderByAggregateInput: ["cost"],
  PregnancyTestMaxOrderByAggregateInput: ["id", "testDate", "testType", "resultDate", "result", "pregnancyId", "cost"],
  PregnancyTestMinOrderByAggregateInput: ["id", "testDate", "testType", "resultDate", "result", "pregnancyId", "cost"],
  PregnancyTestSumOrderByAggregateInput: ["cost"],
  EnumPregnancyTestTypeWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  EnumPregnancyTestResultWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  EnumApplicationMethodFilter: ["equals", "in", "notIn", "not"],
  ChemicalProductRelationFilter: ["is", "isNot"],
  ChemicalTreatmentCountOrderByAggregateInput: ["id", "livestockUnitId", "treatmentDate", "applicationMethod", "volume_ml", "witholdingPeriodDays"],
  ChemicalTreatmentAvgOrderByAggregateInput: ["volume_ml", "witholdingPeriodDays"],
  ChemicalTreatmentMaxOrderByAggregateInput: ["id", "livestockUnitId", "treatmentDate", "applicationMethod", "volume_ml", "witholdingPeriodDays"],
  ChemicalTreatmentMinOrderByAggregateInput: ["id", "livestockUnitId", "treatmentDate", "applicationMethod", "volume_ml", "witholdingPeriodDays"],
  ChemicalTreatmentSumOrderByAggregateInput: ["volume_ml", "witholdingPeriodDays"],
  EnumApplicationMethodWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  ChemicalTreatmentRelationFilter: ["is", "isNot"],
  ChemicalProductCountOrderByAggregateInput: ["id", "chemicalTreatmentId", "manufacturer", "product_name", "serial_number", "volume_ml", "cost"],
  ChemicalProductAvgOrderByAggregateInput: ["volume_ml", "cost"],
  ChemicalProductMaxOrderByAggregateInput: ["id", "chemicalTreatmentId", "manufacturer", "product_name", "serial_number", "volume_ml", "cost"],
  ChemicalProductMinOrderByAggregateInput: ["id", "chemicalTreatmentId", "manufacturer", "product_name", "serial_number", "volume_ml", "cost"],
  ChemicalProductSumOrderByAggregateInput: ["volume_ml", "cost"],
  GeoPointListRelationFilter: ["every", "some", "none"],
  LivestockUnitPositionRelationFilter: ["is", "isNot"],
  GeoPointOrderByRelationAggregateInput: ["_count"],
  PaddockCountOrderByAggregateInput: ["id", "name", "areaHa", "livestockUnitPositionId"],
  PaddockAvgOrderByAggregateInput: ["areaHa"],
  PaddockMaxOrderByAggregateInput: ["id", "name", "areaHa", "livestockUnitPositionId"],
  PaddockMinOrderByAggregateInput: ["id", "name", "areaHa", "livestockUnitPositionId"],
  PaddockSumOrderByAggregateInput: ["areaHa"],
  GeoPointRelationFilter: ["is", "isNot"],
  LivestockUnitPositionCountOrderByAggregateInput: ["id", "date"],
  LivestockUnitPositionMaxOrderByAggregateInput: ["id", "date"],
  LivestockUnitPositionMinOrderByAggregateInput: ["id", "date"],
  GeoPointCountOrderByAggregateInput: ["id", "latitude", "longitude", "paddockId", "livestockUnitPositionId"],
  GeoPointAvgOrderByAggregateInput: ["latitude", "longitude"],
  GeoPointMaxOrderByAggregateInput: ["id", "latitude", "longitude", "paddockId", "livestockUnitPositionId"],
  GeoPointMinOrderByAggregateInput: ["id", "latitude", "longitude", "paddockId", "livestockUnitPositionId"],
  GeoPointSumOrderByAggregateInput: ["latitude", "longitude"],
  EnumWeighMethodFilter: ["equals", "in", "notIn", "not"],
  WeightRecordCountOrderByAggregateInput: ["id", "weight", "dateMeasured", "method", "livestockUnitId"],
  WeightRecordAvgOrderByAggregateInput: ["weight"],
  WeightRecordMaxOrderByAggregateInput: ["id", "weight", "dateMeasured", "method", "livestockUnitId"],
  WeightRecordMinOrderByAggregateInput: ["id", "weight", "dateMeasured", "method", "livestockUnitId"],
  WeightRecordSumOrderByAggregateInput: ["weight"],
  EnumWeighMethodWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  EnumLoraActivationMethodFilter: ["equals", "in", "notIn", "not"],
  LoraDeviceCountOrderByAggregateInput: ["id", "name", "deviceId", "deviceEui", "appEui", "appKey", "manufacturer", "partNumber", "activationMethod"],
  LoraDeviceMaxOrderByAggregateInput: ["id", "name", "deviceId", "deviceEui", "appEui", "appKey", "manufacturer", "partNumber", "activationMethod"],
  LoraDeviceMinOrderByAggregateInput: ["id", "name", "deviceId", "deviceEui", "appEui", "appKey", "manufacturer", "partNumber", "activationMethod"],
  EnumLoraActivationMethodWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  NullableStringFieldUpdateOperationsInput: ["set", "unset"],
  PaddockCreateNestedOneWithoutGrazeInput: ["create", "connectOrCreate", "connect"],
  GrazeCreatemobIdsInput: ["set"],
  MobCreateNestedManyWithoutGrazeInput: ["create", "connectOrCreate", "connect"],
  DateTimeFieldUpdateOperationsInput: ["set"],
  NullableDateTimeFieldUpdateOperationsInput: ["set", "unset"],
  PaddockUpdateOneRequiredWithoutGrazeNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  GrazeUpdatemobIdsInput: ["set", "push"],
  MobUpdateManyWithoutGrazeNestedInput: ["create", "connectOrCreate", "upsert", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  NullableFloatFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide", "unset"],
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
  VisualIdCreateNestedOneWithoutLivestockUnitInput: ["create", "connectOrCreate", "connect"],
  BreedCreateNestedOneWithoutMembersInput: ["create", "connectOrCreate", "connect"],
  LivestockUnitCreateNestedOneWithoutDamInput: ["create", "connectOrCreate", "connect"],
  LivestockUnitCreateNestedOneWithoutSireInput: ["create", "connectOrCreate", "connect"],
  MobCreateNestedOneWithoutMembersInput: ["create", "connectOrCreate", "connect"],
  PregnancyCreateNestedManyWithoutParentsInput: ["create", "connectOrCreate", "connect"],
  LivestockUnitCreatepregnancyIdInput: ["set"],
  WeightRecordCreateNestedManyWithoutLivestockUnitInput: ["create", "connectOrCreate", "createMany", "connect"],
  ChemicalTreatmentCreateNestedManyWithoutLiveStockUnitInput: ["create", "connectOrCreate", "createMany", "connect"],
  VisualIdUpdateOneWithoutLivestockUnitNestedInput: ["create", "connectOrCreate", "upsert", "disconnect", "delete", "connect", "update"],
  BreedUpdateOneWithoutMembersNestedInput: ["create", "connectOrCreate", "upsert", "disconnect", "delete", "connect", "update"],
  EnumSexFieldUpdateOperationsInput: ["set"],
  BoolFieldUpdateOperationsInput: ["set"],
  LivestockUnitUpdateOneWithoutDamNestedInput: ["create", "connectOrCreate", "upsert", "disconnect", "delete", "connect", "update"],
  LivestockUnitUpdateOneWithoutSireNestedInput: ["create", "connectOrCreate", "upsert", "disconnect", "delete", "connect", "update"],
  MobUpdateOneRequiredWithoutMembersNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  PregnancyUpdateManyWithoutParentsNestedInput: ["create", "connectOrCreate", "upsert", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  LivestockUnitUpdatepregnancyIdInput: ["set", "push"],
  WeightRecordUpdateManyWithoutLivestockUnitNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  ChemicalTreatmentUpdateManyWithoutLiveStockUnitNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  IntFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  FloatFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  LivestockUnitCreateNestedOneWithoutVisualidInput: ["create", "connectOrCreate", "connect"],
  LivestockUnitUpdateOneRequiredWithoutVisualidNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  NullableEnumVisualIdColourFieldUpdateOperationsInput: ["set", "unset"],
  NullableIntFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide", "unset"],
  PregnancyCreateparentIdInput: ["set"],
  LivestockUnitCreateNestedManyWithoutPregnancyInput: ["create", "connectOrCreate", "connect"],
  PregnancyTestCreateNestedManyWithoutPregnancyInput: ["create", "connectOrCreate", "createMany", "connect"],
  PregnancyUpdateparentIdInput: ["set", "push"],
  LivestockUnitUpdateManyWithoutPregnancyNestedInput: ["create", "connectOrCreate", "upsert", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  PregnancyTestUpdateManyWithoutPregnancyNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  PregnancyCreateNestedOneWithoutPregnancyTestInput: ["create", "connectOrCreate", "connect"],
  EnumPregnancyTestTypeFieldUpdateOperationsInput: ["set"],
  EnumPregnancyTestResultFieldUpdateOperationsInput: ["set"],
  PregnancyUpdateOneRequiredWithoutPregnancyTestNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  LivestockUnitCreateNestedOneWithoutTreatmentsInput: ["create", "connectOrCreate", "connect"],
  ChemicalProductCreateNestedOneWithoutTreatmentInput: ["create", "connectOrCreate", "connect"],
  LivestockUnitUpdateOneRequiredWithoutTreatmentsNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  EnumApplicationMethodFieldUpdateOperationsInput: ["set"],
  ChemicalProductUpdateOneWithoutTreatmentNestedInput: ["create", "connectOrCreate", "upsert", "disconnect", "delete", "connect", "update"],
  ChemicalTreatmentCreateNestedOneWithoutProductInput: ["create", "connectOrCreate", "connect"],
  ChemicalTreatmentUpdateOneRequiredWithoutProductNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  GeoPointCreateNestedManyWithoutPaddockInput: ["create", "connectOrCreate", "createMany", "connect"],
  GrazeCreateNestedManyWithoutPaddockInput: ["create", "connectOrCreate", "createMany", "connect"],
  LivestockUnitPositionCreateNestedOneWithoutPaddockInput: ["create", "connectOrCreate", "connect"],
  GeoPointUpdateManyWithoutPaddockNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  GrazeUpdateManyWithoutPaddockNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  LivestockUnitPositionUpdateOneRequiredWithoutPaddockNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  GeoPointCreateNestedOneWithoutLivestockUnitPositionInput: ["create", "connectOrCreate", "connect"],
  PaddockCreateNestedOneWithoutLivestockUnitPositionInput: ["create", "connectOrCreate", "connect"],
  GeoPointUpdateOneWithoutLivestockUnitPositionNestedInput: ["create", "connectOrCreate", "upsert", "disconnect", "delete", "connect", "update"],
  PaddockUpdateOneWithoutLivestockUnitPositionNestedInput: ["create", "connectOrCreate", "upsert", "disconnect", "delete", "connect", "update"],
  PaddockCreateNestedOneWithoutPolygonInput: ["create", "connectOrCreate", "connect"],
  LivestockUnitPositionCreateNestedOneWithoutLocationInput: ["create", "connectOrCreate", "connect"],
  PaddockUpdateOneRequiredWithoutPolygonNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  LivestockUnitPositionUpdateOneRequiredWithoutLocationNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  LivestockUnitCreateNestedOneWithoutWeightsInput: ["create", "connectOrCreate", "connect"],
  EnumWeighMethodFieldUpdateOperationsInput: ["set"],
  LivestockUnitUpdateOneRequiredWithoutWeightsNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  EnumLoraActivationMethodFieldUpdateOperationsInput: ["set"],
  NestedStringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  NestedStringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "isSet"],
  NestedStringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  NestedIntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedStringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max", "isSet"],
  NestedIntNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "isSet"],
  NestedDateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedDateTimeNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "isSet"],
  NestedFloatNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "isSet"],
  NestedDateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  NestedDateTimeNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max", "isSet"],
  NestedFloatNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max", "isSet"],
  NestedEnumStockClassFilter: ["equals", "in", "notIn", "not"],
  NestedEnumStockClassWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  NestedEnumSexFilter: ["equals", "in", "notIn", "not"],
  NestedBoolFilter: ["equals", "not"],
  NestedFloatFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedEnumSexWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  NestedBoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
  NestedIntWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  NestedFloatWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  NestedEnumVisualIdColourNullableFilter: ["equals", "in", "notIn", "not", "isSet"],
  NestedEnumVisualIdColourNullableWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max", "isSet"],
  NestedIntNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max", "isSet"],
  NestedEnumPregnancyTestTypeFilter: ["equals", "in", "notIn", "not"],
  NestedEnumPregnancyTestResultFilter: ["equals", "in", "notIn", "not"],
  NestedEnumPregnancyTestTypeWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  NestedEnumPregnancyTestResultWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  NestedEnumApplicationMethodFilter: ["equals", "in", "notIn", "not"],
  NestedEnumApplicationMethodWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  NestedEnumWeighMethodFilter: ["equals", "in", "notIn", "not"],
  NestedEnumWeighMethodWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  NestedEnumLoraActivationMethodFilter: ["equals", "in", "notIn", "not"],
  NestedEnumLoraActivationMethodWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  PaddockCreateWithoutGrazeInput: ["id", "name", "polygon", "areaHa", "livestockUnitPosition"],
  PaddockCreateOrConnectWithoutGrazeInput: ["where", "create"],
  MobCreateWithoutGrazeInput: ["id", "name", "members", "comment", "grazeIds"],
  MobCreateOrConnectWithoutGrazeInput: ["where", "create"],
  PaddockUpsertWithoutGrazeInput: ["update", "create"],
  PaddockUpdateWithoutGrazeInput: ["name", "polygon", "areaHa", "livestockUnitPosition"],
  MobUpsertWithWhereUniqueWithoutGrazeInput: ["where", "update", "create"],
  MobUpdateWithWhereUniqueWithoutGrazeInput: ["where", "data"],
  MobUpdateManyWithWhereWithoutGrazeInput: ["where", "data"],
  MobScalarWhereInput: ["AND", "OR", "NOT", "id", "name", "comment", "grazeIds"],
  LivestockUnitCreateWithoutBreedInput: ["id", "nlisid", "visualid", "class", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "mob", "pregnancy", "pregnancyId", "weights", "treatments", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitCreateOrConnectWithoutBreedInput: ["where", "create"],
  LivestockUnitUpsertWithoutBreedInput: ["update", "create"],
  LivestockUnitUpdateWithoutBreedInput: ["nlisid", "visualid", "class", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "mob", "pregnancy", "pregnancyId", "weights", "treatments", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitCreateWithoutMobInput: ["id", "nlisid", "visualid", "class", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "pregnancy", "pregnancyId", "weights", "treatments", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitCreateOrConnectWithoutMobInput: ["where", "create"],
  LivestockUnitCreateManyMobInputEnvelope: ["data"],
  GrazeCreateWithoutMobInput: ["id", "startDatetime", "endDateTime", "paddock", "mobIds", "dseDaysPerHectare"],
  GrazeCreateOrConnectWithoutMobInput: ["where", "create"],
  LivestockUnitUpsertWithWhereUniqueWithoutMobInput: ["where", "update", "create"],
  LivestockUnitUpdateWithWhereUniqueWithoutMobInput: ["where", "data"],
  LivestockUnitUpdateManyWithWhereWithoutMobInput: ["where", "data"],
  LivestockUnitScalarWhereInput: ["AND", "OR", "NOT", "id", "nlisid", "class", "name", "comment", "sex", "birthdate", "desexed", "parentId", "mobId", "pregnancyId", "drySheepEquivalent", "purchasePrice"],
  GrazeUpsertWithWhereUniqueWithoutMobInput: ["where", "update", "create"],
  GrazeUpdateWithWhereUniqueWithoutMobInput: ["where", "data"],
  GrazeUpdateManyWithWhereWithoutMobInput: ["where", "data"],
  GrazeScalarWhereInput: ["AND", "OR", "NOT", "id", "startDatetime", "endDateTime", "paddockId", "mobIds", "dseDaysPerHectare"],
  VisualIdCreateWithoutLivestockUnitInput: ["id", "colour", "number"],
  VisualIdCreateOrConnectWithoutLivestockUnitInput: ["where", "create"],
  BreedCreateWithoutMembersInput: ["id", "name", "class"],
  BreedCreateOrConnectWithoutMembersInput: ["where", "create"],
  LivestockUnitCreateWithoutDamInput: ["id", "nlisid", "visualid", "class", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "mob", "pregnancy", "pregnancyId", "weights", "treatments", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitCreateOrConnectWithoutDamInput: ["where", "create"],
  LivestockUnitCreateWithoutSireInput: ["id", "nlisid", "visualid", "class", "breed", "name", "comment", "sex", "birthdate", "desexed", "dam", "mob", "pregnancy", "pregnancyId", "weights", "treatments", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitCreateOrConnectWithoutSireInput: ["where", "create"],
  MobCreateWithoutMembersInput: ["id", "name", "comment", "grazeIds", "graze"],
  MobCreateOrConnectWithoutMembersInput: ["where", "create"],
  PregnancyCreateWithoutParentsInput: ["id", "earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "parentId", "pregnancySireId", "pregnancyTest"],
  PregnancyCreateOrConnectWithoutParentsInput: ["where", "create"],
  WeightRecordCreateWithoutLivestockUnitInput: ["id", "weight", "dateMeasured", "method"],
  WeightRecordCreateOrConnectWithoutLivestockUnitInput: ["where", "create"],
  WeightRecordCreateManyLivestockUnitInputEnvelope: ["data"],
  ChemicalTreatmentCreateWithoutLiveStockUnitInput: ["id", "treatmentDate", "applicationMethod", "product", "volume_ml", "witholdingPeriodDays"],
  ChemicalTreatmentCreateOrConnectWithoutLiveStockUnitInput: ["where", "create"],
  ChemicalTreatmentCreateManyLiveStockUnitInputEnvelope: ["data"],
  VisualIdUpsertWithoutLivestockUnitInput: ["update", "create"],
  VisualIdUpdateWithoutLivestockUnitInput: ["colour", "number"],
  BreedUpsertWithoutMembersInput: ["update", "create"],
  BreedUpdateWithoutMembersInput: ["name", "class"],
  LivestockUnitUpsertWithoutDamInput: ["update", "create"],
  LivestockUnitUpdateWithoutDamInput: ["nlisid", "visualid", "class", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "mob", "pregnancy", "pregnancyId", "weights", "treatments", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitUpsertWithoutSireInput: ["update", "create"],
  LivestockUnitUpdateWithoutSireInput: ["nlisid", "visualid", "class", "breed", "name", "comment", "sex", "birthdate", "desexed", "dam", "mob", "pregnancy", "pregnancyId", "weights", "treatments", "drySheepEquivalent", "purchasePrice"],
  MobUpsertWithoutMembersInput: ["update", "create"],
  MobUpdateWithoutMembersInput: ["name", "comment", "grazeIds", "graze"],
  PregnancyUpsertWithWhereUniqueWithoutParentsInput: ["where", "update", "create"],
  PregnancyUpdateWithWhereUniqueWithoutParentsInput: ["where", "data"],
  PregnancyUpdateManyWithWhereWithoutParentsInput: ["where", "data"],
  PregnancyScalarWhereInput: ["AND", "OR", "NOT", "id", "earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "parentId", "pregnancySireId"],
  WeightRecordUpsertWithWhereUniqueWithoutLivestockUnitInput: ["where", "update", "create"],
  WeightRecordUpdateWithWhereUniqueWithoutLivestockUnitInput: ["where", "data"],
  WeightRecordUpdateManyWithWhereWithoutLivestockUnitInput: ["where", "data"],
  WeightRecordScalarWhereInput: ["AND", "OR", "NOT", "id", "weight", "dateMeasured", "method", "livestockUnitId"],
  ChemicalTreatmentUpsertWithWhereUniqueWithoutLiveStockUnitInput: ["where", "update", "create"],
  ChemicalTreatmentUpdateWithWhereUniqueWithoutLiveStockUnitInput: ["where", "data"],
  ChemicalTreatmentUpdateManyWithWhereWithoutLiveStockUnitInput: ["where", "data"],
  ChemicalTreatmentScalarWhereInput: ["AND", "OR", "NOT", "id", "livestockUnitId", "treatmentDate", "applicationMethod", "volume_ml", "witholdingPeriodDays"],
  LivestockUnitCreateWithoutVisualidInput: ["id", "nlisid", "class", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "mob", "pregnancy", "pregnancyId", "weights", "treatments", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitCreateOrConnectWithoutVisualidInput: ["where", "create"],
  LivestockUnitUpsertWithoutVisualidInput: ["update", "create"],
  LivestockUnitUpdateWithoutVisualidInput: ["nlisid", "class", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "mob", "pregnancy", "pregnancyId", "weights", "treatments", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitCreateWithoutPregnancyInput: ["id", "nlisid", "visualid", "class", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "mob", "pregnancyId", "weights", "treatments", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitCreateOrConnectWithoutPregnancyInput: ["where", "create"],
  PregnancyTestCreateWithoutPregnancyInput: ["id", "testDate", "testType", "resultDate", "result", "cost"],
  PregnancyTestCreateOrConnectWithoutPregnancyInput: ["where", "create"],
  PregnancyTestCreateManyPregnancyInputEnvelope: ["data"],
  LivestockUnitUpsertWithWhereUniqueWithoutPregnancyInput: ["where", "update", "create"],
  LivestockUnitUpdateWithWhereUniqueWithoutPregnancyInput: ["where", "data"],
  LivestockUnitUpdateManyWithWhereWithoutPregnancyInput: ["where", "data"],
  PregnancyTestUpsertWithWhereUniqueWithoutPregnancyInput: ["where", "update", "create"],
  PregnancyTestUpdateWithWhereUniqueWithoutPregnancyInput: ["where", "data"],
  PregnancyTestUpdateManyWithWhereWithoutPregnancyInput: ["where", "data"],
  PregnancyTestScalarWhereInput: ["AND", "OR", "NOT", "id", "testDate", "testType", "resultDate", "result", "pregnancyId", "cost"],
  PregnancyCreateWithoutPregnancyTestInput: ["id", "earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "parentId", "parents", "pregnancySireId"],
  PregnancyCreateOrConnectWithoutPregnancyTestInput: ["where", "create"],
  PregnancyUpsertWithoutPregnancyTestInput: ["update", "create"],
  PregnancyUpdateWithoutPregnancyTestInput: ["earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "parentId", "parents", "pregnancySireId"],
  LivestockUnitCreateWithoutTreatmentsInput: ["id", "nlisid", "visualid", "class", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "mob", "pregnancy", "pregnancyId", "weights", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitCreateOrConnectWithoutTreatmentsInput: ["where", "create"],
  ChemicalProductCreateWithoutTreatmentInput: ["id", "manufacturer", "product_name", "serial_number", "volume_ml", "cost"],
  ChemicalProductCreateOrConnectWithoutTreatmentInput: ["where", "create"],
  LivestockUnitUpsertWithoutTreatmentsInput: ["update", "create"],
  LivestockUnitUpdateWithoutTreatmentsInput: ["nlisid", "visualid", "class", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "mob", "pregnancy", "pregnancyId", "weights", "drySheepEquivalent", "purchasePrice"],
  ChemicalProductUpsertWithoutTreatmentInput: ["update", "create"],
  ChemicalProductUpdateWithoutTreatmentInput: ["manufacturer", "product_name", "serial_number", "volume_ml", "cost"],
  ChemicalTreatmentCreateWithoutProductInput: ["id", "liveStockUnit", "treatmentDate", "applicationMethod", "volume_ml", "witholdingPeriodDays"],
  ChemicalTreatmentCreateOrConnectWithoutProductInput: ["where", "create"],
  ChemicalTreatmentUpsertWithoutProductInput: ["update", "create"],
  ChemicalTreatmentUpdateWithoutProductInput: ["liveStockUnit", "treatmentDate", "applicationMethod", "volume_ml", "witholdingPeriodDays"],
  GeoPointCreateWithoutPaddockInput: ["id", "latitude", "longitude", "livestockUnitPosition"],
  GeoPointCreateOrConnectWithoutPaddockInput: ["where", "create"],
  GeoPointCreateManyPaddockInputEnvelope: ["data"],
  GrazeCreateWithoutPaddockInput: ["id", "startDatetime", "endDateTime", "mobIds", "mob", "dseDaysPerHectare"],
  GrazeCreateOrConnectWithoutPaddockInput: ["where", "create"],
  GrazeCreateManyPaddockInputEnvelope: ["data"],
  LivestockUnitPositionCreateWithoutPaddockInput: ["id", "date", "location"],
  LivestockUnitPositionCreateOrConnectWithoutPaddockInput: ["where", "create"],
  GeoPointUpsertWithWhereUniqueWithoutPaddockInput: ["where", "update", "create"],
  GeoPointUpdateWithWhereUniqueWithoutPaddockInput: ["where", "data"],
  GeoPointUpdateManyWithWhereWithoutPaddockInput: ["where", "data"],
  GeoPointScalarWhereInput: ["AND", "OR", "NOT", "id", "latitude", "longitude", "paddockId", "livestockUnitPositionId"],
  GrazeUpsertWithWhereUniqueWithoutPaddockInput: ["where", "update", "create"],
  GrazeUpdateWithWhereUniqueWithoutPaddockInput: ["where", "data"],
  GrazeUpdateManyWithWhereWithoutPaddockInput: ["where", "data"],
  LivestockUnitPositionUpsertWithoutPaddockInput: ["update", "create"],
  LivestockUnitPositionUpdateWithoutPaddockInput: ["date", "location"],
  GeoPointCreateWithoutLivestockUnitPositionInput: ["id", "latitude", "longitude", "paddock"],
  GeoPointCreateOrConnectWithoutLivestockUnitPositionInput: ["where", "create"],
  PaddockCreateWithoutLivestockUnitPositionInput: ["id", "name", "polygon", "areaHa", "graze"],
  PaddockCreateOrConnectWithoutLivestockUnitPositionInput: ["where", "create"],
  GeoPointUpsertWithoutLivestockUnitPositionInput: ["update", "create"],
  GeoPointUpdateWithoutLivestockUnitPositionInput: ["latitude", "longitude", "paddock"],
  PaddockUpsertWithoutLivestockUnitPositionInput: ["update", "create"],
  PaddockUpdateWithoutLivestockUnitPositionInput: ["name", "polygon", "areaHa", "graze"],
  PaddockCreateWithoutPolygonInput: ["id", "name", "areaHa", "graze", "livestockUnitPosition"],
  PaddockCreateOrConnectWithoutPolygonInput: ["where", "create"],
  LivestockUnitPositionCreateWithoutLocationInput: ["id", "date", "paddock"],
  LivestockUnitPositionCreateOrConnectWithoutLocationInput: ["where", "create"],
  PaddockUpsertWithoutPolygonInput: ["update", "create"],
  PaddockUpdateWithoutPolygonInput: ["name", "areaHa", "graze", "livestockUnitPosition"],
  LivestockUnitPositionUpsertWithoutLocationInput: ["update", "create"],
  LivestockUnitPositionUpdateWithoutLocationInput: ["date", "paddock"],
  LivestockUnitCreateWithoutWeightsInput: ["id", "nlisid", "visualid", "class", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "mob", "pregnancy", "pregnancyId", "treatments", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitCreateOrConnectWithoutWeightsInput: ["where", "create"],
  LivestockUnitUpsertWithoutWeightsInput: ["update", "create"],
  LivestockUnitUpdateWithoutWeightsInput: ["nlisid", "visualid", "class", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "mob", "pregnancy", "pregnancyId", "treatments", "drySheepEquivalent", "purchasePrice"],
  MobUpdateWithoutGrazeInput: ["name", "members", "comment", "grazeIds"],
  LivestockUnitCreateManyMobInput: ["id", "nlisid", "class", "name", "comment", "sex", "birthdate", "desexed", "parentId", "pregnancyId", "drySheepEquivalent", "purchasePrice"],
  LivestockUnitUpdateWithoutMobInput: ["nlisid", "visualid", "class", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "pregnancy", "pregnancyId", "weights", "treatments", "drySheepEquivalent", "purchasePrice"],
  GrazeUpdateWithoutMobInput: ["startDatetime", "endDateTime", "paddock", "mobIds", "dseDaysPerHectare"],
  WeightRecordCreateManyLivestockUnitInput: ["id", "weight", "dateMeasured", "method"],
  ChemicalTreatmentCreateManyLiveStockUnitInput: ["id", "treatmentDate", "applicationMethod", "volume_ml", "witholdingPeriodDays"],
  PregnancyUpdateWithoutParentsInput: ["earliestPossibleConception", "latestPossibleConception", "conception", "dueDate", "earliestPossibleBirth", "latestPossibleBirth", "parentId", "pregnancySireId", "pregnancyTest"],
  WeightRecordUpdateWithoutLivestockUnitInput: ["weight", "dateMeasured", "method"],
  ChemicalTreatmentUpdateWithoutLiveStockUnitInput: ["treatmentDate", "applicationMethod", "product", "volume_ml", "witholdingPeriodDays"],
  PregnancyTestCreateManyPregnancyInput: ["id", "testDate", "testType", "resultDate", "result", "cost"],
  LivestockUnitUpdateWithoutPregnancyInput: ["nlisid", "visualid", "class", "breed", "name", "comment", "sex", "birthdate", "desexed", "sire", "dam", "mob", "pregnancyId", "weights", "treatments", "drySheepEquivalent", "purchasePrice"],
  PregnancyTestUpdateWithoutPregnancyInput: ["testDate", "testType", "resultDate", "result", "cost"],
  GeoPointCreateManyPaddockInput: ["id", "latitude", "longitude", "livestockUnitPositionId"],
  GrazeCreateManyPaddockInput: ["id", "startDatetime", "endDateTime", "mobIds", "dseDaysPerHectare"],
  GeoPointUpdateWithoutPaddockInput: ["latitude", "longitude", "livestockUnitPosition"],
  GrazeUpdateWithoutPaddockInput: ["startDatetime", "endDateTime", "mobIds", "mob", "dseDaysPerHectare"]
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

