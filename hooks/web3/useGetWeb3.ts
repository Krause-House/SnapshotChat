import { useState, useEffect } from "react";
import { useListenWallet, Wallet } from "./useListenWallet";
import { useListenSigner } from "./useListenSigner";
import { useListenProvider } from "./useListenProvider";
import { useIsWrongNetwork } from "./useIsWrongNetwork";
import { useListenUserProfile } from "../firestore/useListenUserProfile";
import { vote } from "../../utils/Snapshot/vote";

export interface ForumProfile {
  filters: string[]; // TODO: should be an enum
  primaryDelegate: address;
  secondaryDelegate: address;
  following: address[];
  followingNo: address[];
  follow: (address: address) => void; // TODO: is void return correct? // we should make sure the user is signed in in order to follow
  unfollow: (address: address) => void;
  followNo: (address: address) => void;
  unfollowNo: (address: address) => void;
  clearPrimaryDelegate: () => void;
  clearSecondaryDelegate: () => void;
}

export type address = string;
export interface User {
  address: address;
  wallet: Wallet;
  profile?: {
    name: string;
    about: string;
    discordUsername: string;
    profileImage: string;
    projects: string[];
    roles: string[];
    twitterUrl: string;
  };
  forum: ForumProfile;
  discord: DiscordProfile;
}

export interface DiscordProfile {
  id: string;
  avatar: string;
  profileUrl: string;
}

export function useGetWeb3() {
  const [provider, setProvider] = useListenProvider();
  const [signer, setSigner] = useListenSigner(provider);
  const wallet = useListenWallet(provider, signer);
  const userProfile = useListenUserProfile(wallet);
  const wrongNetwork = useIsWrongNetwork(provider); // TODO: should just set name OF network...and we can handle "right networks" elsewhere

  // what else?
  // - vote function, given some proposal and some choice, attach to signer?
  const snapshotVote = vote(provider);

  return {
    provider,
    setProvider,
    wrongNetwork,
    signer,
    setSigner,
    snapshotVote,

    wallet,
    hodler: wallet?.hodler,
    userProfile,
  };
}
