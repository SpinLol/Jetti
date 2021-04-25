import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AggregateMatch = {
  __typename?: 'AggregateMatch';
  count?: Maybe<MatchCountAggregate>;
  avg?: Maybe<MatchAvgAggregate>;
  sum?: Maybe<MatchSumAggregate>;
  min?: Maybe<MatchMinAggregate>;
  max?: Maybe<MatchMaxAggregate>;
};


export type DateTimeFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['DateTime']>;
};

export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type EnumMapNullableFilter = {
  equals?: Maybe<Map>;
  in?: Maybe<Array<Map>>;
  notIn?: Maybe<Array<Map>>;
  not?: Maybe<NestedEnumMapNullableFilter>;
};

export type FloatNullableFilter = {
  equals?: Maybe<Scalars['Float']>;
  in?: Maybe<Array<Scalars['Float']>>;
  notIn?: Maybe<Array<Scalars['Float']>>;
  lt?: Maybe<Scalars['Float']>;
  lte?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  gte?: Maybe<Scalars['Float']>;
  not?: Maybe<NestedFloatNullableFilter>;
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntFilter>;
};

export type IntNullableFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntNullableFilter>;
};

export enum Map {
  Bind = 'BIND',
  Split = 'SPLIT',
  Haven = 'HAVEN',
  Ascent = 'ASCENT',
  Icebox = 'ICEBOX'
}

export type Match = {
  __typename?: 'Match';
  id: Scalars['Int'];
  matchResult?: Maybe<Scalars['Int']>;
  screenshotPath?: Maybe<Scalars['String']>;
  map?: Maybe<Map>;
  teamId1?: Maybe<Scalars['Int']>;
  teamId2?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  Team1?: Maybe<Team>;
  Team2?: Maybe<Team>;
};

export type MatchAvgAggregate = {
  __typename?: 'MatchAvgAggregate';
  id: Scalars['Float'];
  matchResult?: Maybe<Scalars['Float']>;
  teamId1?: Maybe<Scalars['Float']>;
  teamId2?: Maybe<Scalars['Float']>;
};

export type MatchCountAggregate = {
  __typename?: 'MatchCountAggregate';
  id: Scalars['Int'];
  matchResult?: Maybe<Scalars['Int']>;
  screenshotPath?: Maybe<Scalars['Int']>;
  map?: Maybe<Scalars['Int']>;
  teamId1?: Maybe<Scalars['Int']>;
  teamId2?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
  _all: Scalars['Int'];
};

export type MatchCreateInput = {
  matchResult?: Maybe<Scalars['Int']>;
  screenshotPath?: Maybe<Scalars['String']>;
  map?: Maybe<Map>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  Team1?: Maybe<TeamCreateNestedOneWithoutMatch1Input>;
  Team2?: Maybe<TeamCreateNestedOneWithoutMatch2Input>;
};

