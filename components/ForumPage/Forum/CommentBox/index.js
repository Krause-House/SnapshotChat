import { useEffect, useState } from "react";
import { compose, prop, props } from "ramda";
import { Button } from "../../../Buttons/Button";
import Selector from "./Selector";
import { HeadingFaint } from "../../../Generics/Headings/HeadingFaint";

// snapshot
import { vote } from "../../../../utils/Snapshot/vote";
import { useForm } from "../../../../hooks/useForm";
import { signMessage } from "../../../../utils/web3/submit";
import { addPost } from "../../../../utils/firestore";
import { fetchProposalVote } from "../../../../utils/Snapshot/fetch";
import { printPass } from "../../../../utils/functional";

export const useGetSnapshotVote = (proposalId, address) => {
  const [vote, setVote] = useState(null);
  useEffect(() => {
    if (proposalId && address) {
      fetchProposalVote(proposalId, address).then((vote) => {
        console.log(vote);
        setVote(vote);
      });
    }
  }, []);
  return vote;
};

export default function CommentBox({ proposal, signer, provider, wallet }) {
  const [postText, updatePostText] = useForm("");
  const [selectedChoice, setSelectedChoice] = useState();

  const postComment = async () => {
    if (!signer) return;

    const post = await signMessage(signer)({
      proposalId: proposal.id,
      author: await signer.getAddress(),
      post: postText,
      outcome: proposal.choices[selectedChoice],
    });

    await addPost(provider)(proposal.id, post);
  };

  const submitToSnapshot = () =>
    vote(provider)({
      choice: selectedChoice + 1,
      proposalId: proposal.id,
      voteType: proposal.type,
    });

  const submitAndVote = () => {
    submitToSnapshot();
    postComment();
  };

  return wallet?.hodler ? (
    <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <HeadingFaint title="Post your thoughts." />
      <Selector
        proposal={proposal}
        selectedChoice={selectedChoice}
        setSelectedChoice={setSelectedChoice}
      />
      <textarea
        id="message"
        rows="4"
        className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={postText}
        onChange={updatePostText}
      />
      <div className="flex flex-row space-x-3">
        <Button title="Post" color="purple" icon={true} onClick={postComment} />
        <Button
          title="Vote"
          color="purple"
          icon={true}
          onClick={submitToSnapshot}
        />
      </div>
    </div>
  ) : (
    <></>
  );
}