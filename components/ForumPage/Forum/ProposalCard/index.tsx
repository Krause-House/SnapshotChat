import { Button } from "../../../Buttons/Button";
import { Heading } from "../../../Generics/Headings/Heading";
import { ProposalStats } from "./ProposalStats";
import { useGetProposalScores } from "../../../../hooks/snapshot/useGetProposalScores";
import { VotedCard } from "../VotedCard";
import { SignersTable } from "../../../PetitionsPage/Petitions/SignersTable";
import { STEWARDS } from "../../../../config/teams";
import { Scores } from "../../../../hooks/snapshot/useGetProposalScores";
import { Wallet } from "../../../../types/Wallet";
import { ChoiceFilters } from "./ChoiceFilters";
import { ProposalStateBadge } from "./ProposalStateBadge";
import { Badge } from "../../../Generics/Badge";
import { Row } from "../../../Generics/Row";
import { Col } from "../../../Generics/Col";

interface Props {
  wallet: Wallet;
  proposal: any; // TODO: proposal type
  setSelectedProposal: Function;
  selectedVote: number;
  setSelectedVote: Function;
  userVote: number;
  votesLoaded: boolean;
  votes: any;
}

export default function ProposalCard({
  wallet,
  proposal,
  setSelectedProposal,
  selectedVote,
  setSelectedVote,
  userVote,
  votesLoaded,
  votes,
}: Props) {
  const scores: Scores = useGetProposalScores(proposal, votes);

  return (
    <Col
      space={6}
      className="p-6 bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700"
    >
      <Row>
        <Button
          title="Back"
          color="hollow"
          onClick={() => setSelectedProposal(null)}
        />
        {proposal.state === "review" ? (
          <Button
            title="View"
            icon={true}
            color="hollow"
            // href={``}
            newTab={true}
          />
        ) : (
          <Button
            title="View on Snapshot"
            icon={true}
            color="hollow"
            className="max-w-full"
            href={`https://snapshot.org/#/krausehouse.eth/proposal/${proposal.id}`}
            newTab={true}
          />
        )}
      </Row>
      <div>
        <Row className="mb-2">
          <ProposalStateBadge state={proposal.state} />
          <VotedCard
            choice={userVote}
            votesLoaded={votesLoaded}
            wallet={wallet}
          />
        </Row>
        <Heading title={proposal.title} size="2xl" />
      </div>
      {proposal.state === "review" && (
        <SignersTable title="Proposal Readers" signers={STEWARDS} />
      )}
      {proposal.state !== "review" && (
        <>
          <Row className="items-end">
            <Badge
              title={`${votes?.length || proposal.votes} Votes`}
              color="purple"
              size="lg"
            />
            <Badge
              title={`${Math.floor(
                scores.scores_total || proposal.scores_total
              )} $KRAUSE Total`}
              color="purple"
              size="lg"
            />
          </Row>
          <ChoiceFilters
            proposal={proposal}
            selectedVote={selectedVote}
            setSelectedVote={setSelectedVote}
            scores={scores}
          />
        </>
      )}
    </Col>
  );
}
