import Image from "next/image";
import { compose, prop } from "ramda";
import { useEffect, useState } from "react";
import { loadProfileAtAddress } from "../../../utils/firestore";
import { printPass } from "../../../utils/functional";
import { shortenAddress } from "../../../utils/shortenAddress";
import { signMessage } from "../../../utils/submit";
import { Badge } from "../../Generics/Badge";

const VoteButtons = () => (
  <div>
    {[
      {
        choice: "Upvote",
        color: "green",
      },
      {
        choice: "Downvote",
        color: "red",
      },
    ].map((vote, i) => (
      // submit needs to send to firebase db
      <span
        onClick={() =>
          signMessage({
            // id
            author,
            post,
            choice: vote.choice,
          })
        }
        className={`bg-${vote.color}-100 text-${vote.color}-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-${color}-200 dark:text-${color}-900`}
        key={i}
      >
        {vote.choice}
      </span>
    ))}
  </div>
);

const StarButton = ({ removeFriend }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mt-1"
    viewBox="0 0 20 20"
    fill="gold"
    onClick={removeFriend}
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const FollowButton = ({ addFriend }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mt-1 fill-black dark:fill-white "
    viewBox="0 0 20 20"
    onClick={addFriend}
  >
    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
  </svg>
);

const SelfIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mt-2 fill-black dark:fill-white"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
      clipRule="evenodd"
    />
  </svg>
);

export const ForumPost = ({ post, userProfile }) => {
  const { author, outcome, wallet, post: comment } = post;
  const authorAddr = author.toLowerCase();

  const [authorUsername, setAuthorUsername] = useState(authorAddr);
  const [authorAvatar, setAuthorAvatar] = useState();
  useEffect(() => {
    loadProfileAtAddress(
      authorAddr, // TODO: standardize type for address to avoid case errors
      ({ discordUsername, profileImage }) => {
        console.log(profileImage);
        discordUsername && setAuthorUsername(discordUsername);
        profileImage && setAuthorAvatar(profileImage);
      }
    );
  }, [authorAddr]);

  const userIsAuthor = authorAddr !== userProfile?.address;
  return (
    <div className="flex flex-col space-y-3 p-6 bg-white rounded-lg border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-row space-x-2 items-center">
        <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900">
          {shortenAddress(authorAddr)}
        </span>
      </div>
      <div className="flex flex-row space-x-2 justify-start">
        <Image
          src={
            authorAvatar ||
            "https://firebasestorage.googleapis.com/v0/b/krause-house-roster.appspot.com/o/images%2FidCDdt7eqexllcfsd0ZfAnA14aZ?alt=media&token=d96d6329-3e44-4d22-b1b8-b2e3cc55108a"
          }
          width={60}
          height={60}
          className="rounded-full"
        />
        <h5 className="mb-2 text-2xl self-center font-bold tracking-tight text-gray-900 dark:text-white">
          {/*  need to get the from by the author address */}
          {userIsAuthor ? authorUsername : "You"}
        </h5>
      </div>
      <div className="flex flex-row space-x-2 justify-start items-center">
        {userProfile &&
          (userProfile.following?.includes(authorAddr)
            ? StarButton({
                removeFriend: () => userProfile?.unfollow(authorAddr),
              })
            : userIsAuthor
            ? FollowButton({
                addFriend: () => userProfile?.follow(authorAddr),
              })
            : SelfIcon())}
        <span className="bg-orange-100 text-orange-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
          {outcome}
        </span>
        <span className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-700 dark:text-purple-300">
          {wallet?.$KRAUSE} $KRAUSE
        </span>
      </div>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {comment}
      </p>
    </div>
  );
};
