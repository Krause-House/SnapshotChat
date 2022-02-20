import {
  addDoc,
  setDoc,
  doc,
  collection,
  getFirestore,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { identity } from "ramda";

export const buildLoadProfileAtAddress = (db) => async (address, callback) => {
  if (!address) return;
  const addr = address.toLowerCase();

  console.log("LOADING PROFILE", addr);
  onSnapshot(doc(db, "profiles", addr), async (snapshot) => {
    const walletProfile = snapshot.data();

    // if no wallet profile, make a new one...
    const profile = walletProfile || (await buildCreateProfile(db)(addr));
    const follow = (addr) =>
      buildFollowAddress(db)(profile, addr.toLowerCase());
    const unfollow = (addr) =>
      buildUnfollowAddress(db)(profile, addr.toLowerCase());
    const setPrimaryDelegate = (addr) =>
      buildSetPrimaryDelegate(db)(profile, addr);
    const clearPrimaryDelegate = () =>
      buildSetPrimaryDelegate(db)(profile, null);
    callback({
      ...profile,
      follow,
      unfollow,
      setPrimaryDelegate,
      clearPrimaryDelegate,
    });
  });
};

export const buildGetProfile = (db) => async (address) => {
  if (!address) return;
  const addr = address.toLowerCase();
  console.log("Fetching PROFILE", addr);
  const res = await getDoc(doc(db, "profiles", addr));
  if (res.exists()) {
    const walletProfile = res.data();
    const follow = (addr) =>
      buildFollowAddress(db)(walletProfile, addr.toLowerCase());
    const unfollow = (addr) =>
      buildUnfollowAddress(db)(walletProfile, addr.toLowerCase());
    return { ...walletProfile, follow, unfollow };
  }
};

export const buildCreateProfile = (db) => async (address) => {
  console.log("CREATING PROFILE");
  const addr = address.toLowerCase();
  await setDoc(doc(db, "profiles", addr), {
    address: addr,
    following: [""],
    filters: ["$KRAUSE Holders"],
  });
};

export const buildFollowAddress = (db) => async (profile, followAddress) => {
  console.log("FOLLOWING: ", followAddress);
  console.log("PROFILE: ", profile);

  // make sure not already following
  const alreadyFollowing = profile.following?.includes(followAddress);
  const notSelf = profile.address !== followAddress;

  if (!alreadyFollowing && notSelf) {
    await setDoc(doc(db, "profiles", profile.address), {
      ...profile,
      following: [...profile.following, followAddress],
    });
  }
};

// make sure to clear primary delegate
export const buildUnfollowAddress =
  (db) => async (profile, unfollowAddress) => {
    console.log("UNFOLLOW ", unfollowAddress);
    if (profile.following?.includes(unfollowAddress)) {
      await setDoc(doc(db, "profiles", profile.address), {
        ...profile,
        primaryDelegate: null,
        following: profile.following.filter(
          (address) => address !== unfollowAddress
        ),
      });
    } else {
      console.log("WAS NOT FOLLOWING");
    }
  };

export const buildSetPrimaryDelegate =
  (db) => async (profile, delegateAddress) => {
    console.log("SETTING PRIMARY DELEGATE", delegateAddress);
    await setDoc(doc(db, "profiles", profile.address), {
      ...profile,
      primaryDelegate: delegateAddress,
    });
  };

export const buildCreateProfileWithData = (db) => async (rosterEntry) => {
  console.log("CREATING PROFILE");
  await setDoc(doc(db, "profiles", rosterEntry.address), {
    ...rosterEntry,
    following: [""],
    filters: ["$KRAUSE Holders"],
  });
};
