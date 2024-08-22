import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useForm } from "react-hook-form";
import apiClient from 'config/apiClient';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EventsCard = ({ month, day, eventsData, monthInt, year, onEventUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const schoolID = "641e36f0bc4d6b3b8e8eaf5e";

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const id = eventsData.id;

    try {
      const response = await apiClient.put(
        `/calendar/${year}/${schoolID}/${monthInt}/${day}/${id}`,
        data
      );

      const updatedEvent = { ...eventsData, ...data };
      onEventUpdate(day, updatedEvent);
    } catch (error) {
      console.log(error);
    }

    reset();
    setIsOpen(false); 
  };

  const onClick = () => {
    setIsOpen(true);
  };

  return (
    <div
      className="flex mb-2 gap-4 items-center rounded-lg cursor-pointer  bg-white"
      onClick={() => onClick()}
    >
      <div className="flex-1  rounded-lg  p-4 hover:bg-gray-50 border border-gray-300 transition-all duration-300">
        <section className="text-lg font-semibold">
          {eventsData.event_name}
        </section>
        <section className="text-sm font-semi-bold text-gray-700">
          {eventsData.event_description}
        </section>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="">Update Event</DialogTitle>
            <DialogDescription className="text-gray-500">
              Make changes to Event. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event_name" className="text-right text-gray-600">
                  Event Name
                </Label>
                <Input
                  id="event_name"
                  defaultValue={eventsData.event_name}
                  {...register("event_name")}
                  className="col-span-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event_description" className="text-right text-gray-600">
                  Description
                </Label>
                <Input
                  id="event_description"
                  defaultValue={eventsData.event_description}
                  {...register("event_description")}
                  className="col-span-3 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className=" text-white">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventsCard;
