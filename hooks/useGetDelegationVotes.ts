import { useEffect, useState } from "react";
import { shortenAddress } from "../utils/web3/shortenAddress";
import { useGetProposalVotes } from "./snapshot/useGetSnapshotVotes";
import { address } from "./web3/useGetWeb3";

export const useGetDelegationVotes = (proposal: any, userProfile: any) => {
  const [delegationVotes, setDelegationVotes] = useState();
  const votes = useGetProposalVotes(proposal);

  const addressesVotingForChoice = (choice: number) =>
    votes[0]
      .filter((vote: any) => vote.choice === choice) // get all votes for this choice
      .map((vote: any) => vote.voter.toLowerCase()) // get the addresses of the voters for this choice
      .filter((a: address) => userProfile.following.includes(a)) // addresses of followed voters for this choice
      .map((address: address) => userProfile.followingProfiles[address]) // get the profiles of the followed voters for this choice
      .map((profile: any) => profile.name || shortenAddress(profile.address)); // get the names of the followed voters for this choice)))

  useEffect(() => {
    if (
      votes[0] &&
      userProfile &&
      userProfile.followingProfiles &&
      delegationVotes == undefined
    ) {
      // TODO: REFACTOR THE SHIT OUT OF THIS
      const x = proposal.choices.map((_: any, i: number) =>
        addressesVotingForChoice(i + 1)
      );
      setDelegationVotes(x);
    }
  }, [votes, userProfile]);

  return delegationVotes;
};
