import Forum from "../components/Forum";
import { ProposalsList } from "../components/ProposalsList/ProposalsList";
import { proposalById } from "../utils/functional";
import { submit } from "../utils/submit";
import { useEffect, useState } from "react";
import { useGetProposals } from "../hooks/useGetProposals";

export function ForumPage(props) {
  const [selectedProposal, setSelectedProposal] = useState();
  const proposals = useGetProposals(props.snapshotSpace);

  return selectedProposal ? (
    <Forum
      proposal={proposalById(proposals, selectedProposal)}
      setSelectedProposal={setSelectedProposal}
      signer={props.signer}
      submit={submit(props.signer)}
      hodler={props.hodler}
      connected={props.connected}
      provider={props.provider}
    />
  ) : (
    proposals && (
      <ProposalsList
        proposals={proposals}
        setSelectedProposal={setSelectedProposal}
      />
    )
  );
}
