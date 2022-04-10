import { ProposalListItem } from "./ProposalListItem";
import { useState } from "react";
import { ProposalListHeader } from "./ProposalListHeader";
import { ProposalStateFilter } from "../../../types/ProposalStateFilter";
import { SubmitProposalCard } from "./SubmitProposalCard";
import { ViewProfileCard } from "./ViewProfileCard";
import { SubmitViaNotionCard } from "./SubmitViaNotionCard";
import { Col } from "../../Generics/Col";
import { Row } from "../../Generics/Row";

interface Props {
  connection: any;
  proposals: any;
  drafts: any;
  setSelectedProposal: any;
  userVotes: any;
}

export default function ProposalsList({
  connection,
  proposals,
  // drafts,
  setSelectedProposal,
  userVotes,
}: Props) {
  const { provider, userProfile, wallet } = connection;

  const [proposalStateFilter, setProposalStateFilter] =
    useState<ProposalStateFilter>(ProposalStateFilter.None);

  return (
    <Row space={3} className="justify-center pb-8">
      <Col space={3}>
        <SubmitViaNotionCard />
        <ViewProfileCard />
      </Col>
      <div className="basis-1/2 max-h-screen overflow-auto flex flex-col space-y-6 px-4 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <ProposalListHeader
          proposalStateFilter={proposalStateFilter}
          setProposalStateFilter={setProposalStateFilter}
        />
        {proposals
          .filter(
            ({ type }: any) => type === "basic" || type === "single-choice"
          )
          .filter(
            ({ state }: any) =>
              proposalStateFilter === ProposalStateFilter.None ||
              state === proposalStateFilter
          )
          .map((proposal: any, i: number) => (
            <ProposalListItem
              provider={provider}
              setSelectedProposal={setSelectedProposal}
              proposal={proposal}
              key={i}
              userVote={userVotes[proposal.id]}
              votesLoaded={userVotes != null}
              wallet={wallet}
              userProfile={userProfile}
            />
          ))}
      </div>
    </Row>
  );
}
