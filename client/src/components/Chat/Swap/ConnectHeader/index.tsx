import useCustomWeb3Modal, { ConnectEvm } from '~/components/Account/hooks/useCustomWeb3Modal';
import { Box,styled } from '@mui/system';
export const SwapHeaderRight = styled(Box)(({ theme }) => ({
  height: '100%',
  // width: '16rem',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  border:'1px solid red'
}));
export default function ConnectHeader(){
  const { openModal, isConnected, address, disconnect}=useCustomWeb3Modal()
  return (
    <div>
      <SwapHeaderRight>
        <Box>
          dddddd
        </Box>
      </SwapHeaderRight>

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

    </div>
  )
}
