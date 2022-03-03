import Markdown from "markdown-to-jsx";

import { Button } from "../../Buttons/Button";
import { Heading } from "../../Generics/Headings/Heading";
import { Badge } from "../../Generics/Badge";
import { HeadingFaint } from "../../Generics/Headings/HeadingFaint";
import { VotedCard } from "../Forum/VotedCard";
import { useEffect, useState } from "react";
import { useGetProposalVotes } from "../../../hooks/snapshot/useGetSnapshotVotes";
import { printPass } from "../../../utils/functional";
import { useGetProposalScores } from "../../../hooks/snapshot/useGetProposalScores";
import { equals, head, map, pick } from "ramda";
import { shortenAddress } from "../../../utils/web3/shortenAddress";
import { vote } from "../../../utils/Snapshot/vote";

const useGetDelegationVotes = (proposal, userProfile) => {
  const [delegationVotes, setDelegationVotes] = useState();
  const votes = useGetProposalVotes(proposal);

  const addressesVotingForChoice = (choice) =>
    votes[0]
      .filter((vote) => vote.choice === choice) // get all votes for this choice
      .map((vote) => vote.voter.toLowerCase()) // get the addresses of the voters for this choice
      .filter((a) => userProfile.following.includes(a)) // addresses of followed voters for this choice
      .map((address) => userProfile.followingProfiles[address]) // get the profiles of the followed voters for this choice
      .map((profile) => profile.name || shortenAddress(profile.address)); // get the names of the followed voters for this choice)))

  useEffect(() => {
    if (
      votes[0] &&
      userProfile &&
      userProfile.followingProfiles &&
      delegationVotes == undefined
    ) {
      const x = proposal.choices.map((_, i) => addressesVotingForChoice(i + 1));
      setDelegationVotes(x);
    }
  }, [votes, userProfile]);

  return delegationVotes;
};

export const ProposalListItem = ({
  provider,
  setSelectedProposal,
  proposal,
  key,
  userVote,
  votesLoaded,
  wallet,
  userProfile,
}) => {
  const delegationVotes = useGetDelegationVotes(proposal, userProfile);

  const voteChoice = (choice) =>
    vote(provider)({
      choice,
      proposalId: proposal.id,
      voteType: proposal.type,
      space: proposal.space.id,
    });

  const votesFromDelegation = delegationVotes?.reduce(
    (predicate, x) => predicate || x.length > 0,
    false
  );

  return (
    <div
      key={key}
      className="flex flex-col space-y-10 p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <div>
        <div className="mb-2 flex flex-row space-x-2 pb-2">
          {proposal.state === "active" ? (
            <div>
              <span
                className={`bg-green-100 text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900`}
              >
                Active
              </span>
            </div>
          ) : (
            <div>
              <span
                className={`bg-red-100 text-red-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900`}
              >
                Closed
              </span>
            </div>
          )}
          <VotedCard
            choice={userVote}
            votesLoaded={votesLoaded}
            wallet={wallet}
          />
        </div>
        {/* <Heading title={proposal.title} size={"lg"} /> */}
        <HeadingFaint title={proposal.title} size="xl" />
      </div>
      {votesFromDelegation && (
        <div className="group flex flex-row flex-no-wrap justify-between space-x-1">
          {proposal.choices.map((choice, index) => (
            <div
              key={index}
              className="flex-col flex-1 space-y-2 px-4 pt-4 pb-6 border dark:border-gray-700 rounded-lg shadow-md"
            >
              <div className="flex flex-row justify-between">
                <div className="flex flex-nowrap">
                  <span className="bg-orange-100 text-orange-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                    {choice}
                  </span>
                </div>
              </div>
              {delegationVotes[index]?.map((voter, i) => (
                <div key={i}>
                  <span
                    className={`bg-gray-100 text-gray-800 text-xs font-semibold mr-1 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900`}
                  >
                    {voter}
                  </span>
                </div>
              ))}
              {proposal.state === "active" && (
                <div>
                  <span
                    onClick={() => voteChoice(index + 1)}
                    className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-700 dark:text-purple-300"
                  >
                    Vote
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="flex space-x-4">
        <Button
          title="Forum"
          color="hollow"
          onClick={() => setSelectedProposal(proposal.id)}
        />
        <Button
          title="View On Snapshot"
          icon={true}
          color="hollow"
          href={`https://snapshot.org/#/krausehouse.eth/proposal/${proposal.id}`}
          newTab={true}
        />
      </div>
    </div>
  );
};
