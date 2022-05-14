import { Button } from "../../Buttons/Button";

export const PetitionPreviewCard = ({ petition, setSelected, id }) => (
  <div
    key={id}
    className="max-w-2/3 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
  >
    <div className="flex flex-row space-x-2">
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="orange"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg> */}
      <a href="#">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {petition.title}
        </h5>
      </a>
    </div>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
      {petition.description}
    </p>
    <Button title="View" color="purple" icon={true} onClick={setSelected} />
  </div>
);
