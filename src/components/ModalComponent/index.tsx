import { Fragment, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Context } from "../../AppContext";
import ModalRow from "./ModalRow";

export interface ICustomModalProps {
  color: string;
  id: number;
  name: string;
  pantone_value: string;
  year: number;
}

export default function CustomModal() {
  const { modalValues, setModalValues } = useContext(Context);

  const { id, name, year, open, pantone_value, color } = modalValues;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="p-5 flex flex-col gap-2">
                  <h1 className="font-semibold text-lg">Row details</h1>
                  <div className="text-sm text-gray-500 flex flex-col gap-2">
                    <ModalRow label="Id" value={id} />
                    <ModalRow label="Name" value={name} />
                    <ModalRow label="Color" value={color} />
                    <ModalRow label="Year" value={year} />
                    <ModalRow label="Pantone" value={pantone_value} />
                  </div>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:w-auto sm:text-sm"
                    onClick={() =>
                      setModalValues((prevModalValues: any) => {
                        return {
                          ...prevModalValues,
                          open: false,
                        };
                      })
                    }
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
