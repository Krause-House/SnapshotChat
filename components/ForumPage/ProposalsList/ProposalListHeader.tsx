import { HeadingFaint } from "../../Generics/Headings/HeadingFaint";
import { ProposalStateFilter } from "../../../types/ProposalStateFilter";

const { None, Active, Closed } = ProposalStateFilter;
export function ProposalListHeader(props: any) {
  return (
    <div className="p-6 basis-1/4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div>
        <h5 className="mb-2 min-h-max text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Proposals
        </h5>
      </div>
      <span
        onClick={() => props.setProposalStateFilter(None)}
        className="bg-gray-100 text-gray-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900"
      >
        {props.proposalStateFilter === None ? "• All •" : "All"}
      </span>

      <span
        onClick={() => props.setProposalStateFilter(Active)}
        className="bg-green-100 text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
      >
        {props.proposalStateFilter === Active ? "• Active •" : "Active"}
      </span>
      <span
        onClick={() => props.setProposalStateFilter(Closed)}
        className="bg-red-100 text-red-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900"
      >
        {props.proposalStateFilter === Closed ? "• Closed •" : "Closed"}
      </span>
      <div className="mt-5">
        {props.proposalStateFilter === Active && (
          <HeadingFaint
            size="sm"
            title="Proposals currently undergoing voting."
          />
        )}
        {props.proposalStateFilter === Closed && (
          <HeadingFaint
            size="sm"
            title="View the Treasury's transaction log to view transactions relevant to a proposal."
          />
        )}
      </div>
    </div>
  );
}
