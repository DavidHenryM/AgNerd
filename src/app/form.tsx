'use client';
import * as React from 'react';
import { configure } from 'react-apollo-form';
import { client } from './apollo'; // a file thats export a configured Apollo Client


const jsonSchema = require('./core/apollo-form-json-schema.json');

export const ApplicationForm = configure<ApolloFormMutationNames>({
    // tslint:disable-next-line:no-any
    client: client as any,
    jsonSchema
});