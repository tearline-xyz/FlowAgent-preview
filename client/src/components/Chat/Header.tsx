import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getConfigDefaults, PermissionTypes, Permissions } from 'librechat-data-provider';
import type { ContextType } from '~/common';
import ModelSelector from './Menus/Endpoints/ModelSelector';
import { PresetsMenu, HeaderNewChat, OpenSidebar } from './Menus';
import { useGetStartupConfig } from '~/data-provider';
import ExportAndShareMenu from './ExportAndShareMenu';
import { useMediaQuery, useHasAccess } from '~/hooks';
import BookmarkMenu from './Menus/BookmarkMenu';
import { TemporaryChat } from './TemporaryChat';
import AddMultiConvo from './AddMultiConvo';
import useCustomWeb3Modal, {ConnectEvm} from '~/components/Account/hooks/useCustomWeb3Modal';
const defaultInterface = getConfigDefaults().interface;

export default function Header() {
  const { data: startupConfig } = useGetStartupConfig();
  const { navVisible, setNavVisible } = useOutletContext<ContextType>();
  const interfaceConfig = useMemo(
    () => startupConfig?.interface ?? defaultInterface,
    [startupConfig],
  );
  const { openModal, isConnected, address, disconnect}=useCustomWeb3Modal()


  const hasAccessToBookmarks = useHasAccess({
    permissionType: PermissionTypes.BOOKMARKS,
    permission: Permissions.USE,
  });

  const hasAccessToMultiConvo = useHasAccess({
    permissionType: PermissionTypes.MULTI_CONVO,
    permission: Permissions.USE,
  });

  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <div className="sticky top-0 z-10 flex h-14 w-full items-center justify-between bg-white p-2 font-semibold text-text-primary dark:bg-gray-800">
      <div className="hide-scrollbar flex w-full items-center justify-between gap-2 overflow-x-auto">
        <div className="mx-1 flex items-center gap-2">
          {!navVisible && <OpenSidebar setNavVisible={setNavVisible} />}
          {!navVisible && <HeaderNewChat />}
          {<ModelSelector startupConfig={startupConfig} />}
          {interfaceConfig.presets === true && interfaceConfig.modelSelect && <PresetsMenu />}
          {hasAccessToBookmarks === true && <BookmarkMenu />}
          {hasAccessToMultiConvo === true && <AddMultiConvo />}
          {isSmallScreen && (
            <>
              <ExportAndShareMenu
                isSharedButtonEnabled={startupConfig?.sharedLinksEnabled ?? false}
              />
              <TemporaryChat />
            </>
          )}
        </div>
        {!isSmallScreen && (
          <div className="flex items-center gap-2">
            {
              !isConnected && <div onClick={()=>{
                console.log(1);
                openModal(ConnectEvm)
              }}>
                Connect Wallet
              </div>
            }
            <div>
              Wallet Address：{!isConnected ? '未连接' : (address as string+'').substring(0,6)}
            </div>
            {
              isConnected &&   <div onClick={()=>{
                disconnect()
              }}>
                Disconnect
              </div>
            }

            <ExportAndShareMenu
              isSharedButtonEnabled={startupConfig?.sharedLinksEnabled ?? false}
            />
            <TemporaryChat />
          </div>
        )}
      </div>
      {/* Empty div for spacing */}
      <div />
    </div>
  );
}
