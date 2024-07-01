import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useCallback, useState } from "react";
import { fetchEntitySuggestions } from "@/lib/actions";
import debounce from "lodash.debounce";

type Entity = {
  name: string;
  logo?: string;
};

type EntityDropdownProps = {
  register: any;
  setValue: any;
  errors: any;
};

export default function EntityDropdown({
  register,
  setValue,
  errors,
}: EntityDropdownProps) {
  const [query, setQuery] = useState<string>("");
  const [entities, setEntities] = useState<Entity[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  const fetchEntities = useCallback(
    debounce(async (query) => {
      try {
        const suggestions = await fetchEntitySuggestions(query);
        setEntities(suggestions.slice(0, 5));
      } catch (error) {
        console.log("Error fetching companies", error);
        setEntities([]);
      }
    }, 300),
    []
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
    if (value) {
      fetchEntities(value);
    } else {
      setEntities([]);
    }
  };

  const handleSelect = (entity: Entity) => {
    setSelectedEntity(entity);
    const capitalizedEntityName = entity?.name ?? "";
    setValue("entityName", capitalizedEntityName);
    setValue("logo", entity?.logo ?? "");
    setQuery(capitalizedEntityName);
    setEntities([]);
  };

  return (
    <div className="relative flex flex-col text-left">
      <label className="text-sm/6 font-medium dark:text-gray-200">
        Entity:{" "}
        {selectedEntity?.logo && (
          <img
            src={selectedEntity?.logo}
            alt={selectedEntity?.name}
            width={40}
            height={40}
            className="inline-block size-5"
          />
        )}
      </label>
      <Combobox value={selectedEntity} onChange={handleSelect}>
        <div className="relative">
          <ComboboxInput
            className="block w-full rounded-lg border-none bg-gray-300/50 placeholder:text-gray-500 dark:bg-white/5 py-1.5 px-3 text-sm/6 dark:text-gray-200 focus:outline-none"
            {...register("entityName")}
            onChange={handleQueryChange}
            displayValue={(entity: Entity | null) => entity?.name ?? query}
            placeholder="Entity Name"
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>
        <ComboboxOptions className="absolute top-full z-10 w-full rounded-md bg-gray-300 dark:bg-gray-700 shadow-lg max-h-60 overflow-auto -translate-y-4">
          <ComboboxOption
            key={query?.charAt(0).toUpperCase() + query?.slice(1)}
            value={{
              name: query?.charAt(0).toUpperCase() + query?.slice(1),
              logo: "https://imgs.search.brave.com/P5tueEaTHUBVWwyJv4sF5ISrbsRXRCBdrPaQoCrA2tc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC8zNC8wMi9p/Y29uLWJhbmstdmVj/dG9yLTc1ODM0MDIu/anBn",
              domain: "",
            }}
            className="relative cursor-pointer select-none p-2"
          >
            {({ active }) => (
              <div
                className={`relative cursor-pointer select-none p-2 ${
                  active ? "bg-gray-400 dark:bg-gray-600" : ""
                }`}
              >
                <span className="block truncate font-normal">
                  Use "{query.charAt(0).toUpperCase() + query.slice(1)}"
                </span>
              </div>
            )}
          </ComboboxOption>
          {entities.map((entity) => (
            <ComboboxOption
              key={entity.name}
              value={entity}
              className={({ active }) =>
                `relative cursor-pointer select-none p-2 ${
                  active ? "bg-gray-400 dark:bg-gray-600" : ""
                }`
              }
            >
              {({ selected, active }) => (
                <div className="flex items-center gap-2">
                  <img
                    src={entity.logo || "/default-logo.png"}
                    alt={entity.name}
                    width={20}
                    height={20}
                    className="inline-block"
                  />
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {entity.name}
                  </span>
                </div>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
      {errors.entityName && (
        <p className="text-red-500 text-xs">{errors.entityName.message}</p>
      )}
    </div>
  );
}