export type MatchCreateManyTeam1Input = {
  id?: Maybe<Scalars['Int']>;
  matchResult?: Maybe<Scalars['Int']>;
  screenshotPath?: Maybe<Scalars['String']>;
  map?: Maybe<Map>;
  teamId2?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MatchCreateManyTeam1InputEnvelope = {
  data: Array<MatchCreateManyTeam1Input>;
  skipDuplicates?: Maybe<Scalars['Boolean']>;
};

export type MatchCreateManyTeam2Input = {
  id?: Maybe<Scalars['Int']>;
  matchResult?: Maybe<Scalars['Int']>;
  screenshotPath?: Maybe<Scalars['String']>;
  map?: Maybe<Map>;
  teamId1?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MatchCreateManyTeam2InputEnvelope = {
  data: Array<MatchCreateManyTeam2Input>;
  skipDuplicates?: Maybe<Scalars['Boolean']>;
};

export type MatchCreateNestedManyWithoutTeam1Input = {
  create?: Maybe<Array<MatchCreateWithoutTeam1Input>>;
  connectOrCreate?: Maybe<Array<MatchCreateOrConnectWithoutTeam1Input>>;
  createMany?: Maybe<MatchCreateManyTeam1InputEnvelope>;
  connect?: Maybe<Array<MatchWhereUniqueInput>>;
};

export type MatchCreateNestedManyWithoutTeam2Input = {
  create?: Maybe<Array<MatchCreateWithoutTeam2Input>>;
  connectOrCreate?: Maybe<Array<MatchCreateOrConnectWithoutTeam2Input>>;
  createMany?: Maybe<MatchCreateManyTeam2InputEnvelope>;
  connect?: Maybe<Array<MatchWhereUniqueInput>>;
};

export type MatchCreateOrConnectWithoutTeam1Input = {
  where: MatchWhereUniqueInput;
  create: MatchCreateWithoutTeam1Input;
};

export type MatchCreateOrConnectWithoutTeam2Input = {
  where: MatchWhereUniqueInput;
  create: MatchCreateWithoutTeam2Input;
};

export type MatchCreateWithoutTeam1Input = {
  matchResult?: Maybe<Scalars['Int']>;
  screenshotPath?: Maybe<Scalars['String']>;
  map?: Maybe<Map>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  Team2?: Maybe<TeamCreateNestedOneWithoutMatch2Input>;
};

export type MatchCreateWithoutTeam2Input = {
  matchResult?: Maybe<Scalars['Int']>;
  screenshotPath?: Maybe<Scalars['String']>;
  map?: Maybe<Map>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  Team1?: Maybe<TeamCreateNestedOneWithoutMatch1Input>;
};

export type MatchListRelationFilter = {
  every?: Maybe<MatchWhereInput>;
  some?: Maybe<MatchWhereInput>;
  none?: Maybe<MatchWhereInput>;
};

export type MatchMaxAggregate = {
  __typename?: 'MatchMaxAggregate';
  id: Scalars['Int'];
  matchResult?: Maybe<Scalars['Int']>;
  screenshotPath?: Maybe<Scalars['String']>;
  map?: Maybe<Map>;
  teamId1?: Maybe<Scalars['Int']>;
  teamId2?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MatchMinAggregate = {
  __typename?: 'MatchMinAggregate';
  id: Scalars['Int'];
  matchResult?: Maybe<Scalars['Int']>;
  screenshotPath?: Maybe<Scalars['String']>;
  map?: Maybe<Map>;
  teamId1?: Maybe<Scalars['Int']>;
  teamId2?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MatchOrderByInput = {
  id?: Maybe<SortOrder>;
  matchResult?: Maybe<SortOrder>;
  screenshotPath?: Maybe<SortOrder>;
  map?: Maybe<SortOrder>;
  teamId1?: Maybe<SortOrder>;
  teamId2?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export enum MatchScalarFieldEnum {
  Id = 'id',
  MatchResult = 'matchResult',
  ScreenshotPath = 'screenshotPath',
  Map = 'map',
  TeamId1 = 'teamId1',
  TeamId2 = 'teamId2',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

export type MatchScalarWhereInput = {
  AND?: Maybe<Array<MatchScalarWhereInput>>;
  OR?: Maybe<Array<MatchScalarWhereInput>>;
  NOT?: Maybe<Array<MatchScalarWhereInput>>;
  id?: Maybe<IntFilter>;
  matchResult?: Maybe<IntNullableFilter>;
  screenshotPath?: Maybe<StringNullableFilter>;
  map?: Maybe<EnumMapNullableFilter>;
  teamId1?: Maybe<IntNullableFilter>;
  teamId2?: Maybe<IntNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type MatchSumAggregate = {
  __typename?: 'MatchSumAggregate';
  id: Scalars['Int'];
  matchResult?: Maybe<Scalars['Int']>;
  teamId1?: Maybe<Scalars['Int']>;
  teamId2?: Maybe<Scalars['Int']>;
};

export type MatchUpdateInput = {
  matchResult?: Maybe<NullableIntFieldUpdateOperationsInput>;
  screenshotPath?: Maybe<NullableStringFieldUpdateOperationsInput>;
  map?: Maybe<NullableEnumMapFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  Team1?: Maybe<TeamUpdateOneWithoutMatch1Input>;
  Team2?: Maybe<TeamUpdateOneWithoutMatch2Input>;
};

export type MatchUpdateManyMutationInput = {
  matchResult?: Maybe<NullableIntFieldUpdateOperationsInput>;
  screenshotPath?: Maybe<NullableStringFieldUpdateOperationsInput>;
  map?: Maybe<NullableEnumMapFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type MatchUpdateManyWithWhereWithoutTeam1Input = {
  where: MatchScalarWhereInput;
  data: MatchUpdateManyMutationInput;
};

export type MatchUpdateManyWithWhereWithoutTeam2Input = {
  where: MatchScalarWhereInput;
  data: MatchUpdateManyMutationInput;
};

export type MatchUpdateManyWithoutTeam1Input = {
  create?: Maybe<Array<MatchCreateWithoutTeam1Input>>;
  connectOrCreate?: Maybe<Array<MatchCreateOrConnectWithoutTeam1Input>>;
  upsert?: Maybe<Array<MatchUpsertWithWhereUniqueWithoutTeam1Input>>;
  createMany?: Maybe<MatchCreateManyTeam1InputEnvelope>;
  connect?: Maybe<Array<MatchWhereUniqueInput>>;
  set?: Maybe<Array<MatchWhereUniqueInput>>;
  disconnect?: Maybe<Array<MatchWhereUniqueInput>>;
  delete?: Maybe<Array<MatchWhereUniqueInput>>;
  update?: Maybe<Array<MatchUpdateWithWhereUniqueWithoutTeam1Input>>;
  updateMany?: Maybe<Array<MatchUpdateManyWithWhereWithoutTeam1Input>>;
  deleteMany?: Maybe<Array<MatchScalarWhereInput>>;
};

export type MatchUpdateManyWithoutTeam2Input = {
  create?: Maybe<Array<MatchCreateWithoutTeam2Input>>;
  connectOrCreate?: Maybe<Array<MatchCreateOrConnectWithoutTeam2Input>>;
  upsert?: Maybe<Array<MatchUpsertWithWhereUniqueWithoutTeam2Input>>;
  createMany?: Maybe<MatchCreateManyTeam2InputEnvelope>;
  connect?: Maybe<Array<MatchWhereUniqueInput>>;
  set?: Maybe<Array<MatchWhereUniqueInput>>;
  disconnect?: Maybe<Array<MatchWhereUniqueInput>>;
  delete?: Maybe<Array<MatchWhereUniqueInput>>;
  update?: Maybe<Array<MatchUpdateWithWhereUniqueWithoutTeam2Input>>;
  updateMany?: Maybe<Array<MatchUpdateManyWithWhereWithoutTeam2Input>>;
  deleteMany?: Maybe<Array<MatchScalarWhereInput>>;
};

export type MatchUpdateWithWhereUniqueWithoutTeam1Input = {
  where: MatchWhereUniqueInput;
  data: MatchUpdateWithoutTeam1Input;
};

export type MatchUpdateWithWhereUniqueWithoutTeam2Input = {
  where: MatchWhereUniqueInput;
  data: MatchUpdateWithoutTeam2Input;
};

export type MatchUpdateWithoutTeam1Input = {
  matchResult?: Maybe<NullableIntFieldUpdateOperationsInput>;
  screenshotPath?: Maybe<NullableStringFieldUpdateOperationsInput>;
  map?: Maybe<NullableEnumMapFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  Team2?: Maybe<TeamUpdateOneWithoutMatch2Input>;
};

export type MatchUpdateWithoutTeam2Input = {
  matchResult?: Maybe<NullableIntFieldUpdateOperationsInput>;
  screenshotPath?: Maybe<NullableStringFieldUpdateOperationsInput>;
  map?: Maybe<NullableEnumMapFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  Team1?: Maybe<TeamUpdateOneWithoutMatch1Input>;
};

export type MatchUpsertWithWhereUniqueWithoutTeam1Input = {
  where: MatchWhereUniqueInput;
  update: MatchUpdateWithoutTeam1Input;
  create: MatchCreateWithoutTeam1Input;
};

export type MatchUpsertWithWhereUniqueWithoutTeam2Input = {
  where: MatchWhereUniqueInput;
  update: MatchUpdateWithoutTeam2Input;
  create: MatchCreateWithoutTeam2Input;
};

export type MatchWhereInput = {
  AND?: Maybe<Array<MatchWhereInput>>;
  OR?: Maybe<Array<MatchWhereInput>>;
  NOT?: Maybe<Array<MatchWhereInput>>;
  id?: Maybe<IntFilter>;
  matchResult?: Maybe<IntNullableFilter>;
  screenshotPath?: Maybe<StringNullableFilter>;
  map?: Maybe<EnumMapNullableFilter>;
  teamId1?: Maybe<IntNullableFilter>;
  teamId2?: Maybe<IntNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  Team1?: Maybe<TeamRelationFilter>;
  Team2?: Maybe<TeamRelationFilter>;
};

export type MatchWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMatch: Match;
  deleteMatch?: Maybe<Match>;
  updateMatch?: Maybe<Match>;
  createPlayer: Player;
  deletePlayer?: Maybe<Player>;
  updatePlayer?: Maybe<Player>;
  updatePlayerH?: Maybe<PlayerH>;
  createTeam: Team;
  deleteTeam?: Maybe<Team>;
  updateTeam?: Maybe<Team>;
};


export type MutationCreateMatchArgs = {
  data: MatchCreateInput;
};


export type MutationDeleteMatchArgs = {
  where: MatchWhereUniqueInput;
};


export type MutationUpdateMatchArgs = {
  data: MatchUpdateInput;
  where: MatchWhereUniqueInput;
};


export type MutationCreatePlayerArgs = {
  data: PlayerCreateInput;
};


export type MutationDeletePlayerArgs = {
  where: PlayerWhereUniqueInput;
};


export type MutationUpdatePlayerArgs = {
  data: PlayerUpdateInput;
  where: PlayerWhereUniqueInput;
};


export type MutationUpdatePlayerHArgs = {
  data: PlayerHUpdateInput;
  where: PlayerHWhereUniqueInput;
};


export type MutationCreateTeamArgs = {
  data: TeamCreateInput;
};


export type MutationDeleteTeamArgs = {
  where: TeamWhereUniqueInput;
};


export type MutationUpdateTeamArgs = {
  data: TeamUpdateInput;
  where: TeamWhereUniqueInput;
};

export type NestedDateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type NestedEnumMapNullableFilter = {
  equals?: Maybe<Map>;
  in?: Maybe<Array<Map>>;
  notIn?: Maybe<Array<Map>>;
  not?: Maybe<NestedEnumMapNullableFilter>;
};

export type NestedFloatNullableFilter = {
  equals?: Maybe<Scalars['Float']>;
  in?: Maybe<Array<Scalars['Float']>>;
  notIn?: Maybe<Array<Scalars['Float']>>;
  lt?: Maybe<Scalars['Float']>;
  lte?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  gte?: Maybe<Scalars['Float']>;
  not?: Maybe<NestedFloatNullableFilter>;
};

export type NestedIntFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntFilter>;
};

export type NestedIntNullableFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntNullableFilter>;
};

export type NestedStringNullableFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringNullableFilter>;
};

export type NullableEnumMapFieldUpdateOperationsInput = {
  set?: Maybe<Map>;
};

export type NullableFloatFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['Float']>;
  increment?: Maybe<Scalars['Float']>;
  decrement?: Maybe<Scalars['Float']>;
  multiply?: Maybe<Scalars['Float']>;
  divide?: Maybe<Scalars['Float']>;
};

export type NullableIntFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['Int']>;
  increment?: Maybe<Scalars['Int']>;
  decrement?: Maybe<Scalars['Int']>;
  multiply?: Maybe<Scalars['Int']>;
  divide?: Maybe<Scalars['Int']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type Player = {
  __typename?: 'Player';
  id: Scalars['Int'];
  userId?: Maybe<Scalars['String']>;
  skillLevel?: Maybe<Scalars['Float']>;
  userTag?: Maybe<Scalars['String']>;
  favoriteMap?: Maybe<Map>;
  imageUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  PlayerH: Array<PlayerH>;
};


export type PlayerPlayerHArgs = {
  where?: Maybe<PlayerHWhereInput>;
  orderBy?: Maybe<Array<PlayerHOrderByInput>>;
  cursor?: Maybe<PlayerHWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<Array<PlayerHScalarFieldEnum>>;
};

export type PlayerCreateInput = {
  userId?: Maybe<Scalars['String']>;
  skillLevel?: Maybe<Scalars['Float']>;
  userTag?: Maybe<Scalars['String']>;
  favoriteMap?: Maybe<Map>;
  imageUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  PlayerH?: Maybe<PlayerHCreateNestedManyWithoutPlayerInput>;
};

export type PlayerCreateNestedOneWithoutPlayerHInput = {
  create?: Maybe<PlayerCreateWithoutPlayerHInput>;
  connectOrCreate?: Maybe<PlayerCreateOrConnectWithoutPlayerHInput>;
  connect?: Maybe<PlayerWhereUniqueInput>;
};

export type PlayerCreateOrConnectWithoutPlayerHInput = {
  where: PlayerWhereUniqueInput;
  create: PlayerCreateWithoutPlayerHInput;
};

export type PlayerCreateWithoutPlayerHInput = {
  userId?: Maybe<Scalars['String']>;
  skillLevel?: Maybe<Scalars['Float']>;
  userTag?: Maybe<Scalars['String']>;
  favoriteMap?: Maybe<Map>;
  imageUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PlayerH = {
  __typename?: 'PlayerH';
  id: Scalars['Int'];
  playerId?: Maybe<Scalars['Int']>;
  skillLevel?: Maybe<Scalars['Float']>;
  userTag?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  Player?: Maybe<Player>;
  Team1: Array<Team>;
  Team2: Array<Team>;
  Team3: Array<Team>;
  Team4: Array<Team>;
  Team5: Array<Team>;
};


export type PlayerHTeam1Args = {
  where?: Maybe<TeamWhereInput>;
  orderBy?: Maybe<Array<TeamOrderByInput>>;
  cursor?: Maybe<TeamWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<Array<TeamScalarFieldEnum>>;
};


export type PlayerHTeam2Args = {
  where?: Maybe<TeamWhereInput>;
  orderBy?: Maybe<Array<TeamOrderByInput>>;
  cursor?: Maybe<TeamWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<Array<TeamScalarFieldEnum>>;
};


export type PlayerHTeam3Args = {
  where?: Maybe<TeamWhereInput>;
  orderBy?: Maybe<Array<TeamOrderByInput>>;
  cursor?: Maybe<TeamWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<Array<TeamScalarFieldEnum>>;
};


export type PlayerHTeam4Args = {
  where?: Maybe<TeamWhereInput>;
  orderBy?: Maybe<Array<TeamOrderByInput>>;
  cursor?: Maybe<TeamWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<Array<TeamScalarFieldEnum>>;
};


export type PlayerHTeam5Args = {
  where?: Maybe<TeamWhereInput>;
  orderBy?: Maybe<Array<TeamOrderByInput>>;
  cursor?: Maybe<TeamWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<Array<TeamScalarFieldEnum>>;
};

export type PlayerHCreateManyPlayerInput = {
  id?: Maybe<Scalars['Int']>;
  skillLevel?: Maybe<Scalars['Float']>;
  userTag?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PlayerHCreateManyPlayerInputEnvelope = {
  data: Array<PlayerHCreateManyPlayerInput>;
  skipDuplicates?: Maybe<Scalars['Boolean']>;
};

export type PlayerHCreateNestedManyWithoutPlayerInput = {
  create?: Maybe<Array<PlayerHCreateWithoutPlayerInput>>;
  connectOrCreate?: Maybe<Array<PlayerHCreateOrConnectWithoutPlayerInput>>;
  createMany?: Maybe<PlayerHCreateManyPlayerInputEnvelope>;
  connect?: Maybe<Array<PlayerHWhereUniqueInput>>;
};

export type PlayerHCreateNestedOneWithoutTeam1Input = {
  create?: Maybe<PlayerHCreateWithoutTeam1Input>;
  connectOrCreate?: Maybe<PlayerHCreateOrConnectWithoutTeam1Input>;
  connect?: Maybe<PlayerHWhereUniqueInput>;
};

export type PlayerHCreateNestedOneWithoutTeam2Input = {
  create?: Maybe<PlayerHCreateWithoutTeam2Input>;
  connectOrCreate?: Maybe<PlayerHCreateOrConnectWithoutTeam2Input>;
  connect?: Maybe<PlayerHWhereUniqueInput>;
};

export type PlayerHCreateNestedOneWithoutTeam3Input = {
  create?: Maybe<PlayerHCreateWithoutTeam3Input>;
  connectOrCreate?: Maybe<PlayerHCreateOrConnectWithoutTeam3Input>;
  connect?: Maybe<PlayerHWhereUniqueInput>;
};

export type PlayerHCreateNestedOneWithoutTeam4Input = {
  create?: Maybe<PlayerHCreateWithoutTeam4Input>;
  connectOrCreate?: Maybe<PlayerHCreateOrConnectWithoutTeam4Input>;
  connect?: Maybe<PlayerHWhereUniqueInput>;
};

export type PlayerHCreateNestedOneWithoutTeam5Input = {
  create?: Maybe<PlayerHCreateWithoutTeam5Input>;
  connectOrCreate?: Maybe<PlayerHCreateOrConnectWithoutTeam5Input>;
  connect?: Maybe<PlayerHWhereUniqueInput>;
};

export type PlayerHCreateOrConnectWithoutPlayerInput = {
  where: PlayerHWhereUniqueInput;
  create: PlayerHCreateWithoutPlayerInput;
};

export type PlayerHCreateOrConnectWithoutTeam1Input = {
  where: PlayerHWhereUniqueInput;
  create: PlayerHCreateWithoutTeam1Input;
};

export type PlayerHCreateOrConnectWithoutTeam2Input = {
  where: PlayerHWhereUniqueInput;
  create: PlayerHCreateWithoutTeam2Input;
};

export type PlayerHCreateOrConnectWithoutTeam3Input = {
  where: PlayerHWhereUniqueInput;
  create: PlayerHCreateWithoutTeam3Input;
};

export type PlayerHCreateOrConnectWithoutTeam4Input = {
  where: PlayerHWhereUniqueInput;
  create: PlayerHCreateWithoutTeam4Input;
};

export type PlayerHCreateOrConnectWithoutTeam5Input = {
  where: PlayerHWhereUniqueInput;
  create: PlayerHCreateWithoutTeam5Input;
};

export type PlayerHCreateWithoutPlayerInput = {
  skillLevel?: Maybe<Scalars['Float']>;
  userTag?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  Team1?: Maybe<TeamCreateNestedManyWithoutPlayerH1Input>;
  Team2?: Maybe<TeamCreateNestedManyWithoutPlayerH2Input>;
  Team3?: Maybe<TeamCreateNestedManyWithoutPlayerH3Input>;
  Team4?: Maybe<TeamCreateNestedManyWithoutPlayerH4Input>;
  Team5?: Maybe<TeamCreateNestedManyWithoutPlayerH5Input>;
};

export type PlayerHCreateWithoutTeam1Input = {
  skillLevel?: Maybe<Scalars['Float']>;
  userTag?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  Player?: Maybe<PlayerCreateNestedOneWithoutPlayerHInput>;
  Team2?: Maybe<TeamCreateNestedManyWithoutPlayerH2Input>;
  Team3?: Maybe<TeamCreateNestedManyWithoutPlayerH3Input>;
  Team4?: Maybe<TeamCreateNestedManyWithoutPlayerH4Input>;
  Team5?: Maybe<TeamCreateNestedManyWithoutPlayerH5Input>;
};

export type PlayerHCreateWithoutTeam2Input = {
  skillLevel?: Maybe<Scalars['Float']>;
  userTag?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  Player?: Maybe<PlayerCreateNestedOneWithoutPlayerHInput>;
  Team1?: Maybe<TeamCreateNestedManyWithoutPlayerH1Input>;
  Team3?: Maybe<TeamCreateNestedManyWithoutPlayerH3Input>;
  Team4?: Maybe<TeamCreateNestedManyWithoutPlayerH4Input>;
  Team5?: Maybe<TeamCreateNestedManyWithoutPlayerH5Input>;
};

export type PlayerHCreateWithoutTeam3Input = {
  skillLevel?: Maybe<Scalars['Float']>;
  userTag?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  Player?: Maybe<PlayerCreateNestedOneWithoutPlayerHInput>;
  Team1?: Maybe<TeamCreateNestedManyWithoutPlayerH1Input>;
  Team2?: Maybe<TeamCreateNestedManyWithoutPlayerH2Input>;
  Team4?: Maybe<TeamCreateNestedManyWithoutPlayerH4Input>;
  Team5?: Maybe<TeamCreateNestedManyWithoutPlayerH5Input>;
};

export type PlayerHCreateWithoutTeam4Input = {
  skillLevel?: Maybe<Scalars['Float']>;
  userTag?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  Player?: Maybe<PlayerCreateNestedOneWithoutPlayerHInput>;
  Team1?: Maybe<TeamCreateNestedManyWithoutPlayerH1Input>;
  Team2?: Maybe<TeamCreateNestedManyWithoutPlayerH2Input>;
  Team3?: Maybe<TeamCreateNestedManyWithoutPlayerH3Input>;
  Team5?: Maybe<TeamCreateNestedManyWithoutPlayerH5Input>;
};

export type PlayerHCreateWithoutTeam5Input = {
  skillLevel?: Maybe<Scalars['Float']>;
  userTag?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  Player?: Maybe<PlayerCreateNestedOneWithoutPlayerHInput>;
  Team1?: Maybe<TeamCreateNestedManyWithoutPlayerH1Input>;
  Team2?: Maybe<TeamCreateNestedManyWithoutPlayerH2Input>;
  Team3?: Maybe<TeamCreateNestedManyWithoutPlayerH3Input>;
  Team4?: Maybe<TeamCreateNestedManyWithoutPlayerH4Input>;
};

export type PlayerHListRelationFilter = {
  every?: Maybe<PlayerHWhereInput>;
  some?: Maybe<PlayerHWhereInput>;
  none?: Maybe<PlayerHWhereInput>;
};

export type PlayerHOrderByInput = {
  id?: Maybe<SortOrder>;
  playerId?: Maybe<SortOrder>;
  skillLevel?: Maybe<SortOrder>;
  userTag?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type PlayerHRelationFilter = {
  is?: Maybe<PlayerHWhereInput>;
  isNot?: Maybe<PlayerHWhereInput>;
};

export enum PlayerHScalarFieldEnum {
  Id = 'id',
  PlayerId = 'playerId',
  SkillLevel = 'skillLevel',
  UserTag = 'userTag',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

export type PlayerHScalarWhereInput = {
  AND?: Maybe<Array<PlayerHScalarWhereInput>>;
  OR?: Maybe<Array<PlayerHScalarWhereInput>>;
  NOT?: Maybe<Array<PlayerHScalarWhereInput>>;
  id?: Maybe<IntFilter>;
  playerId?: Maybe<IntNullableFilter>;
  skillLevel?: Maybe<FloatNullableFilter>;
  userTag?: Maybe<StringNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type PlayerHUpdateInput = {
  skillLevel?: Maybe<NullableFloatFieldUpdateOperationsInput>;
  userTag?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  Player?: Maybe<PlayerUpdateOneWithoutPlayerHInput>;
  Team1?: Maybe<TeamUpdateManyWithoutPlayerH1Input>;
  Team2?: Maybe<TeamUpdateManyWithoutPlayerH2Input>;
  Team3?: Maybe<TeamUpdateManyWithoutPlayerH3Input>;
  Team4?: Maybe<TeamUpdateManyWithoutPlayerH4Input>;
  Team5?: Maybe<TeamUpdateManyWithoutPlayerH5Input>;
};

export type PlayerHUpdateManyMutationInput = {
  skillLevel?: Maybe<NullableFloatFieldUpdateOperationsInput>;
  userTag?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type PlayerHUpdateManyWithWhereWithoutPlayerInput = {
  where: PlayerHScalarWhereInput;
  data: PlayerHUpdateManyMutationInput;
};

export type PlayerHUpdateManyWithoutPlayerInput = {
  create?: Maybe<Array<PlayerHCreateWithoutPlayerInput>>;
  connectOrCreate?: Maybe<Array<PlayerHCreateOrConnectWithoutPlayerInput>>;
  upsert?: Maybe<Array<PlayerHUpsertWithWhereUniqueWithoutPlayerInput>>;
  createMany?: Maybe<PlayerHCreateManyPlayerInputEnvelope>;
  connect?: Maybe<Array<PlayerHWhereUniqueInput>>;
  set?: Maybe<Array<PlayerHWhereUniqueInput>>;
  disconnect?: Maybe<Array<PlayerHWhereUniqueInput>>;
  delete?: Maybe<Array<PlayerHWhereUniqueInput>>;
  update?: Maybe<Array<PlayerHUpdateWithWhereUniqueWithoutPlayerInput>>;
  updateMany?: Maybe<Array<PlayerHUpdateManyWithWhereWithoutPlayerInput>>;
  deleteMany?: Maybe<Array<PlayerHScalarWhereInput>>;
};

export type PlayerHUpdateOneWithoutTeam1Input = {
  create?: Maybe<PlayerHCreateWithoutTeam1Input>;
  connectOrCreate?: Maybe<PlayerHCreateOrConnectWithoutTeam1Input>;
  upsert?: Maybe<PlayerHUpsertWithoutTeam1Input>;
  connect?: Maybe<PlayerHWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<PlayerHUpdateWithoutTeam1Input>;
};

export type PlayerHUpdateOneWithoutTeam2Input = {
  create?: Maybe<PlayerHCreateWithoutTeam2Input>;
  connectOrCreate?: Maybe<PlayerHCreateOrConnectWithoutTeam2Input>;
  upsert?: Maybe<PlayerHUpsertWithoutTeam2Input>;
  connect?: Maybe<PlayerHWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<PlayerHUpdateWithoutTeam2Input>;
};

export type PlayerHUpdateOneWithoutTeam3Input = {
  create?: Maybe<PlayerHCreateWithoutTeam3Input>;
  connectOrCreate?: Maybe<PlayerHCreateOrConnectWithoutTeam3Input>;
  upsert?: Maybe<PlayerHUpsertWithoutTeam3Input>;
  connect?: Maybe<PlayerHWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<PlayerHUpdateWithoutTeam3Input>;
};

export type PlayerHUpdateOneWithoutTeam4Input = {
  create?: Maybe<PlayerHCreateWithoutTeam4Input>;
  connectOrCreate?: Maybe<PlayerHCreateOrConnectWithoutTeam4Input>;
  upsert?: Maybe<PlayerHUpsertWithoutTeam4Input>;
  connect?: Maybe<PlayerHWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<PlayerHUpdateWithoutTeam4Input>;
};

export type PlayerHUpdateOneWithoutTeam5Input = {
  create?: Maybe<PlayerHCreateWithoutTeam5Input>;
  connectOrCreate?: Maybe<PlayerHCreateOrConnectWithoutTeam5Input>;
  upsert?: Maybe<PlayerHUpsertWithoutTeam5Input>;
  connect?: Maybe<PlayerHWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<PlayerHUpdateWithoutTeam5Input>;
};

export type PlayerHUpdateWithWhereUniqueWithoutPlayerInput = {
  where: PlayerHWhereUniqueInput;
  data: PlayerHUpdateWithoutPlayerInput;
};

export type PlayerHUpdateWithoutPlayerInput = {
  skillLevel?: Maybe<NullableFloatFieldUpdateOperationsInput>;
  userTag?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  Team1?: Maybe<TeamUpdateManyWithoutPlayerH1Input>;
  Team2?: Maybe<TeamUpdateManyWithoutPlayerH2Input>;
  Team3?: Maybe<TeamUpdateManyWithoutPlayerH3Input>;
  Team4?: Maybe<TeamUpdateManyWithoutPlayerH4Input>;
  Team5?: Maybe<TeamUpdateManyWithoutPlayerH5Input>;
};

export type PlayerHUpdateWithoutTeam1Input = {
  skillLevel?: Maybe<NullableFloatFieldUpdateOperationsInput>;
  userTag?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  Player?: Maybe<PlayerUpdateOneWithoutPlayerHInput>;
  Team2?: Maybe<TeamUpdateManyWithoutPlayerH2Input>;
  Team3?: Maybe<TeamUpdateManyWithoutPlayerH3Input>;
  Team4?: Maybe<TeamUpdateManyWithoutPlayerH4Input>;
  Team5?: Maybe<TeamUpdateManyWithoutPlayerH5Input>;
};

export type PlayerHUpdateWithoutTeam2Input = {
  skillLevel?: Maybe<NullableFloatFieldUpdateOperationsInput>;
  userTag?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  Player?: Maybe<PlayerUpdateOneWithoutPlayerHInput>;
  Team1?: Maybe<TeamUpdateManyWithoutPlayerH1Input>;
  Team3?: Maybe<TeamUpdateManyWithoutPlayerH3Input>;
  Team4?: Maybe<TeamUpdateManyWithoutPlayerH4Input>;
  Team5?: Maybe<TeamUpdateManyWithoutPlayerH5Input>;
};

export type PlayerHUpdateWithoutTeam3Input = {
  skillLevel?: Maybe<NullableFloatFieldUpdateOperationsInput>;
  userTag?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  Player?: Maybe<PlayerUpdateOneWithoutPlayerHInput>;
  Team1?: Maybe<TeamUpdateManyWithoutPlayerH1Input>;
  Team2?: Maybe<TeamUpdateManyWithoutPlayerH2Input>;
  Team4?: Maybe<TeamUpdateManyWithoutPlayerH4Input>;
  Team5?: Maybe<TeamUpdateManyWithoutPlayerH5Input>;
};

export type PlayerHUpdateWithoutTeam4Input = {
  skillLevel?: Maybe<NullableFloatFieldUpdateOperationsInput>;
  userTag?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  Player?: Maybe<PlayerUpdateOneWithoutPlayerHInput>;
  Team1?: Maybe<TeamUpdateManyWithoutPlayerH1Input>;
  Team2?: Maybe<TeamUpdateManyWithoutPlayerH2Input>;
  Team3?: Maybe<TeamUpdateManyWithoutPlayerH3Input>;
  Team5?: Maybe<TeamUpdateManyWithoutPlayerH5Input>;
};

export type PlayerHUpdateWithoutTeam5Input = {
  skillLevel?: Maybe<NullableFloatFieldUpdateOperationsInput>;
  userTag?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  Player?: Maybe<PlayerUpdateOneWithoutPlayerHInput>;
  Team1?: Maybe<TeamUpdateManyWithoutPlayerH1Input>;
  Team2?: Maybe<TeamUpdateManyWithoutPlayerH2Input>;
  Team3?: Maybe<TeamUpdateManyWithoutPlayerH3Input>;
  Team4?: Maybe<TeamUpdateManyWithoutPlayerH4Input>;
};

export type PlayerHUpsertWithWhereUniqueWithoutPlayerInput = {
  where: PlayerHWhereUniqueInput;
  update: PlayerHUpdateWithoutPlayerInput;
  create: PlayerHCreateWithoutPlayerInput;
};

export type PlayerHUpsertWithoutTeam1Input = {
  update: PlayerHUpdateWithoutTeam1Input;
  create: PlayerHCreateWithoutTeam1Input;
};

export type PlayerHUpsertWithoutTeam2Input = {
  update: PlayerHUpdateWithoutTeam2Input;
  create: PlayerHCreateWithoutTeam2Input;
};

export type PlayerHUpsertWithoutTeam3Input = {
  update: PlayerHUpdateWithoutTeam3Input;
  create: PlayerHCreateWithoutTeam3Input;
};

export type PlayerHUpsertWithoutTeam4Input = {
  update: PlayerHUpdateWithoutTeam4Input;
  create: PlayerHCreateWithoutTeam4Input;
};

export type PlayerHUpsertWithoutTeam5Input = {
  update: PlayerHUpdateWithoutTeam5Input;
  create: PlayerHCreateWithoutTeam5Input;
};

export type PlayerHWhereInput = {
  AND?: Maybe<Array<PlayerHWhereInput>>;
  OR?: Maybe<Array<PlayerHWhereInput>>;
  NOT?: Maybe<Array<PlayerHWhereInput>>;
  id?: Maybe<IntFilter>;
  playerId?: Maybe<IntNullableFilter>;
  skillLevel?: Maybe<FloatNullableFilter>;
  userTag?: Maybe<StringNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  Player?: Maybe<PlayerRelationFilter>;
  Team1?: Maybe<TeamListRelationFilter>;
  Team2?: Maybe<TeamListRelationFilter>;
  Team3?: Maybe<TeamListRelationFilter>;
  Team4?: Maybe<TeamListRelationFilter>;
  Team5?: Maybe<TeamListRelationFilter>;
};

export type PlayerHWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type PlayerOrderByInput = {
  id?: Maybe<SortOrder>;
  userId?: Maybe<SortOrder>;
  skillLevel?: Maybe<SortOrder>;
  userTag?: Maybe<SortOrder>;
  favoriteMap?: Maybe<SortOrder>;
  imageUrl?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type PlayerRelationFilter = {
  is?: Maybe<PlayerWhereInput>;
  isNot?: Maybe<PlayerWhereInput>;
};

export enum PlayerScalarFieldEnum {
  Id = 'id',
  UserId = 'userId',
  SkillLevel = 'skillLevel',
  UserTag = 'userTag',
  FavoriteMap = 'favoriteMap',
  ImageUrl = 'imageUrl',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

export type PlayerUpdateInput = {
  userId?: Maybe<NullableStringFieldUpdateOperationsInput>;
  skillLevel?: Maybe<NullableFloatFieldUpdateOperationsInput>;
  userTag?: Maybe<NullableStringFieldUpdateOperationsInput>;
  favoriteMap?: Maybe<NullableEnumMapFieldUpdateOperationsInput>;
  imageUrl?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  PlayerH?: Maybe<PlayerHUpdateManyWithoutPlayerInput>;
};

export type PlayerUpdateOneWithoutPlayerHInput = {
  create?: Maybe<PlayerCreateWithoutPlayerHInput>;
  connectOrCreate?: Maybe<PlayerCreateOrConnectWithoutPlayerHInput>;
  upsert?: Maybe<PlayerUpsertWithoutPlayerHInput>;
  connect?: Maybe<PlayerWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<PlayerUpdateWithoutPlayerHInput>;
};

export type PlayerUpdateWithoutPlayerHInput = {
  userId?: Maybe<NullableStringFieldUpdateOperationsInput>;
  skillLevel?: Maybe<NullableFloatFieldUpdateOperationsInput>;
  userTag?: Maybe<NullableStringFieldUpdateOperationsInput>;
  favoriteMap?: Maybe<NullableEnumMapFieldUpdateOperationsInput>;
  imageUrl?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type PlayerUpsertWithoutPlayerHInput = {
  update: PlayerUpdateWithoutPlayerHInput;
  create: PlayerCreateWithoutPlayerHInput;
};

export type PlayerWhereInput = {
  AND?: Maybe<Array<PlayerWhereInput>>;
  OR?: Maybe<Array<PlayerWhereInput>>;
  NOT?: Maybe<Array<PlayerWhereInput>>;
  id?: Maybe<IntFilter>;
  userId?: Maybe<StringNullableFilter>;
  skillLevel?: Maybe<FloatNullableFilter>;
  userTag?: Maybe<StringNullableFilter>;
  favoriteMap?: Maybe<EnumMapNullableFilter>;
  imageUrl?: Maybe<StringNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  PlayerH?: Maybe<PlayerHListRelationFilter>;
};

export type PlayerWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  match?: Maybe<Match>;
  matches: Array<Match>;
  aggregateMatch: AggregateMatch;
  player?: Maybe<Player>;
  players: Array<Player>;
  playerH?: Maybe<PlayerH>;
  playerHS: Array<PlayerH>;
  team?: Maybe<Team>;
  teams: Array<Team>;
};


export type QueryMatchArgs = {
  where: MatchWhereUniqueInput;
};


export type QueryMatchesArgs = {
  where?: Maybe<MatchWhereInput>;
  orderBy?: Maybe<Array<MatchOrderByInput>>;
  cursor?: Maybe<MatchWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<Array<MatchScalarFieldEnum>>;
};


export type QueryAggregateMatchArgs = {
  where?: Maybe<MatchWhereInput>;
  orderBy?: Maybe<Array<MatchOrderByInput>>;
  cursor?: Maybe<MatchWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryPlayerArgs = {
  where: PlayerWhereUniqueInput;
};


export type QueryPlayersArgs = {
  where?: Maybe<PlayerWhereInput>;
  orderBy?: Maybe<Array<PlayerOrderByInput>>;
  cursor?: Maybe<PlayerWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<Array<PlayerScalarFieldEnum>>;
};


export type QueryPlayerHArgs = {
  where: PlayerHWhereUniqueInput;
};


export type QueryPlayerHsArgs = {
  where?: Maybe<PlayerHWhereInput>;
  orderBy?: Maybe<Array<PlayerHOrderByInput>>;
  cursor?: Maybe<PlayerHWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<Array<PlayerHScalarFieldEnum>>;
};


export type QueryTeamArgs = {
  where: TeamWhereUniqueInput;
};


export type QueryTeamsArgs = {
  where?: Maybe<TeamWhereInput>;
  orderBy?: Maybe<Array<TeamOrderByInput>>;
  cursor?: Maybe<TeamWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<Array<TeamScalarFieldEnum>>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringNullableFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringNullableFilter>;
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['Int'];
  teamName?: Maybe<Scalars['String']>;
  playerId1?: Maybe<Scalars['Int']>;
  playerId2?: Maybe<Scalars['Int']>;
  playerId3?: Maybe<Scalars['Int']>;
  playerId4?: Maybe<Scalars['Int']>;
  playerId5?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  PlayerH1?: Maybe<PlayerH>;
  PlayerH2?: Maybe<PlayerH>;
  PlayerH3?: Maybe<PlayerH>;
  PlayerH4?: Maybe<PlayerH>;
  PlayerH5?: Maybe<PlayerH>;
  Match1: Array<Match>;
  Match2: Array<Match>;
};


export type TeamMatch1Args = {
  where?: Maybe<MatchWhereInput>;
  orderBy?: Maybe<Array<MatchOrderByInput>>;
  cursor?: Maybe<MatchWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<Array<MatchScalarFieldEnum>>;
};


export type TeamMatch2Args = {
  where?: Maybe<MatchWhereInput>;
  orderBy?: Maybe<Array<MatchOrderByInput>>;
  cursor?: Maybe<MatchWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<Array<MatchScalarFieldEnum>>;
};

export type TeamCreateInput = {
  teamName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  PlayerH1?: Maybe<PlayerHCreateNestedOneWithoutTeam1Input>;
  PlayerH2?: Maybe<PlayerHCreateNestedOneWithoutTeam2Input>;
  PlayerH3?: Maybe<PlayerHCreateNestedOneWithoutTeam3Input>;
  PlayerH4?: Maybe<PlayerHCreateNestedOneWithoutTeam4Input>;
  PlayerH5?: Maybe<PlayerHCreateNestedOneWithoutTeam5Input>;
  Match1?: Maybe<MatchCreateNestedManyWithoutTeam1Input>;
  Match2?: Maybe<MatchCreateNestedManyWithoutTeam2Input>;
};

export type TeamCreateManyPlayerH1Input = {
  id?: Maybe<Scalars['Int']>;
  teamName?: Maybe<Scalars['String']>;
  playerId2?: Maybe<Scalars['Int']>;
  playerId3?: Maybe<Scalars['Int']>;
  playerId4?: Maybe<Scalars['Int']>;
  playerId5?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TeamCreateManyPlayerH1InputEnvelope = {
  data: Array<TeamCreateManyPlayerH1Input>;
  skipDuplicates?: Maybe<Scalars['Boolean']>;
};

export type TeamCreateManyPlayerH2Input = {
  id?: Maybe<Scalars['Int']>;
  teamName?: Maybe<Scalars['String']>;
  playerId1?: Maybe<Scalars['Int']>;
  playerId3?: Maybe<Scalars['Int']>;
  playerId4?: Maybe<Scalars['Int']>;
  playerId5?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TeamCreateManyPlayerH2InputEnvelope = {
  data: Array<TeamCreateManyPlayerH2Input>;
  skipDuplicates?: Maybe<Scalars['Boolean']>;
};

export type TeamCreateManyPlayerH3Input = {
  id?: Maybe<Scalars['Int']>;
  teamName?: Maybe<Scalars['String']>;
  playerId1?: Maybe<Scalars['Int']>;
  playerId2?: Maybe<Scalars['Int']>;
  playerId4?: Maybe<Scalars['Int']>;
  playerId5?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TeamCreateManyPlayerH3InputEnvelope = {
  data: Array<TeamCreateManyPlayerH3Input>;
  skipDuplicates?: Maybe<Scalars['Boolean']>;
};

export type TeamCreateManyPlayerH4Input = {
  id?: Maybe<Scalars['Int']>;
  teamName?: Maybe<Scalars['String']>;
  playerId1?: Maybe<Scalars['Int']>;
  playerId2?: Maybe<Scalars['Int']>;
  playerId3?: Maybe<Scalars['Int']>;
  playerId5?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TeamCreateManyPlayerH4InputEnvelope = {
  data: Array<TeamCreateManyPlayerH4Input>;
  skipDuplicates?: Maybe<Scalars['Boolean']>;
};

export type TeamCreateManyPlayerH5Input = {
  id?: Maybe<Scalars['Int']>;
  teamName?: Maybe<Scalars['String']>;
  playerId1?: Maybe<Scalars['Int']>;
  playerId2?: Maybe<Scalars['Int']>;
  playerId3?: Maybe<Scalars['Int']>;
  playerId4?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TeamCreateManyPlayerH5InputEnvelope = {
  data: Array<TeamCreateManyPlayerH5Input>;
  skipDuplicates?: Maybe<Scalars['Boolean']>;
};

export type TeamCreateNestedManyWithoutPlayerH1Input = {
  create?: Maybe<Array<TeamCreateWithoutPlayerH1Input>>;
  connectOrCreate?: Maybe<Array<TeamCreateOrConnectWithoutPlayerH1Input>>;
  createMany?: Maybe<TeamCreateManyPlayerH1InputEnvelope>;
  connect?: Maybe<Array<TeamWhereUniqueInput>>;
};

export type TeamCreateNestedManyWithoutPlayerH2Input = {
  create?: Maybe<Array<TeamCreateWithoutPlayerH2Input>>;
  connectOrCreate?: Maybe<Array<TeamCreateOrConnectWithoutPlayerH2Input>>;
  createMany?: Maybe<TeamCreateManyPlayerH2InputEnvelope>;
  connect?: Maybe<Array<TeamWhereUniqueInput>>;
};

export type TeamCreateNestedManyWithoutPlayerH3Input = {
  create?: Maybe<Array<TeamCreateWithoutPlayerH3Input>>;
  connectOrCreate?: Maybe<Array<TeamCreateOrConnectWithoutPlayerH3Input>>;
  createMany?: Maybe<TeamCreateManyPlayerH3InputEnvelope>;
  connect?: Maybe<Array<TeamWhereUniqueInput>>;
};

export type TeamCreateNestedManyWithoutPlayerH4Input = {
  create?: Maybe<Array<TeamCreateWithoutPlayerH4Input>>;
  connectOrCreate?: Maybe<Array<TeamCreateOrConnectWithoutPlayerH4Input>>;
  createMany?: Maybe<TeamCreateManyPlayerH4InputEnvelope>;
  connect?: Maybe<Array<TeamWhereUniqueInput>>;
};

export type TeamCreateNestedManyWithoutPlayerH5Input = {
  create?: Maybe<Array<TeamCreateWithoutPlayerH5Input>>;
  connectOrCreate?: Maybe<Array<TeamCreateOrConnectWithoutPlayerH5Input>>;
  createMany?: Maybe<TeamCreateManyPlayerH5InputEnvelope>;
  connect?: Maybe<Array<TeamWhereUniqueInput>>;
};

export type TeamCreateNestedOneWithoutMatch1Input = {
  create?: Maybe<TeamCreateWithoutMatch1Input>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutMatch1Input>;
  connect?: Maybe<TeamWhereUniqueInput>;
};

export type TeamCreateNestedOneWithoutMatch2Input = {
  create?: Maybe<TeamCreateWithoutMatch2Input>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutMatch2Input>;
  connect?: Maybe<TeamWhereUniqueInput>;
};

export type TeamCreateOrConnectWithoutMatch1Input = {
  where: TeamWhereUniqueInput;
  create: TeamCreateWithoutMatch1Input;
};

export type TeamCreateOrConnectWithoutMatch2Input = {
  where: TeamWhereUniqueInput;
  create: TeamCreateWithoutMatch2Input;
};

export type TeamCreateOrConnectWithoutPlayerH1Input = {
  where: TeamWhereUniqueInput;
  create: TeamCreateWithoutPlayerH1Input;
};

export type TeamCreateOrConnectWithoutPlayerH2Input = {
  where: TeamWhereUniqueInput;
  create: TeamCreateWithoutPlayerH2Input;
};

export type TeamCreateOrConnectWithoutPlayerH3Input = {
  where: TeamWhereUniqueInput;
  create: TeamCreateWithoutPlayerH3Input;
};

export type TeamCreateOrConnectWithoutPlayerH4Input = {
  where: TeamWhereUniqueInput;
  create: TeamCreateWithoutPlayerH4Input;
};

export type TeamCreateOrConnectWithoutPlayerH5Input = {
  where: TeamWhereUniqueInput;
  create: TeamCreateWithoutPlayerH5Input;
};

export type TeamCreateWithoutMatch1Input = {
  teamName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  PlayerH1?: Maybe<PlayerHCreateNestedOneWithoutTeam1Input>;
  PlayerH2?: Maybe<PlayerHCreateNestedOneWithoutTeam2Input>;
  PlayerH3?: Maybe<PlayerHCreateNestedOneWithoutTeam3Input>;
  PlayerH4?: Maybe<PlayerHCreateNestedOneWithoutTeam4Input>;
  PlayerH5?: Maybe<PlayerHCreateNestedOneWithoutTeam5Input>;
  Match2?: Maybe<MatchCreateNestedManyWithoutTeam2Input>;
};

export type TeamCreateWithoutMatch2Input = {
  teamName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  PlayerH1?: Maybe<PlayerHCreateNestedOneWithoutTeam1Input>;
  PlayerH2?: Maybe<PlayerHCreateNestedOneWithoutTeam2Input>;
  PlayerH3?: Maybe<PlayerHCreateNestedOneWithoutTeam3Input>;
  PlayerH4?: Maybe<PlayerHCreateNestedOneWithoutTeam4Input>;
  PlayerH5?: Maybe<PlayerHCreateNestedOneWithoutTeam5Input>;
  Match1?: Maybe<MatchCreateNestedManyWithoutTeam1Input>;
};

export type TeamCreateWithoutPlayerH1Input = {
  teamName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  PlayerH2?: Maybe<PlayerHCreateNestedOneWithoutTeam2Input>;
  PlayerH3?: Maybe<PlayerHCreateNestedOneWithoutTeam3Input>;
  PlayerH4?: Maybe<PlayerHCreateNestedOneWithoutTeam4Input>;
  PlayerH5?: Maybe<PlayerHCreateNestedOneWithoutTeam5Input>;
  Match1?: Maybe<MatchCreateNestedManyWithoutTeam1Input>;
  Match2?: Maybe<MatchCreateNestedManyWithoutTeam2Input>;
};

export type TeamCreateWithoutPlayerH2Input = {
  teamName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  PlayerH1?: Maybe<PlayerHCreateNestedOneWithoutTeam1Input>;
  PlayerH3?: Maybe<PlayerHCreateNestedOneWithoutTeam3Input>;
  PlayerH4?: Maybe<PlayerHCreateNestedOneWithoutTeam4Input>;
  PlayerH5?: Maybe<PlayerHCreateNestedOneWithoutTeam5Input>;
  Match1?: Maybe<MatchCreateNestedManyWithoutTeam1Input>;
  Match2?: Maybe<MatchCreateNestedManyWithoutTeam2Input>;
};

export type TeamCreateWithoutPlayerH3Input = {
  teamName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  PlayerH1?: Maybe<PlayerHCreateNestedOneWithoutTeam1Input>;
  PlayerH2?: Maybe<PlayerHCreateNestedOneWithoutTeam2Input>;
  PlayerH4?: Maybe<PlayerHCreateNestedOneWithoutTeam4Input>;
  PlayerH5?: Maybe<PlayerHCreateNestedOneWithoutTeam5Input>;
  Match1?: Maybe<MatchCreateNestedManyWithoutTeam1Input>;
  Match2?: Maybe<MatchCreateNestedManyWithoutTeam2Input>;
};

export type TeamCreateWithoutPlayerH4Input = {
  teamName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  PlayerH1?: Maybe<PlayerHCreateNestedOneWithoutTeam1Input>;
  PlayerH2?: Maybe<PlayerHCreateNestedOneWithoutTeam2Input>;
  PlayerH3?: Maybe<PlayerHCreateNestedOneWithoutTeam3Input>;
  PlayerH5?: Maybe<PlayerHCreateNestedOneWithoutTeam5Input>;
  Match1?: Maybe<MatchCreateNestedManyWithoutTeam1Input>;
  Match2?: Maybe<MatchCreateNestedManyWithoutTeam2Input>;
};

export type TeamCreateWithoutPlayerH5Input = {
  teamName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  PlayerH1?: Maybe<PlayerHCreateNestedOneWithoutTeam1Input>;
  PlayerH2?: Maybe<PlayerHCreateNestedOneWithoutTeam2Input>;
  PlayerH3?: Maybe<PlayerHCreateNestedOneWithoutTeam3Input>;
  PlayerH4?: Maybe<PlayerHCreateNestedOneWithoutTeam4Input>;
  Match1?: Maybe<MatchCreateNestedManyWithoutTeam1Input>;
  Match2?: Maybe<MatchCreateNestedManyWithoutTeam2Input>;
};

export type TeamListRelationFilter = {
  every?: Maybe<TeamWhereInput>;
  some?: Maybe<TeamWhereInput>;
  none?: Maybe<TeamWhereInput>;
};

export type TeamOrderByInput = {
  id?: Maybe<SortOrder>;
  teamName?: Maybe<SortOrder>;
  playerId1?: Maybe<SortOrder>;
  playerId2?: Maybe<SortOrder>;
  playerId3?: Maybe<SortOrder>;
  playerId4?: Maybe<SortOrder>;
  playerId5?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type TeamRelationFilter = {
  is?: Maybe<TeamWhereInput>;
  isNot?: Maybe<TeamWhereInput>;
};

export enum TeamScalarFieldEnum {
  Id = 'id',
  TeamName = 'teamName',
  PlayerId1 = 'playerId1',
  PlayerId2 = 'playerId2',
  PlayerId3 = 'playerId3',
  PlayerId4 = 'playerId4',
  PlayerId5 = 'playerId5',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

export type TeamScalarWhereInput = {
  AND?: Maybe<Array<TeamScalarWhereInput>>;
  OR?: Maybe<Array<TeamScalarWhereInput>>;
  NOT?: Maybe<Array<TeamScalarWhereInput>>;
  id?: Maybe<IntFilter>;
  teamName?: Maybe<StringNullableFilter>;
  playerId1?: Maybe<IntNullableFilter>;
  playerId2?: Maybe<IntNullableFilter>;
  playerId3?: Maybe<IntNullableFilter>;
  playerId4?: Maybe<IntNullableFilter>;
  playerId5?: Maybe<IntNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type TeamUpdateInput = {
  teamName?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  PlayerH1?: Maybe<PlayerHUpdateOneWithoutTeam1Input>;
  PlayerH2?: Maybe<PlayerHUpdateOneWithoutTeam2Input>;
  PlayerH3?: Maybe<PlayerHUpdateOneWithoutTeam3Input>;
  PlayerH4?: Maybe<PlayerHUpdateOneWithoutTeam4Input>;
  PlayerH5?: Maybe<PlayerHUpdateOneWithoutTeam5Input>;
  Match1?: Maybe<MatchUpdateManyWithoutTeam1Input>;
  Match2?: Maybe<MatchUpdateManyWithoutTeam2Input>;
};

export type TeamUpdateManyMutationInput = {
  teamName?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type TeamUpdateManyWithWhereWithoutPlayerH1Input = {
  where: TeamScalarWhereInput;
  data: TeamUpdateManyMutationInput;
};

export type TeamUpdateManyWithWhereWithoutPlayerH2Input = {
  where: TeamScalarWhereInput;
  data: TeamUpdateManyMutationInput;
};

export type TeamUpdateManyWithWhereWithoutPlayerH3Input = {
  where: TeamScalarWhereInput;
  data: TeamUpdateManyMutationInput;
};

export type TeamUpdateManyWithWhereWithoutPlayerH4Input = {
  where: TeamScalarWhereInput;
  data: TeamUpdateManyMutationInput;
};

export type TeamUpdateManyWithWhereWithoutPlayerH5Input = {
  where: TeamScalarWhereInput;
  data: TeamUpdateManyMutationInput;
};

export type TeamUpdateManyWithoutPlayerH1Input = {
  create?: Maybe<Array<TeamCreateWithoutPlayerH1Input>>;
  connectOrCreate?: Maybe<Array<TeamCreateOrConnectWithoutPlayerH1Input>>;
  upsert?: Maybe<Array<TeamUpsertWithWhereUniqueWithoutPlayerH1Input>>;
  createMany?: Maybe<TeamCreateManyPlayerH1InputEnvelope>;
  connect?: Maybe<Array<TeamWhereUniqueInput>>;
  set?: Maybe<Array<TeamWhereUniqueInput>>;
  disconnect?: Maybe<Array<TeamWhereUniqueInput>>;
  delete?: Maybe<Array<TeamWhereUniqueInput>>;
  update?: Maybe<Array<TeamUpdateWithWhereUniqueWithoutPlayerH1Input>>;
  updateMany?: Maybe<Array<TeamUpdateManyWithWhereWithoutPlayerH1Input>>;
  deleteMany?: Maybe<Array<TeamScalarWhereInput>>;
};

export type TeamUpdateManyWithoutPlayerH2Input = {
  create?: Maybe<Array<TeamCreateWithoutPlayerH2Input>>;
  connectOrCreate?: Maybe<Array<TeamCreateOrConnectWithoutPlayerH2Input>>;
  upsert?: Maybe<Array<TeamUpsertWithWhereUniqueWithoutPlayerH2Input>>;
  createMany?: Maybe<TeamCreateManyPlayerH2InputEnvelope>;
  connect?: Maybe<Array<TeamWhereUniqueInput>>;
  set?: Maybe<Array<TeamWhereUniqueInput>>;
  disconnect?: Maybe<Array<TeamWhereUniqueInput>>;
  delete?: Maybe<Array<TeamWhereUniqueInput>>;
  update?: Maybe<Array<TeamUpdateWithWhereUniqueWithoutPlayerH2Input>>;
  updateMany?: Maybe<Array<TeamUpdateManyWithWhereWithoutPlayerH2Input>>;
  deleteMany?: Maybe<Array<TeamScalarWhereInput>>;
};

export type TeamUpdateManyWithoutPlayerH3Input = {
  create?: Maybe<Array<TeamCreateWithoutPlayerH3Input>>;
  connectOrCreate?: Maybe<Array<TeamCreateOrConnectWithoutPlayerH3Input>>;
  upsert?: Maybe<Array<TeamUpsertWithWhereUniqueWithoutPlayerH3Input>>;
  createMany?: Maybe<TeamCreateManyPlayerH3InputEnvelope>;
  connect?: Maybe<Array<TeamWhereUniqueInput>>;
  set?: Maybe<Array<TeamWhereUniqueInput>>;
  disconnect?: Maybe<Array<TeamWhereUniqueInput>>;
  delete?: Maybe<Array<TeamWhereUniqueInput>>;
  update?: Maybe<Array<TeamUpdateWithWhereUniqueWithoutPlayerH3Input>>;
  updateMany?: Maybe<Array<TeamUpdateManyWithWhereWithoutPlayerH3Input>>;
  deleteMany?: Maybe<Array<TeamScalarWhereInput>>;
};

export type TeamUpdateManyWithoutPlayerH4Input = {
  create?: Maybe<Array<TeamCreateWithoutPlayerH4Input>>;
  connectOrCreate?: Maybe<Array<TeamCreateOrConnectWithoutPlayerH4Input>>;
  upsert?: Maybe<Array<TeamUpsertWithWhereUniqueWithoutPlayerH4Input>>;
  createMany?: Maybe<TeamCreateManyPlayerH4InputEnvelope>;
  connect?: Maybe<Array<TeamWhereUniqueInput>>;
  set?: Maybe<Array<TeamWhereUniqueInput>>;
  disconnect?: Maybe<Array<TeamWhereUniqueInput>>;
  delete?: Maybe<Array<TeamWhereUniqueInput>>;
  update?: Maybe<Array<TeamUpdateWithWhereUniqueWithoutPlayerH4Input>>;
  updateMany?: Maybe<Array<TeamUpdateManyWithWhereWithoutPlayerH4Input>>;
  deleteMany?: Maybe<Array<TeamScalarWhereInput>>;
};

export type TeamUpdateManyWithoutPlayerH5Input = {
  create?: Maybe<Array<TeamCreateWithoutPlayerH5Input>>;
  connectOrCreate?: Maybe<Array<TeamCreateOrConnectWithoutPlayerH5Input>>;
  upsert?: Maybe<Array<TeamUpsertWithWhereUniqueWithoutPlayerH5Input>>;
  createMany?: Maybe<TeamCreateManyPlayerH5InputEnvelope>;
  connect?: Maybe<Array<TeamWhereUniqueInput>>;
  set?: Maybe<Array<TeamWhereUniqueInput>>;
  disconnect?: Maybe<Array<TeamWhereUniqueInput>>;
  delete?: Maybe<Array<TeamWhereUniqueInput>>;
  update?: Maybe<Array<TeamUpdateWithWhereUniqueWithoutPlayerH5Input>>;
  updateMany?: Maybe<Array<TeamUpdateManyWithWhereWithoutPlayerH5Input>>;
  deleteMany?: Maybe<Array<TeamScalarWhereInput>>;
};

export type TeamUpdateOneWithoutMatch1Input = {
  create?: Maybe<TeamCreateWithoutMatch1Input>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutMatch1Input>;
  upsert?: Maybe<TeamUpsertWithoutMatch1Input>;
  connect?: Maybe<TeamWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<TeamUpdateWithoutMatch1Input>;
};

export type TeamUpdateOneWithoutMatch2Input = {
  create?: Maybe<TeamCreateWithoutMatch2Input>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutMatch2Input>;
  upsert?: Maybe<TeamUpsertWithoutMatch2Input>;
  connect?: Maybe<TeamWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<TeamUpdateWithoutMatch2Input>;
};

export type TeamUpdateWithWhereUniqueWithoutPlayerH1Input = {
  where: TeamWhereUniqueInput;
  data: TeamUpdateWithoutPlayerH1Input;
};

export type TeamUpdateWithWhereUniqueWithoutPlayerH2Input = {
  where: TeamWhereUniqueInput;
  data: TeamUpdateWithoutPlayerH2Input;
};

export type TeamUpdateWithWhereUniqueWithoutPlayerH3Input = {
  where: TeamWhereUniqueInput;
  data: TeamUpdateWithoutPlayerH3Input;
};

export type TeamUpdateWithWhereUniqueWithoutPlayerH4Input = {
  where: TeamWhereUniqueInput;
  data: TeamUpdateWithoutPlayerH4Input;
};

export type TeamUpdateWithWhereUniqueWithoutPlayerH5Input = {
  where: TeamWhereUniqueInput;
  data: TeamUpdateWithoutPlayerH5Input;
};

export type TeamUpdateWithoutMatch1Input = {
  teamName?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  PlayerH1?: Maybe<PlayerHUpdateOneWithoutTeam1Input>;
  PlayerH2?: Maybe<PlayerHUpdateOneWithoutTeam2Input>;
  PlayerH3?: Maybe<PlayerHUpdateOneWithoutTeam3Input>;
  PlayerH4?: Maybe<PlayerHUpdateOneWithoutTeam4Input>;
  PlayerH5?: Maybe<PlayerHUpdateOneWithoutTeam5Input>;
  Match2?: Maybe<MatchUpdateManyWithoutTeam2Input>;
};

export type TeamUpdateWithoutMatch2Input = {
  teamName?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  PlayerH1?: Maybe<PlayerHUpdateOneWithoutTeam1Input>;
  PlayerH2?: Maybe<PlayerHUpdateOneWithoutTeam2Input>;
  PlayerH3?: Maybe<PlayerHUpdateOneWithoutTeam3Input>;
  PlayerH4?: Maybe<PlayerHUpdateOneWithoutTeam4Input>;
  PlayerH5?: Maybe<PlayerHUpdateOneWithoutTeam5Input>;
  Match1?: Maybe<MatchUpdateManyWithoutTeam1Input>;
};

export type TeamUpdateWithoutPlayerH1Input = {
  teamName?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  PlayerH2?: Maybe<PlayerHUpdateOneWithoutTeam2Input>;
  PlayerH3?: Maybe<PlayerHUpdateOneWithoutTeam3Input>;
  PlayerH4?: Maybe<PlayerHUpdateOneWithoutTeam4Input>;
  PlayerH5?: Maybe<PlayerHUpdateOneWithoutTeam5Input>;
  Match1?: Maybe<MatchUpdateManyWithoutTeam1Input>;
  Match2?: Maybe<MatchUpdateManyWithoutTeam2Input>;
};

export type TeamUpdateWithoutPlayerH2Input = {
  teamName?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  PlayerH1?: Maybe<PlayerHUpdateOneWithoutTeam1Input>;
  PlayerH3?: Maybe<PlayerHUpdateOneWithoutTeam3Input>;
  PlayerH4?: Maybe<PlayerHUpdateOneWithoutTeam4Input>;
  PlayerH5?: Maybe<PlayerHUpdateOneWithoutTeam5Input>;
  Match1?: Maybe<MatchUpdateManyWithoutTeam1Input>;
  Match2?: Maybe<MatchUpdateManyWithoutTeam2Input>;
};

export type TeamUpdateWithoutPlayerH3Input = {
  teamName?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  PlayerH1?: Maybe<PlayerHUpdateOneWithoutTeam1Input>;
  PlayerH2?: Maybe<PlayerHUpdateOneWithoutTeam2Input>;
  PlayerH4?: Maybe<PlayerHUpdateOneWithoutTeam4Input>;
  PlayerH5?: Maybe<PlayerHUpdateOneWithoutTeam5Input>;
  Match1?: Maybe<MatchUpdateManyWithoutTeam1Input>;
  Match2?: Maybe<MatchUpdateManyWithoutTeam2Input>;
};

export type TeamUpdateWithoutPlayerH4Input = {
  teamName?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  PlayerH1?: Maybe<PlayerHUpdateOneWithoutTeam1Input>;
  PlayerH2?: Maybe<PlayerHUpdateOneWithoutTeam2Input>;
  PlayerH3?: Maybe<PlayerHUpdateOneWithoutTeam3Input>;
  PlayerH5?: Maybe<PlayerHUpdateOneWithoutTeam5Input>;
  Match1?: Maybe<MatchUpdateManyWithoutTeam1Input>;
  Match2?: Maybe<MatchUpdateManyWithoutTeam2Input>;
};

export type TeamUpdateWithoutPlayerH5Input = {
  teamName?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  PlayerH1?: Maybe<PlayerHUpdateOneWithoutTeam1Input>;
  PlayerH2?: Maybe<PlayerHUpdateOneWithoutTeam2Input>;
  PlayerH3?: Maybe<PlayerHUpdateOneWithoutTeam3Input>;
  PlayerH4?: Maybe<PlayerHUpdateOneWithoutTeam4Input>;
  Match1?: Maybe<MatchUpdateManyWithoutTeam1Input>;
  Match2?: Maybe<MatchUpdateManyWithoutTeam2Input>;
};

export type TeamUpsertWithWhereUniqueWithoutPlayerH1Input = {
  where: TeamWhereUniqueInput;
  update: TeamUpdateWithoutPlayerH1Input;
  create: TeamCreateWithoutPlayerH1Input;
};

export type TeamUpsertWithWhereUniqueWithoutPlayerH2Input = {
  where: TeamWhereUniqueInput;
  update: TeamUpdateWithoutPlayerH2Input;
  create: TeamCreateWithoutPlayerH2Input;
};

export type TeamUpsertWithWhereUniqueWithoutPlayerH3Input = {
  where: TeamWhereUniqueInput;
  update: TeamUpdateWithoutPlayerH3Input;
  create: TeamCreateWithoutPlayerH3Input;
};

export type TeamUpsertWithWhereUniqueWithoutPlayerH4Input = {
  where: TeamWhereUniqueInput;
  update: TeamUpdateWithoutPlayerH4Input;
  create: TeamCreateWithoutPlayerH4Input;
};

export type TeamUpsertWithWhereUniqueWithoutPlayerH5Input = {
  where: TeamWhereUniqueInput;
  update: TeamUpdateWithoutPlayerH5Input;
  create: TeamCreateWithoutPlayerH5Input;
};

export type TeamUpsertWithoutMatch1Input = {
  update: TeamUpdateWithoutMatch1Input;
  create: TeamCreateWithoutMatch1Input;
};

export type TeamUpsertWithoutMatch2Input = {
  update: TeamUpdateWithoutMatch2Input;
  create: TeamCreateWithoutMatch2Input;
};

export type TeamWhereInput = {
  AND?: Maybe<Array<TeamWhereInput>>;
  OR?: Maybe<Array<TeamWhereInput>>;
  NOT?: Maybe<Array<TeamWhereInput>>;
  id?: Maybe<IntFilter>;
  teamName?: Maybe<StringNullableFilter>;
  playerId1?: Maybe<IntNullableFilter>;
  playerId2?: Maybe<IntNullableFilter>;
  playerId3?: Maybe<IntNullableFilter>;
  playerId4?: Maybe<IntNullableFilter>;
  playerId5?: Maybe<IntNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  PlayerH1?: Maybe<PlayerHRelationFilter>;
  PlayerH2?: Maybe<PlayerHRelationFilter>;
  PlayerH3?: Maybe<PlayerHRelationFilter>;
  PlayerH4?: Maybe<PlayerHRelationFilter>;
  PlayerH5?: Maybe<PlayerHRelationFilter>;
  Match1?: Maybe<MatchListRelationFilter>;
  Match2?: Maybe<MatchListRelationFilter>;
};

export type TeamWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type AddMatchMutationVariables = Exact<{
  team1Id: Scalars['Int'];
  team2Id: Scalars['Int'];
}>;


export type AddMatchMutation = (
  { __typename?: 'Mutation' }
  & { match: (
    { __typename?: 'Match' }
    & Pick<Match, 'id'>
    & { Team1?: Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'teamName'>
      & { PlayerH1?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )>, PlayerH2?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )>, PlayerH3?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )>, PlayerH4?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )>, PlayerH5?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )> }
    )>, Team2?: Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'teamName'>
      & { PlayerH1?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )>, PlayerH2?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )>, PlayerH3?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )>, PlayerH4?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )>, PlayerH5?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )> }
    )> }
  ) }
);

export type AddPlayerMutationVariables = Exact<{
  userId: Scalars['String'];
  level: Scalars['Float'];
  userTag: Scalars['String'];
  imageUrl: Scalars['String'];
}>;


export type AddPlayerMutation = (
  { __typename?: 'Mutation' }
  & { newPlayer: (
    { __typename?: 'Player' }
    & Pick<Player, 'id' | 'userTag' | 'skillLevel' | 'favoriteMap' | 'imageUrl'>
  ) }
);

export type CreateTeamWithPlayersMutationVariables = Exact<{
  data: TeamCreateInput;
}>;


export type CreateTeamWithPlayersMutation = (
  { __typename?: 'Mutation' }
  & { team: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'teamName'>
  ) }
);

export type DeleteMatchMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMatchMutation = (
  { __typename?: 'Mutation' }
  & { deletedMatch?: Maybe<(
    { __typename?: 'Match' }
    & Pick<Match, 'id'>
  )> }
);

export type DeleteTeamMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteTeamMutation = (
  { __typename?: 'Mutation' }
  & { deletedTeam?: Maybe<(
    { __typename?: 'Team' }
    & Pick<Team, 'teamName'>
  )> }
);

export type RemovePlayerMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type RemovePlayerMutation = (
  { __typename?: 'Mutation' }
  & { removedPlayer?: Maybe<(
    { __typename?: 'Player' }
    & Pick<Player, 'id' | 'userTag' | 'skillLevel' | 'favoriteMap' | 'imageUrl'>
  )> }
);

export type SwapPlayerHMutationVariables = Exact<{
  id: Scalars['Int'];
  skillLevel: Scalars['Float'];
  userTag: Scalars['String'];
  playerId: Scalars['Int'];
}>;


export type SwapPlayerHMutation = (
  { __typename?: 'Mutation' }
  & { updatePlayerH?: Maybe<(
    { __typename?: 'PlayerH' }
    & Pick<PlayerH, 'id' | 'playerId' | 'userTag'>
  )> }
);

export type UpdatePlayerMapMutationVariables = Exact<{
  userId: Scalars['String'];
  map: Map;
}>;


export type UpdatePlayerMapMutation = (
  { __typename?: 'Mutation' }
  & { updatedPlayer?: Maybe<(
    { __typename?: 'Player' }
    & Pick<Player, 'id' | 'favoriteMap'>
  )> }
);

export type UpdatePlayerSkillMutationVariables = Exact<{
  userId?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Float']>;
}>;


export type UpdatePlayerSkillMutation = (
  { __typename?: 'Mutation' }
  & { updatedPlayer?: Maybe<(
    { __typename?: 'Player' }
    & Pick<Player, 'id' | 'skillLevel'>
  )> }
);

export type UpdateTeamNameMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
}>;


export type UpdateTeamNameMutation = (
  { __typename?: 'Mutation' }
  & { updatedTeam?: Maybe<(
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'teamName'>
  )> }
);

export type UpdateTeamPlayerMutationVariables = Exact<{
  id: Scalars['Int'];
  data: TeamUpdateInput;
}>;


export type UpdateTeamPlayerMutation = (
  { __typename?: 'Mutation' }
  & { updateTeam?: Maybe<(
    { __typename?: 'Team' }
    & Pick<Team, 'teamName'>
    & { PlayerH1?: Maybe<(
      { __typename?: 'PlayerH' }
      & Pick<PlayerH, 'userTag' | 'skillLevel'>
    )>, PlayerH2?: Maybe<(
      { __typename?: 'PlayerH' }
      & Pick<PlayerH, 'userTag' | 'skillLevel'>
    )>, PlayerH3?: Maybe<(
      { __typename?: 'PlayerH' }
      & Pick<PlayerH, 'userTag' | 'skillLevel'>
    )>, PlayerH4?: Maybe<(
      { __typename?: 'PlayerH' }
      & Pick<PlayerH, 'userTag' | 'skillLevel'>
    )>, PlayerH5?: Maybe<(
      { __typename?: 'PlayerH' }
      & Pick<PlayerH, 'userTag' | 'skillLevel'>
    )> }
  )> }
);

export type FindMatchQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FindMatchQuery = (
  { __typename?: 'Query' }
  & { match?: Maybe<(
    { __typename?: 'Match' }
    & Pick<Match, 'id'>
  )> }
);

export type FindTeamQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FindTeamQuery = (
  { __typename?: 'Query' }
  & { team?: Maybe<(
    { __typename?: 'Team' }
    & Pick<Team, 'id'>
  )> }
);

export type GetMatchQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetMatchQuery = (
  { __typename?: 'Query' }
  & { match?: Maybe<(
    { __typename?: 'Match' }
    & Pick<Match, 'matchResult' | 'screenshotPath' | 'map' | 'updatedAt'>
    & { Team1?: Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'teamName'>
      & { PlayerH1?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )>, PlayerH2?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )>, PlayerH3?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )>, PlayerH4?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )>, PlayerH5?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )> }
    )>, Team2?: Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'teamName'>
      & { PlayerH1?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )>, PlayerH2?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )>, PlayerH3?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )>, PlayerH4?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )>, PlayerH5?: Maybe<(
        { __typename?: 'PlayerH' }
        & Pick<PlayerH, 'userTag' | 'skillLevel'>
      )> }
    )> }
  )> }
);

