import { Farm, GeoPoint, State } from "@/app/generated/prisma/browser";
import { BetterFetchError, SessionQueryParams } from "better-auth/client";
import { JSX } from "react";

export type BetterAuthError = {
    code?: string | undefined | undefined;
    message?: string | undefined | undefined;
    status: number;
    statusText: string;
} | null

export type BetterAuthSignInData = {
    status: boolean;
} | null

export type BetterAuthSignOutData = {
    success: boolean;
} | null

export interface NavItem {
  label: string;
  path: string;
  Icon: JSX.ElementType;
}

export type SessionData = {
  data: {
    user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
    };
    session: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        ipAddress?: string | null | undefined;
        userAgent?: string | null | undefined;
    };
    } | null;
    isPending: boolean;
    isRefetching: boolean;
    error: BetterFetchError | null;
    refetch: (queryParams?: {
        query?: SessionQueryParams;
    } | undefined) => Promise<void>;
}

export type FarmAndLocation = (
  {
    locationCentre: GeoPoint | null;
  } & Farm) | null;

  export type GetOrganisationsResult = {
    name: string;
    billingAddresses: {
        id: string;
        unit: number | null;
        streetNumber: number;
        streetName: string;
        streetType: string;
        suburb: string;
        state: State;
        country: string;
        postCode: number;
    }[] | null;
    shippingAddresses: {
        id: string;
        unit: number | null;
        streetNumber: number;
        streetName: string;
        streetType: string;
        suburb: string;
        state: State;
        country: string;
        postCode: number;
    }[] | null;
  }
