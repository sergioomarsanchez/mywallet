"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { fetchEntitySuggestions } from "@/lib/actions";
import { UseFormSetValue } from "react-hook-form";
import { AccountData } from "src/app/types/front";

type Entity = {
  name: string;
  logo?: string;
};

type EntityDropdownProps = {
  setValue: UseFormSetValue<AccountData>;
  errors: any;
};

export default function EntityDropdown({
  setValue,
  errors,
}: EntityDropdownProps) {
  const [query, setQuery] = useState("");
  const [entities, setEntities] = useState<Entity[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  const fetchEntities = useCallback(
    debounce(async (q: string) => {
      const results = await fetchEntitySuggestions(q);
      setEntities(results ?? []);
    }, 300),
    []
  );

  const handleSelect = (entity: Entity) => {
    const safeEntity: Entity = {
      name: entity.name.trim(),
      logo: entity.logo || undefined,
    };
    setSelectedEntity(safeEntity);

    // 🔑 esto es lo que habilita el botón Add
    setValue("entityName", safeEntity.name, { shouldValidate: true });
    setValue("logo", safeEntity.logo);

    setEntities([]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim().length >= 2) {
      fetchEntities(value);
    } else {
      setEntities([]);
    }
  };

  return (
    <div className="relative flex flex-col text-left">
      <label className="text-sm font-medium dark:text-gray-200 mb-1">
        Entity
        {selectedEntity?.logo && (
          <img
            src={selectedEntity.logo}
            alt={selectedEntity.name}
            className="inline-block size-5 rounded-full ml-2"
          />
        )}
      </label>

      <Combobox value={selectedEntity} onChange={handleSelect}>
        <div className="relative">
          <ComboboxInput
            className="block w-full rounded-lg border-none bg-gray-100 py-1.5 px-3 text-sm dark:bg-white/5 dark:text-gray-200 focus:outline-none"
            displayValue={(entity: Entity | null) => entity?.name ?? query}
            onChange={handleInputChange}
            placeholder="Entity name"
          />

          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="size-4" />
          </ComboboxButton>
        </div>

        <ComboboxOptions className="absolute top-full z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-300 dark:bg-gray-700 shadow-lg">
          {/* Use custom value */}
          {query.trim().length > 0 && (
            <ComboboxOption
              value={{ name: query, logo: undefined }}
              className={({ active }) =>
                `cursor-pointer select-none p-2 ${active ? "bg-gray-400 dark:bg-gray-600" : ""
                }`
              }
            >
              Use “{query}”
            </ComboboxOption>
          )}

          {entities.map((entity) => (
            <ComboboxOption
              key={`${entity.name}-${entity.logo ?? "no-logo"}`}
              value={entity}
              className={({ active }) =>
                `cursor-pointer select-none p-2 ${active ? "bg-gray-400 dark:bg-gray-600" : ""
                }`
              }
            >
              <div className="flex items-center gap-2">
                {entity.logo && (
                  <img
                    src={entity.logo}
                    alt={entity.name}
                    className="size-4 rounded-full"
                  />
                )}
                <span className="truncate">{entity.name}</span>
              </div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>

      {errors?.entityName && (
        <p className="text-red-500 text-xs mt-1">
          {errors.entityName.message}
        </p>
      )}
    </div>
  );
}