export type GetPlayerQueryVariables = Exact<{
  userId?: Maybe<Scalars['String']>;
}>;


export type GetPlayerQuery = (
  { __typename?: 'Query' }
  & { player?: Maybe<(
    { __typename?: 'Player' }
    & Pick<Player, 'skillLevel' | 'userTag' | 'favoriteMap' | 'imageUrl'>
  )> }
);

export type GetPlayersQueryVariables = Exact<{
  userIds?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type GetPlayersQuery = (
  { __typename?: 'Query' }
  & { players: Array<(
    { __typename?: 'Player' }
    & Pick<Player, 'id' | 'userId' | 'userTag' | 'skillLevel'>
  )> }
);

export type GetPlayersWithUserIdsQueryVariables = Exact<{
  userIds?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type GetPlayersWithUserIdsQuery = (
  { __typename?: 'Query' }
  & { players: Array<(
    { __typename?: 'Player' }
    & Pick<Player, 'userId' | 'skillLevel' | 'userTag'>
  )> }
);

export type GetTeamQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetTeamQuery = (
  { __typename?: 'Query' }
  & { team?: Maybe<(
    { __typename?: 'Team' }
    & Pick<Team, 'teamName'>
    & { PlayerH1?: Maybe<(
      { __typename?: 'PlayerH' }
      & Pick<PlayerH, 'userTag' | 'skillLevel'>
    )>, PlayerH2?: Maybe<(
      { __typename?: 'PlayerH' }
      & Pick<PlayerH, 'userTag' | 'skillLevel'>
    )>, PlayerH3?: Maybe<(
      { __typename?: 'PlayerH' }
      & Pick<PlayerH, 'userTag' | 'skillLevel'>
    )>, PlayerH4?: Maybe<(
      { __typename?: 'PlayerH' }
      & Pick<PlayerH, 'userTag' | 'skillLevel'>
    )>, PlayerH5?: Maybe<(
      { __typename?: 'PlayerH' }
      & Pick<PlayerH, 'userTag' | 'skillLevel'>
    )> }
  )> }
);

export type GetTeamAndCheckPlayersQueryVariables = Exact<{
  teamId: Scalars['Int'];
  userId: Scalars['String'];
  newUserId: Scalars['String'];
}>;


export type GetTeamAndCheckPlayersQuery = (
  { __typename?: 'Query' }
  & { team?: Maybe<(
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'teamName'>
    & { PlayerH1?: Maybe<(
      { __typename?: 'PlayerH' }
      & Pick<PlayerH, 'id' | 'userTag' | 'skillLevel'>
    )>, PlayerH2?: Maybe<(
      { __typename?: 'PlayerH' }
      & Pick<PlayerH, 'id' | 'userTag' | 'skillLevel'>
    )>, PlayerH3?: Maybe<(
      { __typename?: 'PlayerH' }
      & Pick<PlayerH, 'id' | 'userTag' | 'skillLevel'>
    )>, PlayerH4?: Maybe<(
      { __typename?: 'PlayerH' }
      & Pick<PlayerH, 'id' | 'userTag' | 'skillLevel'>
    )>, PlayerH5?: Maybe<(
      { __typename?: 'PlayerH' }
      & Pick<PlayerH, 'id' | 'userTag' | 'skillLevel'>
    )> }
  )>, player?: Maybe<(
    { __typename?: 'Player' }
    & Pick<Player, 'id'>
  )>, newPlayer?: Maybe<(
    { __typename?: 'Player' }
    & Pick<Player, 'id' | 'skillLevel' | 'userTag'>
  )> }
);

export type GetTeamNameQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetTeamNameQuery = (
  { __typename?: 'Query' }
  & { team?: Maybe<(
    { __typename?: 'Team' }
    & Pick<Team, 'teamName'>
  )> }
);

export type GetTeamsQueryVariables = Exact<{
  id1: Scalars['Int'];
  id2: Scalars['Int'];
}>;


export type GetTeamsQuery = (
  { __typename?: 'Query' }
  & { teams: Array<(
    { __typename?: 'Team' }
    & Pick<Team, 'id'>
  )> }
);


export const AddMatchDocument = gql`
    mutation AddMatch($team1Id: Int!, $team2Id: Int!) {
  match: createMatch(
    data: {matchResult: 0, Team1: {connect: {id: $team1Id}}, Team2: {connect: {id: $team2Id}}}
  ) {
    id
    Team1 {
      teamName
      PlayerH1 {
        userTag
        skillLevel
      }
      PlayerH1 {
        userTag
        skillLevel
      }
      PlayerH2 {
        userTag
        skillLevel
      }
      PlayerH3 {
        userTag
        skillLevel
      }
      PlayerH4 {
        userTag
        skillLevel
      }
      PlayerH5 {
        userTag
        skillLevel
      }
    }
    Team2 {
      teamName
      PlayerH1 {
        userTag
        skillLevel
      }
      PlayerH1 {
        userTag
        skillLevel
      }
      PlayerH2 {
        userTag
        skillLevel
      }
      PlayerH3 {
        userTag
        skillLevel
      }
      PlayerH4 {
        userTag
        skillLevel
      }
      PlayerH5 {
        userTag
        skillLevel
      }
    }
  }
}
    `;
export const AddPlayerDocument = gql`
    mutation AddPlayer($userId: String!, $level: Float!, $userTag: String!, $imageUrl: String!) {
  newPlayer: createPlayer(
    data: {userId: $userId, skillLevel: $level, userTag: $userTag, imageUrl: $imageUrl}
  ) {
    id
    userTag
    skillLevel
    favoriteMap
    imageUrl
  }
}
    `;
export const CreateTeamWithPlayersDocument = gql`
    mutation CreateTeamWithPlayers($data: TeamCreateInput!) {
  team: createTeam(data: $data) {
    id
    teamName
  }
}
    `;
export const DeleteMatchDocument = gql`
    mutation DeleteMatch($id: Int!) {
  deletedMatch: deleteMatch(where: {id: $id}) {
    id
  }
}
    `;
export const DeleteTeamDocument = gql`
    mutation DeleteTeam($id: Int!) {
  deletedTeam: deleteTeam(where: {id: $id}) {
    teamName
  }
}
    `;
export const RemovePlayerDocument = gql`
    mutation RemovePlayer($userId: String!) {
  removedPlayer: deletePlayer(where: {userId: $userId}) {
    id
    userTag
    skillLevel
    favoriteMap
    imageUrl
  }
}
    `;
export const SwapPlayerHDocument = gql`
    mutation SwapPlayerH($id: Int!, $skillLevel: Float!, $userTag: String!, $playerId: Int!) {
  updatePlayerH(
    where: {id: $id}
    data: {skillLevel: {set: $skillLevel}, userTag: {set: $userTag}, Player: {connect: {id: $playerId}}}
  ) {
    id
    playerId
    userTag
  }
}
    `;
export const UpdatePlayerMapDocument = gql`
    mutation UpdatePlayerMap($userId: String!, $map: Map!) {
  updatedPlayer: updatePlayer(
    where: {userId: $userId}
    data: {favoriteMap: {set: $map}}
  ) {
    id
    favoriteMap
  }
}
    `;
export const UpdatePlayerSkillDocument = gql`
    mutation UpdatePlayerSkill($userId: String, $level: Float) {
  updatedPlayer: updatePlayer(
    where: {userId: $userId}
    data: {skillLevel: {set: $level}}
  ) {
    id
    skillLevel
  }
}
    `;
export const UpdateTeamNameDocument = gql`
    mutation UpdateTeamName($id: Int!, $name: String!) {
  updatedTeam: updateTeam(where: {id: $id}, data: {teamName: {set: $name}}) {
    id
    teamName
  }
}
    `;
export const UpdateTeamPlayerDocument = gql`
    mutation UpdateTeamPlayer($id: Int!, $data: TeamUpdateInput!) {
  updateTeam(where: {id: $id}, data: $data) {
    teamName
    PlayerH1 {
      userTag
      skillLevel
    }
    PlayerH2 {
      userTag
      skillLevel
    }
    PlayerH3 {
      userTag
      skillLevel
    }
    PlayerH4 {
      userTag
      skillLevel
    }
    PlayerH5 {
      userTag
      skillLevel
    }
  }
}
    `;
export const FindMatchDocument = gql`
    query findMatch($id: Int!) {
  match(where: {id: $id}) {
    id
  }
}
    `;
export const FindTeamDocument = gql`
    query findTeam($id: Int!) {
  team(where: {id: $id}) {
    id
  }
}
    `;
export const GetMatchDocument = gql`
    query GetMatch($id: Int!) {
  match(where: {id: $id}) {
    matchResult
    screenshotPath
    map
    updatedAt
    Team1 {
      teamName
      PlayerH1 {
        userTag
        skillLevel
      }
      PlayerH1 {
        userTag
        skillLevel
      }
      PlayerH2 {
        userTag
        skillLevel
      }
      PlayerH3 {
        userTag
        skillLevel
      }
      PlayerH4 {
        userTag
        skillLevel
      }
      PlayerH5 {
        userTag
        skillLevel
      }
    }
    Team2 {
      teamName
      PlayerH1 {
        userTag
        skillLevel
      }
      PlayerH1 {
        userTag
        skillLevel
      }
      PlayerH2 {
        userTag
        skillLevel
      }
      PlayerH3 {
        userTag
        skillLevel
      }
      PlayerH4 {
        userTag
        skillLevel
      }
      PlayerH5 {
        userTag
        skillLevel
      }
    }
  }
}
    `;
export const GetPlayerDocument = gql`
    query GetPlayer($userId: String) {
  player(where: {userId: $userId}) {
    skillLevel
    userTag
    favoriteMap
    imageUrl
  }
}
    `;
export const GetPlayersDocument = gql`
    query GetPlayers($userIds: [String!]) {
  players(where: {userId: {in: $userIds}}) {
    id
    userId
    userTag
    skillLevel
  }
}
    `;
export const GetPlayersWithUserIdsDocument = gql`
    query GetPlayersWithUserIds($userIds: [String!]) {
  players(where: {userId: {in: $userIds}}) {
    userId
    skillLevel
    userTag
  }
}
    `;
export const GetTeamDocument = gql`
    query GetTeam($id: Int!) {
  team(where: {id: $id}) {
    teamName
    PlayerH1 {
      userTag
      skillLevel
    }
    PlayerH2 {
      userTag
      skillLevel
    }
    PlayerH3 {
      userTag
      skillLevel
    }
    PlayerH4 {
      userTag
      skillLevel
    }
    PlayerH5 {
      userTag
      skillLevel
    }
  }
}
    `;
export const GetTeamAndCheckPlayersDocument = gql`
    query GetTeamAndCheckPlayers($teamId: Int!, $userId: String!, $newUserId: String!) {
  team(where: {id: $teamId}) {
    id
    teamName
    PlayerH1 {
      id
      userTag
      skillLevel
    }
    PlayerH2 {
      id
      userTag
      skillLevel
    }
    PlayerH3 {
      id
      userTag
      skillLevel
    }
    PlayerH4 {
      id
      userTag
      skillLevel
    }
    PlayerH5 {
      id
      userTag
      skillLevel
    }
  }
  player(where: {userId: $userId}) {
    id
  }
  newPlayer: player(where: {userId: $newUserId}) {
    id
    skillLevel
    userTag
  }
}
    `;
export const GetTeamNameDocument = gql`
    query GetTeamName($id: Int!) {
  team(where: {id: $id}) {
    teamName
  }
}
    `;
export const GetTeamsDocument = gql`
    query GetTeams($id1: Int!, $id2: Int!) {
  teams(where: {id: {in: [$id1, $id2]}}) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AddMatch(variables: AddMatchMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddMatchMutation> {
      return withWrapper(() => client.request<AddMatchMutation>(AddMatchDocument, variables, requestHeaders));
    },
    AddPlayer(variables: AddPlayerMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddPlayerMutation> {
      return withWrapper(() => client.request<AddPlayerMutation>(AddPlayerDocument, variables, requestHeaders));
    },
    CreateTeamWithPlayers(variables: CreateTeamWithPlayersMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateTeamWithPlayersMutation> {
      return withWrapper(() => client.request<CreateTeamWithPlayersMutation>(CreateTeamWithPlayersDocument, variables, requestHeaders));
    },
    DeleteMatch(variables: DeleteMatchMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteMatchMutation> {
      return withWrapper(() => client.request<DeleteMatchMutation>(DeleteMatchDocument, variables, requestHeaders));
    },
    DeleteTeam(variables: DeleteTeamMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteTeamMutation> {
      return withWrapper(() => client.request<DeleteTeamMutation>(DeleteTeamDocument, variables, requestHeaders));
    },
    RemovePlayer(variables: RemovePlayerMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RemovePlayerMutation> {
      return withWrapper(() => client.request<RemovePlayerMutation>(RemovePlayerDocument, variables, requestHeaders));
    },
    SwapPlayerH(variables: SwapPlayerHMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SwapPlayerHMutation> {
      return withWrapper(() => client.request<SwapPlayerHMutation>(SwapPlayerHDocument, variables, requestHeaders));
    },
    UpdatePlayerMap(variables: UpdatePlayerMapMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdatePlayerMapMutation> {
      return withWrapper(() => client.request<UpdatePlayerMapMutation>(UpdatePlayerMapDocument, variables, requestHeaders));
    },
    UpdatePlayerSkill(variables?: UpdatePlayerSkillMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdatePlayerSkillMutation> {
      return withWrapper(() => client.request<UpdatePlayerSkillMutation>(UpdatePlayerSkillDocument, variables, requestHeaders));
    },
    UpdateTeamName(variables: UpdateTeamNameMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateTeamNameMutation> {
      return withWrapper(() => client.request<UpdateTeamNameMutation>(UpdateTeamNameDocument, variables, requestHeaders));
    },
    UpdateTeamPlayer(variables: UpdateTeamPlayerMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateTeamPlayerMutation> {
      return withWrapper(() => client.request<UpdateTeamPlayerMutation>(UpdateTeamPlayerDocument, variables, requestHeaders));
    },
    findMatch(variables: FindMatchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FindMatchQuery> {
      return withWrapper(() => client.request<FindMatchQuery>(FindMatchDocument, variables, requestHeaders));
    },
    findTeam(variables: FindTeamQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FindTeamQuery> {
      return withWrapper(() => client.request<FindTeamQuery>(FindTeamDocument, variables, requestHeaders));
    },
    GetMatch(variables: GetMatchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMatchQuery> {
      return withWrapper(() => client.request<GetMatchQuery>(GetMatchDocument, variables, requestHeaders));
    },
    GetPlayer(variables?: GetPlayerQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPlayerQuery> {
      return withWrapper(() => client.request<GetPlayerQuery>(GetPlayerDocument, variables, requestHeaders));
    },
    GetPlayers(variables?: GetPlayersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPlayersQuery> {
      return withWrapper(() => client.request<GetPlayersQuery>(GetPlayersDocument, variables, requestHeaders));
    },
    GetPlayersWithUserIds(variables?: GetPlayersWithUserIdsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPlayersWithUserIdsQuery> {
      return withWrapper(() => client.request<GetPlayersWithUserIdsQuery>(GetPlayersWithUserIdsDocument, variables, requestHeaders));
    },
    GetTeam(variables: GetTeamQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTeamQuery> {
      return withWrapper(() => client.request<GetTeamQuery>(GetTeamDocument, variables, requestHeaders));
    },
    GetTeamAndCheckPlayers(variables: GetTeamAndCheckPlayersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTeamAndCheckPlayersQuery> {
      return withWrapper(() => client.request<GetTeamAndCheckPlayersQuery>(GetTeamAndCheckPlayersDocument, variables, requestHeaders));
    },
    GetTeamName(variables: GetTeamNameQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTeamNameQuery> {
      return withWrapper(() => client.request<GetTeamNameQuery>(GetTeamNameDocument, variables, requestHeaders));
    },
    GetTeams(variables: GetTeamsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTeamsQuery> {
      return withWrapper(() => client.request<GetTeamsQuery>(GetTeamsDocument, variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;