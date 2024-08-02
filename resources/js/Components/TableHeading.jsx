import {ChevronUpIcon , ChevronDownIcon} from "@heroicons/react/16/solid";


export default function TableHeading({ sort_feild, sort_direction , children , name , chengeMethod = () => {} }) {
    return (
        <th onClick={(e) => chengeMethod(name)}  >
            <div className="px-3 py-3 flex items-center jsutify-between gap-1 cursor-pointer">
                {children}
                <div>
                    <ChevronUpIcon className={"w-4 text-gray-400" + (sort_feild == name  && sort_direction == 'desc' ? 'text-white' : "")} />
                    <ChevronDownIcon className={"w-4 text-gray-400 -mt-2 " + (sort_feild == name && sort_direction == 'asc' ? 'text-white' : "")} />
                </div>
            </div>
        </th>
    )
}