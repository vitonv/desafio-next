import { Drawer, DrawerContent, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react";
import { useSidebarDrawer } from "../../hooks/contexts/SidebarDrawer";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
    const { isOpen, onClose } = useSidebarDrawer()
    const isDrawerSideBar = useBreakpointValue({
        base: true,
        md: false
    })
    if (isDrawerSideBar) {
        return (
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <SidebarNav />
                    </DrawerContent>
                </DrawerOverlay>
            </ Drawer >
        );
    }
    return (
        <SidebarNav />
    )
}