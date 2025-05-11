"use client";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function RightSidebar() {
  const session = useSession();
  const user = session?.data?.user;

  return (
    <div>
      <Drawer direction="right">
        {/* Menu Toggle Button */}
        <DrawerTrigger asChild className="hover:bg-transparent cursor-pointer">
          <Button
            className="fixed top-4 right-4 z-50 rounded-full"
            variant={"ghost"}
          >
            {user?.image && (
              <Image
                src={user?.image}
                alt={user?.name || "User Image"}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
          </Button>
        </DrawerTrigger>

        {/* Sidebar Content */}
        <DrawerContent className="p-6 flex flex-col items-center space-y-4">
          <h2 className="text-xl font-semibold">Sidebar</h2>
          <DialogTitle className="sr-only">Sidebar Menu</DialogTitle>

          <Button variant="secondary" className="w-full">
            Profile
          </Button>

          <Button className="w-full" onClick={() => signOut()}>
            Sign Out
          </Button>

          <DrawerClose asChild>
            <Button variant="ghost">Close</Button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
