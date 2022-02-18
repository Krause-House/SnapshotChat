import { useState, useEffect } from "react";
import { useListenWallet } from "./useListenWallet";
import { useListenSigner } from "./useListenSigner";
import { useListenProvider } from "./useListenProvider";
import { loadProfileAtAddress } from "../utils/firestore";
import { migrateRoster } from "../utils/migrateRoster";

const useListenUserProfile = (wallet) => {
  const [userProfile, setUserProfile] = useState();
  useEffect(async () => {
    loadProfileAtAddress(wallet?.address, setUserProfile);
  }, [wallet]);
  return userProfile;
};

export function useGetWeb3() {
  const [provider, setProvider] = useListenProvider();
  const [signer, setSigner] = useListenSigner(provider);
  const [wallet, hodler] = useListenWallet(provider, signer);
  const userProfile = useListenUserProfile(wallet);

  return {
    provider,
    setProvider,
    signer,
    setSigner,
    wallet,
    hodler,
    userProfile,
  };
}
