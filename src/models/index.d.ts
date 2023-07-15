import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerToken = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Token, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly expired: number;
  readonly revoked: number;
  readonly token?: string | null;
  readonly token_type?: string | null;
  readonly user_id?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyToken = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Token, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly expired: number;
  readonly revoked: number;
  readonly token?: string | null;
  readonly token_type?: string | null;
  readonly user_id?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Token = LazyLoading extends LazyLoadingDisabled ? EagerToken : LazyToken

export declare const Token: (new (init: ModelInit<Token>) => Token) & {
  copyOf(source: Token, mutator: (draft: MutableModel<Token>) => MutableModel<Token> | void): Token;
}

type EagerJob = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Job, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly description: string;
  readonly employer_id: number;
  readonly post_date: string;
  readonly title: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyJob = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Job, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly description: string;
  readonly employer_id: number;
  readonly post_date: string;
  readonly title: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Job = LazyLoading extends LazyLoadingDisabled ? EagerJob : LazyJob

export declare const Job: (new (init: ModelInit<Job>) => Job) & {
  copyOf(source: Job, mutator: (draft: MutableModel<Job>) => MutableModel<Job> | void): Job;
}

type EagerEmployer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Employer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEmployer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Employer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Employer = LazyLoading extends LazyLoadingDisabled ? EagerEmployer : LazyEmployer

export declare const Employer: (new (init: ModelInit<Employer>) => Employer) & {
  copyOf(source: Employer, mutator: (draft: MutableModel<Employer>) => MutableModel<Employer> | void): Employer;
}

type EagerApplication = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Application, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly applicant_id: number;
  readonly job_id: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyApplication = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Application, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly applicant_id: number;
  readonly job_id: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Application = LazyLoading extends LazyLoadingDisabled ? EagerApplication : LazyApplication

export declare const Application: (new (init: ModelInit<Application>) => Application) & {
  copyOf(source: Application, mutator: (draft: MutableModel<Application>) => MutableModel<Application> | void): Application;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly employer_id?: number | null;
  readonly password: string;
  readonly role?: string | null;
  readonly serial_version_uid: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly employer_id?: number | null;
  readonly password: string;
  readonly role?: string | null;
  readonly serial_version_uid: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}