"use client"

import { Moon, Sun, Menu, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useTheme } from "next-themes"

export function AccordionTheme() {
  const { setTheme } = useTheme()
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="rounded text-sm font-normal hover:bg-accent hover:no-underline">
          <span className="flex items-center">
            <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            Themes
          </span>
        </AccordionTrigger>
        <AccordionContent className="m-0">
          <Button
            className="ml-4 w-full rounded-l-none border-l font-normal"
            contentCenter={false}
            variant={"ghost"}
            onClick={() => setTheme("light")}
          >
            Light
          </Button>
          <Button
            className="ml-4 w-full rounded-l-none border-l font-normal"
            contentCenter={false}
            variant={"ghost"}
            onClick={() => setTheme("dark")}
          >
            Dark
          </Button>
          <Button
            className="ml-4 w-full rounded-l-none border-l font-normal"
            contentCenter={false}
            variant={"ghost"}
            onClick={() => setTheme("system")}
          >
            System
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export function NavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuGroup>
          <AccordionTheme />
          <DropdownMenuItem className="cursor-pointer py-2">
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Create Workout</span>
          </DropdownMenuItem>
          {/* <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub> */}

          <DropdownMenuSeparator />
          <DropdownMenuLabel className="select-none text-center font-normal opacity-50">
            app v 1.0
          </DropdownMenuLabel>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
