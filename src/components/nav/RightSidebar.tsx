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
import Link from "next/link";
import { LogOutIcon, Plus, User } from "lucide-react";

export default function RightSidebar() {
  const session = useSession();
  const user = session?.data?.user;


  return (
    <div>
      {session ? (
        <Drawer direction="right">
          {/* Menu Toggle Button */}
          <DrawerTrigger
            asChild
            className="hover:bg-transparent cursor-pointer"
          >
            <Button className="z-50 rounded-full " variant={"ghost"}>
              {user?.image && (
                <Image
                  src={user?.image}
                  alt={user?.name || "User Image"}
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              )}
            </Button>
          </DrawerTrigger>

          {/* Sidebar Content */}
          <DrawerContent className="p-6 flex flex-col items-center space-y-4">
            <DialogTitle className="sr-only">Sidebar Menu</DialogTitle>

            <Link href={`/profile/${user?.id}`} className=" w-full">
              <DrawerClose asChild>
                <Button
                  variant="secondary"
                  className="w-full cursor-pointer hover:bg-gray-200  transition duration-200"
                >
                  <User /> Profile
                </Button>
              </DrawerClose>
            </Link>
            <Link href={`/create-blog`} className=" w-full">
              <DrawerClose asChild>
                <Button
                  variant="secondary"
                  className="w-full cursor-pointer hover:bg-gray-200  transition duration-200"
                >
                <Plus />   Post Blog
                </Button>
              </DrawerClose>
            </Link>

            <DrawerClose asChild>
              <Button className="w-full" onClick={() => signOut()}>
                <LogOutIcon /> Sign Out
              </Button>
            </DrawerClose>

            <DrawerClose asChild>
              <Button variant="ghost">Close</Button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      ) : (
        <div className="text-2xl font-bold">Sign in</div>
      )}
    </div>
  );
}
